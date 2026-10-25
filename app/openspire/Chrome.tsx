// Open Spire の区画の上の帯といちばん下。どのページでも同じ並び
import Link from "next/link";
import styles from "./world.module.css";

export function TopBar({ solid = false }: { solid?: boolean }) {
	return (
		<header className={`${styles.bar} ${solid ? styles.barSolid : ""}`}>
			<Link href="/openspire/" className={styles.logo}>
				OPEN SPIRE
			</Link>
			<nav aria-label="Open Spire">
				<ul className={styles.links}>
					<li className={styles.hideNarrow}>
						<Link href="/openspire/#trailer">Trailer</Link>
					</li>
					<li className={styles.hideNarrow}>
						<Link href="/openspire/#travelers">旅人</Link>
					</li>
					<li>
						<Link href="/openspire/#wall">Special Thanks</Link>
					</li>
					<li>
						<Link href="/openspire/releases/">リリース記録</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export function Foot() {
	return (
		<footer className={styles.foot}>
			<span>Open Spire は musoukun が作っている、Slay the Spire 風のデッキ構築ローグライクです。</span>
			<Link href="/">作者のサイトへ</Link>
		</footer>
	);
}
