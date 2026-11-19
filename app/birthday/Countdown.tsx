"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./birthday.module.css";

const DAY = 24 * 60 * 60 * 1000;
// 2026年11月25日 0時 (日本時間)
const TARGET = Date.UTC(2026, 10, 24, 15, 0, 0);
// ろうそくは 11月20日 0時から燃え始め、誕生日の 0時にいちばん短くなる
const BURN_SPAN = 5 * DAY;

const CONFETTI = ["#d9422c", "#f0b63a", "#3f8f8a", "#f6ecd2", "#e98a9a"];
// にぎやかしのキャラクター。置き場所と大きさは CSS の同じ名前のクラスで決める
const GUESTS = ["balloon", "popper", "drum", "trumpet", "gift"] as const;

const pad = (n: number) => String(n).padStart(2, "0");

// 紙ふぶきの位置や速さを、番号から決める (描くたびに変わらないようにする)
const spread = (n: number) => {
	const x = Math.sin(n * 127.1) * 43758.5453;
	return x - Math.floor(x);
};

// 今の時刻を 1 秒より細かく取り直す。?at=2026-11-24T23:59:50+09:00 を付けると、その時刻から始めて見られる
function useNow() {
	const [now, setNow] = useState<number | null>(null);
	useEffect(() => {
		const at = new URLSearchParams(window.location.search).get("at");
		const from = at ? new Date(at).getTime() : Number.NaN;
		const shift = Number.isNaN(from) ? 0 : from - Date.now();
		const tick = () => setNow(Date.now() + shift);
		tick();
		const id = window.setInterval(tick, 250);
		return () => window.clearInterval(id);
	}, []);
	return now;
}

// ふきだしのしっぽ。上の辺は線を引かず、ふきだしの枠線に重ねてつなぐ
function Tail() {
	return (
		<svg className={styles.tail} viewBox="0 0 70 60" aria-hidden="true">
			<path d="M4 0 L8 54 L62 0 Z" fill="var(--paper)" />
			<path d="M4 0 L8 54 L62 0" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
		</svg>
	);
}

export default function Countdown() {
	const now = useNow();
	const remaining = now === null ? null : TARGET - now;
	const done = remaining !== null && remaining <= 0;
	const pose = done ? "cheer" : "idle";

	const daysLeft = remaining === null ? null : Math.ceil(remaining / DAY);
	const d = remaining === null ? 0 : Math.floor(remaining / DAY);
	const h = remaining === null ? 0 : Math.floor(remaining / 3600000) % 24;
	const m = remaining === null ? 0 : Math.floor(remaining / 60000) % 60;
	const s = remaining === null ? 0 : Math.floor(remaining / 1000) % 60;
	// ろうそくがどこまで燃えたか。0 = まだ長い、1 = いちばん短い
	const burn = remaining === null ? 0 : Math.min(1, Math.max(0, 1 - remaining / BURN_SPAN));

	return (
		<main className={`${styles.stage} ${done ? styles.party : ""}`}>
			<p className={styles.ribbon}>
				<span>{done ? "HAPPY BIRTHDAY" : "誕生日カウントダウン"}</span>
			</p>

			<div className={styles.talk}>
				<h1 className={styles.bubble}>
					<span className={styles.who}>
						<img className={styles.name} src="/birthday/name_boku.webp" alt="Boku_Risky" />
						<span>と</span>
						<img className={styles.name} src="/birthday/name_musou.webp" alt="musoukun" />
						{!done && <span className={styles.until}>の誕生日まで</span>}
					</span>
					{done ? (
						<span className={styles.cheer}>
							<span>誕生日</span>
							<span>おめでとう！</span>
						</span>
					) : (
						<span className={styles.days}>
							<span className={styles.ato}>あと</span>
							<span className={styles.num}>{daysLeft ?? " "}</span>
							<span className={styles.nichi}>日</span>
						</span>
					)}
					<Tail />
				</h1>

				<p className={styles.cloud}>
					{done ? (
						"2026年11月25日"
					) : (
						<>
							<span className={styles.date}>11月25日（水）0時まで</span>
							<span className={styles.clock}>
								{remaining === null ? " " : `${d}日 ${pad(h)}時間 ${pad(m)}分 ${pad(s)}秒`}
							</span>
						</>
					)}
				</p>
			</div>

			{GUESTS.map((id, i) => (
				<span key={id} className={`${styles.char} ${styles[id]}`} style={{ "--lag": `${-i * 0.17}s` } as CSSProperties}>
					<img src={`/birthday/x_${id}.webp`} alt="" />
				</span>
			))}

			<span className={`${styles.char} ${styles.candle}`}>
				{done ? (
					<img src="/birthday/candle_cheer.webp" alt="" />
				) : (
					// 胴体を上から切り、切り口に溶けたろうを重ね、その上に火を置く。燃えた分だけ短くなる
					<span className={styles.rig} style={{ "--burn": burn } as CSSProperties}>
						<img className={styles.body} src="/birthday/part_body.webp" alt="" />
						<img className={styles.cap} src="/birthday/part_cap.webp" alt="" />
						<img className={styles.flame} src="/birthday/part_flame.webp" alt="" />
					</span>
				)}
			</span>
			<span className={`${styles.char} ${styles.risky}`}>
				<img src={`/birthday/risky_${pose}.webp`} alt="" />
			</span>
			<span className={`${styles.char} ${styles.cake}`}>
				<img src={`/birthday/cake_${pose}.webp`} alt="" />
			</span>

			{done && (
				<div className={styles.confetti} aria-hidden="true">
					{Array.from({ length: 70 }, (_, i) => (
						<i
							key={i}
							style={
								{
									"--x": `${spread(i) * 100}%`,
									"--y": `${spread(i + 0.5) * 90}%`,
									"--sway": `${(spread(i + 0.2) - 0.5) * 24}vw`,
									"--spin": `${(spread(i + 0.3) - 0.5) * 1440}deg`,
									"--time": `${5 + spread(i + 0.4) * 5}s`,
									"--wait": `${-spread(i + 0.6) * 10}s`,
									"--color": CONFETTI[i % CONFETTI.length],
								} as CSSProperties
							}
						/>
					))}
				</div>
			)}

			<div className={styles.film} aria-hidden="true" />
		</main>
	);
}
