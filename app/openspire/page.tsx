import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Foot, TopBar } from "./Chrome";
import { formatDate, HEROES, RELEASES, ROMAN, STORY_LINES, WARRIORS } from "./content";
import styles from "./story.module.css";

// トレーラーの YouTube の動画 (https://youtu.be/J3Gk2fRCrWQ)
const TRAILER_ID = "J3Gk2fRCrWQ";

// 区画へ飛ぶタグの並び (id は各 section の id)
const SECTION_TAGS = [
	{ id: "story", label: "物語" },
	{ id: "trailer", label: "Trailer" },
	{ id: "travelers", label: "旅人" },
	{ id: "wall", label: "Special Thanks" },
	{ id: "records", label: "記録" },
];

export const metadata: Metadata = {
	title: { absolute: "Open Spire" },
};

// 特設サイト: ゲームのオープニングの絵 (今は 10 枚) を ＜ ＞ でめくる紙芝居、森に着いた旅人 4 人、
// Special Thanks (この世界を支えてくれた戦士たちの名前を刻んだ石壁) の順 (openslaythe の issue #1180)
export default function OpenSpirePage() {
	const latest = RELEASES[0];
	return (
		<>
			<TopBar />
			<main>
				{/* 紙芝居: 場面ごとに見えないラジオボタンを 1 つ置き、選ばれている場面だけを見せる (JS なし)。
				    ＜ ＞ と下の目盛りはラベルで、押すとその場面のラジオが選ばれる。ラジオにフォーカスがあれば左右キーでも動く */}
				<section id="story" aria-label="物語" className={styles.story}>
					{STORY_LINES.map((line, i) => (
						<Fragment key={line}>
							<input
								type="radio"
								name="scene"
								id={`scene-${i + 1}`}
								className={styles.pick}
								defaultChecked={i === 0}
								aria-label={`場面 ${i + 1} / ${STORY_LINES.length}`}
							/>
							<div className={styles.slide}>
								{/* 1 枚目は最初に見えるので先に読む */}
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
								{i > 0 ? (
									<label htmlFor={`scene-${i}`} className={`${styles.turn} ${styles.prev}`} title="前の場面">
										<ChevronLeft size={28} aria-hidden="true" />
									</label>
								) : (
									<span className={`${styles.turn} ${styles.prev} ${styles.turnOff}`} aria-hidden="true">
										<ChevronLeft size={28} />
									</span>
								)}
								{i < STORY_LINES.length - 1 ? (
									<label htmlFor={`scene-${i + 2}`} className={`${styles.turn} ${styles.next}`} title="次の場面">
										<ChevronRight size={28} aria-hidden="true" />
									</label>
								) : (
									// 最後の場面の次は、旅人たちへ下りる
									<a href="#travelers" className={`${styles.turn} ${styles.next}`} title="旅人たちへ" aria-label="旅人たちへ">
										<ChevronDown size={28} aria-hidden="true" />
									</a>
								)}
								<div className={styles.band}>
									<p className={styles.line}>{line}</p>
									<ol className={styles.ticks} aria-hidden="true">
										{STORY_LINES.map((_, t) => (
											<li key={t}>
												<label htmlFor={`scene-${t + 1}`} className={t === i ? styles.tickOn : undefined} />
											</li>
										))}
									</ol>
								</div>
							</div>
						</Fragment>
					))}
					<a className={styles.skip} href="#travelers">
						物語をとばす
						<ArrowRight size={16} aria-hidden="true" />
					</a>
				</section>

				{/* このページの区画へ飛ぶタグ。押すとその区画までスクロールする */}
				<nav aria-label="このページの区画" className={styles.tags}>
					{SECTION_TAGS.map((tag) => (
						<a key={tag.id} href={`#${tag.id}`} className={styles.tag}>
							#{tag.label}
						</a>
					))}
				</nav>

				{/* プレイ映像 (YouTube)。Cookie を置かない埋め込みにし、画面に近づくまで読まない */}
				<section id="trailer" className={styles.trailer} aria-labelledby="trailer-title">
					<h2 id="trailer-title" className={styles.trailerTitle}>
						Trailer
					</h2>
					<p className={styles.trailerText}>プレイ映像あり</p>
					<div className={styles.video}>
						<iframe
							src={`https://www.youtube-nocookie.com/embed/${TRAILER_ID}`}
							title="Open Spire Trailer"
							loading="lazy"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					</div>
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

				<section id="wall" className={styles.wallSection} aria-labelledby="thanks-title">
					<header className={styles.thanksHead}>
						<h2 id="thanks-title" className={styles.thanksTitle}>
							Special Thanks
						</h2>
						<p className={styles.thanksText}>テストをしてくれて、不具合などを教えてくれてありがとう。</p>
					</header>
					<figure className={styles.wall}>
						<img className={styles.wallArt} src="/openspire/warrior_wall.webp" alt="" loading="lazy" />
						<div className={styles.tablet}>
							<h3 className={styles.carvedTitle}>この世界を支えてくれた戦士たち</h3>
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

				<section id="records" className={styles.records} aria-label="記録">
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
