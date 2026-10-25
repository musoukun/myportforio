import type { Metadata } from "next";
import { Foot, TopBar } from "../Chrome";
import world from "../world.module.css";
import styles from "./mac.module.css";

export const metadata: Metadata = {
	title: "Mac 版のインストール",
	description: "Open Spire の Mac 版を最初に開くときの許可の手順。",
};

// Mac 版をインストールするときの注意 (もとは Apps Script のページの ?page=mac。openslaythe の issue #631 → #1180 でここに移した)
// インストーラーの zip に入れる「Macで開くとき.txt」と同じ内容
export default function MacPage() {
	return (
		<>
			<TopBar solid />
			<main className={world.page}>
				<header className={world.pageHead}>
					<h1 className={world.pageTitle}>Mac 版のインストール</h1>
					<p className={world.pageLead}>
						Mac 版は Apple の有料の証明書で署名していないので、最初に開くときだけ Mac に止められます。下の手順で 1
						回だけ「開いてよい」と許可してください。中身は Windows 版と同じゲームです。Intel の Mac と Apple シリコン（M1
						以降）の Mac のどちらでも動きます。
					</p>
				</header>

				<section className={styles.block}>
					<h2>インストールの手順</h2>
					<ol className={styles.steps}>
						<li>
							受け取った <b>open spire mac.zip</b> をダブルクリックして展開し、出てきた <b>Open Spire</b> を{" "}
							<b>アプリケーション</b> フォルダに移します。
						</li>
						<li>
							<b>Open Spire</b> をダブルクリックします。最初は「"Open Spire" は開いていません」「Apple は検証できませんでした」のように出て開けません。
							<b>完了</b> を押して閉じます。
						</li>
						<li>
							<b>システム設定</b> → <b>プライバシーとセキュリティ</b>{" "}
							を開き、いちばん下までスクロールします。「"Open Spire" は Mac を保護するためにブロックされました」の横の <b>このまま開く</b>{" "}
							を押し、パスワードを入れます。
						</li>
						<li>
							もう一度 <b>Open Spire</b> を開き、出てきた確認で <b>このまま開く</b> を押します。2 回目からは普通に開けます。
						</li>
					</ol>
					<p>macOS 15（Sequoia）からは、アイコンの右クリック →「開く」では通せません。3 の「システム設定」から許可してください。</p>
				</section>

				<section className={styles.block}>
					<h2>「このまま開く」が出てこないとき</h2>
					<p>
						<b>ターミナル</b>（アプリケーション → ユーティリティ の中）を開き、次の 1 行を貼り付けて Return を押してから、もう一度開いてください。
					</p>
					<pre className={styles.command}>xattr -dr com.apple.quarantine &quot;/Applications/Open Spire.app&quot;</pre>
				</section>

				<section className={styles.block}>
					<h2>新しい版に入れ替えるとき</h2>
					<p>
						アプリケーションの <b>Open Spire</b> を、新しく展開したものに置き換えます。入れ替えたあとも、最初の 1 回は上の 3
						の許可がもう一度要ります。
					</p>
					<p>
						セーブと設定は <b>~/Library/Application Support/Godot/app_userdata/Open Spire/</b> に残るので、入れ替えても消えません。
					</p>
				</section>

				<section className={styles.block}>
					<h2>協力プレイ</h2>
					<p>友達が立てた部屋には、Mac からも入れます。部屋の受付サーバーを動かせるのは Windows 版だけです。</p>
				</section>
			</main>
			<Foot />
		</>
	);
}
