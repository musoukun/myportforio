// Open Spire のゲームの「不具合を報告」から届いた報告を、GitHub の issue にして Discord に知らせる
// (もとは Apps Script の tools/bug_report/gas/Code.js。openslaythe の issue #751 → #1180 でここに移した。手順は openslaythe の docs/dev/bug_report.md)
// 鍵はゲームに入れず、Vercel の環境変数にだけ置く
//   OPENSPIRE_GITHUB_TOKEN    … openslaythe の Issues と Contents を書ける fine-grained token
//   OPENSPIRE_GITHUB_REPO     … 書かなければ musoukun/openslaythe
//   OPENSPIRE_DISCORD_WEBHOOK … 知らせる先 (無ければ知らせないだけ)
// https://docs.github.com/en/rest/issues/issues#create-an-issue
// https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents

// スクショのアップロード・issue・Discord を順に待つので、Vercel の既定より長めにしておく
export const maxDuration = 60;

// 種類ごとの issue の題の頭と、付けるラベル。ゲームの scripts/bug_report/BugReportPayload.gd の KINDS の id と合わせる
const KINDS: Record<string, { label: string; labels: string[] }> = {
	ui: { label: "画面・見た目の不具合", labels: ["bug", "ui"] },
	logic: { label: "動きの不具合", labels: ["bug", "logic"] },
	request: { label: "要望", labels: ["enhancement"] },
	other: { label: "その他", labels: [] },
};
const COMMON_LABELS = ["player-report"];
// スクショを置くブランチ (main の履歴を汚さないよう、絵だけの別ブランチ)
const SHOT_BRANCH = "bug-reports";
const TITLE_MAX = 60;
const LOG_MAX = 40000;
// GitHub の issue の本文は 65536 文字まで。ログと状態の表の分を残して、本文をこの長さで切る
const BODY_MAX = 5000;

type Report = {
	kind?: string;
	body?: string;
	reporter?: string;
	screenshot?: string;
	log?: string;
	context?: Record<string, unknown>;
};
type GitHub = { token: string; repo: string };
type Issue = { number: number; title: string; html_url: string };

export async function POST(request: Request) {
	try {
		const report = (await request.json()) as Report;
		const kind = KINDS[report.kind ?? ""];
		if (!kind) return reply({ ok: false, error: "unknown kind" });
		const body = truncate(String(report.body ?? "").trim(), BODY_MAX);
		if (!body) return reply({ ok: false, error: "empty body" });

		const token = process.env.OPENSPIRE_GITHUB_TOKEN;
		if (!token) return reply({ ok: false, error: "GitHub is not configured" });
		const github: GitHub = { token, repo: process.env.OPENSPIRE_GITHUB_REPO || "musoukun/openslaythe" };

		// スクショを置けなくても、文章とログは issue にする (報告そのものは落とさない)
		let shotUrl: string | null = null;
		let shotError = "";
		if (report.screenshot) {
			try {
				shotUrl = await uploadScreenshot(github, report.screenshot);
			} catch (err) {
				console.error(err);
				shotError = String(err);
			}
		}
		const issue = (await gitHub(github, "POST", `/repos/${github.repo}/issues`, {
			title: `[${kind.label}] ${truncate(body.split("\n")[0].trim(), TITLE_MAX)}`,
			body: issueBody(report, kind.label, body, shotUrl, shotError),
			labels: kind.labels.concat(COMMON_LABELS),
		})) as Issue;

		// issue ができていれば報告は届いている。Discord に送れなくても失敗にはしない
		let notified = false;
		const webhook = process.env.OPENSPIRE_DISCORD_WEBHOOK;
		if (webhook) {
			try {
				await notifyDiscord(webhook, report, kind.label, issue);
				notified = true;
			} catch (err) {
				console.error(err);
			}
		}
		return reply({ ok: true, number: issue.number, url: issue.html_url, notified });
	} catch (err) {
		console.error(err);
		return reply({ ok: false, error: String(err) });
	}
}

