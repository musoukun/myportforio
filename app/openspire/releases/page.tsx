import type { Metadata } from "next";
import { Foot, TopBar } from "../Chrome";
import { formatDate, RELEASE_GROUPS, RELEASES } from "../content";
import world from "../world.module.css";
import styles from "./releases.module.css";

export const metadata: Metadata = {
	title: "リリース記録",
	description: "Open Spire の版ごとの、直した不具合・追加した機能・変えたルールやカード。",
};

// リリース記録 (もとは Apps Script のページ。openslaythe の issue #604 → #1180 でここに移した)
// 中身はゲームのタイトル画面の「リリース記録」と同じ
export default function ReleasesPage() {
	return (
		<>
			<TopBar solid />
			<main className={world.page}>
				<header className={world.pageHead}>
					<h1 className={world.pageTitle}>リリース記録</h1>
					<p className={world.pageLead}>ゲームのタイトル画面の「リリース記録」と同じ内容です。</p>
				</header>

				{RELEASES.length > 1 && (
					<nav aria-label="版" className={styles.versions}>
						{RELEASES.map((release) => (
							<a key={release.version} href={`#v${release.version}`}>
								v{release.version}
							</a>
						))}
					</nav>
				)}

				{RELEASES.map((release, i) => (
					<article key={release.version} id={`v${release.version}`} className={styles.release}>
						<div className={styles.head}>
							<h2 className={styles.version}>v{release.version}</h2>
							<time dateTime={release.date} className={styles.date}>
								{formatDate(release.date)}
							</time>
							{i === 0 && <span className={styles.badge}>最新</span>}
						</div>

						{release.image && (
							<img className={styles.image} src={`/openspire/releases/${release.image}`} alt={`v${release.version}`} loading="lazy" />
						)}

						{/* 紹介文は空行で段落に分ける */}
						{release.summary?.trim() && (
							<div className={styles.summary}>
								{release.summary.split(/\n\s*\n/).map((para) => (
									<p key={para}>{para.trim()}</p>
								))}
							</div>
						)}

						{/* 空の欄は見出しごと出さない */}
						{RELEASE_GROUPS.map((group) => {
							const items = release[group.key] ?? [];
							if (items.length === 0) return null;
							return (
								<section key={group.key} className={`${styles.group} ${styles[group.key]}`}>
									<h3>
										{group.title}
										<span className={styles.count}>{items.length} 件</span>
									</h3>
									<ul>
										{items.map((item) => (
											<li key={item}>{item}</li>
										))}
									</ul>
								</section>
							);
						})}
					</article>
				))}
			</main>
			<Foot />
		</>
	);
}
