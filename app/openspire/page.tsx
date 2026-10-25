import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronsDown } from "lucide-react";
import { Foot, TopBar } from "./Chrome";
import { formatDate, HEROES, RELEASES, ROMAN, STORY_LINES, WARRIORS } from "./content";
import styles from "./story.module.css";

export const metadata: Metadata = {
	title: { absolute: "Open Spire" },
};

// 特設サイト: ゲームのオープニングの絵 (今は 10 枚) をスクロールでめくり、森に着いた旅人 4 人に会い、
// この世界を支えてくれた戦士たちの名前を刻んだ石壁に着く (openslaythe の issue #1180)
export default function OpenSpirePage() {
	const latest = RELEASES[0];
	return (
		<>
			<TopBar />
			<main>
				<section aria-label="物語" className={styles.story}>
					{STORY_LINES.map((line, i) => (
						<div key={line} className={styles.scene}>
							<div className={styles.stage}>
								{/* 1 枚目は最初に見えるので先に読む。ほかはスクロールで近づいてから */}
								<picture>
									<source media="(max-width: 900px)" srcSet={`/openspire/story/intro_${i + 1}_s.webp`} />
									<img
										className={styles.plate}
										src={`/openspire/story/intro_${i + 1}.webp`}
										alt=""
										loading={i === 0 ? "eager" : "lazy"}
										fetchPriority={i === 0 ? "high" : "auto"}
									/>
								</picture>
								<span className={styles.count} aria-hidden="true">
									{ROMAN[i]} / {ROMAN[STORY_LINES.length - 1]}
								</span>
								{i === 0 && (
									<a className={styles.skip} href="#travelers">
										物語をとばす
										<ArrowRight size={16} aria-hidden="true" />
									</a>
								)}
								<div className={styles.band}>
									<p className={styles.line}>{line}</p>
									<ol className={styles.ticks} aria-hidden="true">
										{STORY_LINES.map((_, t) => (
											<li key={t} className={t === i ? styles.tickOn : undefined} />
										))}
									</ol>
								</div>
								{i === 0 && <ChevronsDown className={styles.cue} size={22} aria-hidden="true" />}
							</div>
						</div>
					))}
				</section>

				<section id="travelers" className={styles.travelers} aria-labelledby="travelers-title">
					<h2 id="travelers-title" className={styles.sectionTitle}>
						森に着いた旅人たち
					</h2>
					<ul className={styles.heroes}>
						{HEROES.map((hero) => (
							<li key={hero.id} className={styles.hero} style={{ "--hero": hero.color } as React.CSSProperties}>
								<img className={styles.heroArt} src={`/openspire/heroes/${hero.id}.webp`} alt={hero.name} loading="lazy" />
								<h3 className={styles.heroName}>{hero.name}</h3>
								<p className={styles.heroEn}>{hero.nameEn}</p>
								<p className={styles.heroText}>{hero.description}</p>
							</li>
						))}
					</ul>
				</section>

				<section id="wall" className={styles.wallSection} aria-labelledby="wall-title">
					<figure className={styles.wall}>
						<img className={styles.wallArt} src="/openspire/warrior_wall.webp" alt="" loading="lazy" />
						<div className={styles.tablet}>
							<h2 id="wall-title" className={styles.carvedTitle}>
								この世界を支えてくれた戦士たち
							</h2>
							<ul className={styles.names}>
								{WARRIORS.map((name, i) => (
									<li key={name} className={styles.name} style={{ "--i": i } as React.CSSProperties}>
										{name}
									</li>
								))}
							</ul>
						</div>
					</figure>
				</section>

				<section className={styles.records} aria-label="記録">
					<Link href="/openspire/releases/" className={styles.record}>
						<span className={styles.recordTitle}>リリース記録</span>
						<span className={styles.recordText}>
							版ごとに、直した不具合・追加した機能・変えたルールやカード。いちばん新しいのは v{latest.version}（
							{formatDate(latest.date)}）。
						</span>
						<ArrowRight className={styles.recordArrow} size={22} aria-hidden="true" />
					</Link>
					<Link href="/openspire/mac/" className={styles.record}>
						<span className={styles.recordTitle}>Mac で遊ぶ人へ</span>
						<span className={styles.recordText}>最初に開くときだけ要る、Mac の許可の手順。</span>
						<ArrowRight className={styles.recordArrow} size={22} aria-hidden="true" />
					</Link>
				</section>
			</main>
			<Foot />
		</>
	);
}