function issueBody(report: Report, kindLabel: string, body: string, shotUrl: string | null, shotError: string): string {
	const ctx = report.context ?? {};
	const ctxLines = Object.keys(ctx).map((k) => `| ${k} | ${String(ctx[k]).replace(/\|/g, "\\|")} |`);
	const log = String(report.log ?? "");
	return [
		`## 種類\n${kindLabel}`,
		`## 内容\n${body}`,
		...(shotUrl ? [`## 画面\n![screenshot](${shotUrl})`] : []),
		...(shotError ? [`## 画面\nスクショを置けませんでした: ${truncate(shotError, 300)}`] : []),
		`## 送った人\n${truncate(String(report.reporter ?? "").trim(), 40) || "（名前なし）"}`,
		...(ctxLines.length ? [`## そのときの状態\n| 項目 | 値 |\n|---|---|\n${ctxLines.join("\n")}`] : []),
		...(log ? [`<details><summary>直前のログ</summary>\n\n\`\`\`\n${log.slice(-LOG_MAX)}\n\`\`\`\n</details>`] : []),
		"---\nゲームの「不具合を報告」から送られました",
	].join("\n\n");
}

// スクショ (JPEG の base64) を bug-reports ブランチに置き、issue に貼れる URL を返す
// private のリポジトリでも、リポジトリに入れる人なら ?raw=true の URL で絵が出る
async function uploadScreenshot(github: GitHub, base64: string): Promise<string> {
	const path = `reports/${tokyoStamp()}-${crypto.randomUUID().slice(0, 8)}.jpg`;
	const res = (await gitHub(github, "PUT", `/repos/${github.repo}/contents/${path}`, {
		message: `Add bug report screenshot ${path}`,
		content: base64,
		branch: SHOT_BRANCH,
	})) as { content: { html_url: string } };
	return `${res.content.html_url}?raw=true`;
}

// "2026-10/20261026-053000" (日本の時刻。Apps Script の版と同じ並び)
function tokyoStamp(): string {
	const parts = Object.fromEntries(
		new Intl.DateTimeFormat("en-CA", {
			timeZone: "Asia/Tokyo",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hourCycle: "h23",
		})
			.formatToParts(new Date())
			.map((p) => [p.type, p.value]),
	);
	return `${parts.year}-${parts.month}/${parts.year}${parts.month}${parts.day}-${parts.hour}${parts.minute}${parts.second}`;
}

async function notifyDiscord(webhook: string, report: Report, kindLabel: string, issue: Issue) {
	const payload: Record<string, unknown> = {
		content: `ゲームから報告が届きました（${kindLabel}）\n#${issue.number} ${issue.title}\n${issue.html_url}`,
		// 本文に @everyone などが混じっても誰も呼ばない
		allowed_mentions: { parse: [] },
	};
	// wait=true にすると、Discord が保存できなかったときもエラーで返る (URL にすでに ? があれば & でつなぐ)
	const url = `${webhook}${webhook.includes("?") ? "&" : "?"}wait=true`;
	let res: Response;
	if (report.screenshot) {
		// 絵を添えるときは multipart。本文は payload_json、絵は files[0]
		payload.embeds = [{ image: { url: "attachment://screenshot.jpg" } }];
		payload.attachments = [{ id: 0, filename: "screenshot.jpg" }];
		const form = new FormData();
		form.append("payload_json", JSON.stringify(payload));
		form.append("files[0]", new Blob([Buffer.from(report.screenshot, "base64")], { type: "image/jpeg" }), "screenshot.jpg");
		res = await fetch(url, { method: "POST", body: form });
	} else {
		res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
	}
	if (!res.ok) throw new Error(`Discord ${res.status}: ${await res.text()}`);
}

async function gitHub(github: GitHub, method: string, path: string, body?: unknown): Promise<unknown> {
	const res = await fetch(`https://api.github.com${path}`, {
		method,
		headers: {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${github.token}`,
			"X-GitHub-Api-Version": "2022-11-28",
			...(body ? { "Content-Type": "application/json" } : {}),
		},
		body: body ? JSON.stringify(body) : undefined,
	});
	if (!res.ok) throw new Error(`GitHub ${method} ${path} → ${res.status}: ${await res.text()}`);
	return res.json();
}

function reply(obj: Record<string, unknown>) {
	return Response.json(obj);
}

const truncate = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1)}…` : text);
