// Pixel-art Halloween diorama, rendered into a 320x180 software framebuffer.
// 1080p is exactly 6x this size, so the art stays crisp when scaled up.
// Every moving thing is a pure function of t in [0, LOOP_SECONDS) with a whole
// number of cycles per loop, so the animation repeats seamlessly for hours.

export const DIORAMA_W = 320;
export const DIORAMA_H = 180;
export const LOOP_SECONDS = 120;

const W = DIORAMA_W;
const H = DIORAMA_H;
const LOOP = LOOP_SECONDS;
const TAU = Math.PI * 2;

type RGB = [number, number, number];
type Px = Uint8ClampedArray;

const hex = (s: string): RGB => [
	parseInt(s.slice(1, 3), 16),
	parseInt(s.slice(3, 5), 16),
	parseInt(s.slice(5, 7), 16),
];

const C = {
	// cold night
	sky: ["#070a18", "#0e1531", "#18244b", "#26375f", "#324676"].map(hex),
	moon: hex("#dfe7f2"),
	moonShade: hex("#aebcd2"),
	halo: hex("#3d5288"),
	cloud: hex("#161f3d"),
	cloudRim: hex("#33467a"),
	farHill: hex("#1c2849"),
	midHill: hex("#131b33"),
	midRim: hex("#26365e"),
	house: hex("#1a2037"),
	houseLine: hex("#151a2d"),
	roof: hex("#0e1221"),
	roofRim: hex("#2a3860"),
	dark: hex("#0a0c15"),
	tree: hex("#090d18"),
	treeFar: hex("#10172b"),
	ground: hex("#0c111e"),
	grass: hex("#16232b"),
	blade: hex("#1d2e31"),
	stone: hex("#2a3350"),
	stoneLit: hex("#3c4869"),
	stoneDark: hex("#1d243b"),
	puddle: hex("#141d35"),
	puddleRim: hex("#090d18"),
	fog: hex("#2b3858"),
	smoke: hex("#4a5370"),
	rainFar: hex("#3d5180"),
	rainNear: hex("#8ea8d2"),
	ripple: hex("#6f88b6"),
	// warm pockets
	white: hex("#fff7d6"),
	yellow: hex("#ffd166"),
	orange: hex("#ff9f1c"),
	red: hex("#e2531a"),
	ember: hex("#8f2410"),
	windowHot: hex("#ffd98a"),
	windowWarm: hex("#d2701f"),
	mullion: hex("#3a1d0e"),
	pumpkin: hex("#5b270c"),
	pumpkinRib: hex("#421b08"),
	pumpkinTop: hex("#7a3812"),
	stem: hex("#2e3b15"),
	faceHot: hex("#ffd35c"),
	faceWarm: hex("#ff8a1f"),
	log: hex("#3a2418"),
	firePit: hex("#2b2f3c"),
	firePitLit: hex("#3d4252"),
	iron: hex("#1a1b24"),
	catEye: hex("#c8f06a"),
};

// 4x4 ordered-dither thresholds in (0, 1)
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const bayer = (x: number, y: number) => BAYER[(y & 3) * 4 + (x & 3)];

const hash = (n: number) => {
	const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
};
const frac = (v: number) => v - Math.floor(v);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
// a sine that completes `cycles` whole turns per loop
const wave = (t: number, cycles: number, phase = 0) => Math.sin((TAU * cycles * t) / LOOP + phase);
// a 0..1 sawtooth that completes `cycles` whole turns per loop
const cycle = (t: number, cycles: number, offset: number) => frac((cycles * t) / LOOP + offset);
// whole cycles per loop for a desired period in seconds
const cyclesFor = (seconds: number) => Math.max(1, Math.round(LOOP / seconds));
const lerpRGB = (a: RGB, b: RGB, k: number): RGB => [
	a[0] + (b[0] - a[0]) * k,
	a[1] + (b[1] - a[1]) * k,
	a[2] + (b[2] - a[2]) * k,
];

// ---------- pixel primitives ----------

function put(d: Px, x: number, y: number, c: RGB) {
	x = Math.floor(x);
	y = Math.floor(y);
	if (x < 0 || y < 0 || x >= W || y >= H) return;
	const i = (y * W + x) * 4;
	d[i] = c[0];
	d[i + 1] = c[1];
	d[i + 2] = c[2];
	d[i + 3] = 255;
}

function blend(d: Px, x: number, y: number, c: RGB, a: number) {
	x = Math.floor(x);
	y = Math.floor(y);
	if (x < 0 || y < 0 || x >= W || y >= H) return;
	const i = (y * W + x) * 4;
	d[i] += (c[0] - d[i]) * a;
	d[i + 1] += (c[1] - d[i + 1]) * a;
	d[i + 2] += (c[2] - d[i + 2]) * a;
}

function rect(d: Px, x: number, y: number, w: number, h: number, c: RGB) {
	for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) put(d, x + xx, y + yy, c);
}

function ellipse(d: Px, cx: number, cy: number, rx: number, ry: number, c: RGB) {
	for (let dy = -ry; dy <= ry; dy++)
		for (let dx = -rx; dx <= rx; dx++)
			if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1) put(d, cx + dx, cy + dy, c);
}

function line(d: Px, x0: number, y0: number, x1: number, y1: number, c: RGB) {
	const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
	for (let s = 0; s <= n; s++) put(d, Math.round(x0 + ((x1 - x0) * s) / n), Math.round(y0 + ((y1 - y0) * s) / n), c);
}

// isosceles triangle pointing up
function peak(d: Px, ax: number, ay: number, by: number, halfW: number, c: RGB) {
	for (let y = ay; y <= by; y++) {
		const hw = Math.round((halfW * (y - ay)) / (by - ay));
		rect(d, ax - hw, y, hw * 2 + 1, 1, c);
	}
}

// ---------- layout ----------

const farHillY = (x: number) => 118 + 6 * Math.sin(x * 0.03) + 4 * Math.sin(x * 0.071 + 1) + 2 * Math.sin(x * 0.17);
const midHillY = (x: number) => Math.min(140 + 3 * Math.sin(x * 0.05), 100 + (x - 248) ** 2 / 240);
const groundY = (x: number) => Math.round(147 + 3 * Math.sin(x * 0.045 + 2) + 1.5 * Math.sin(x * 0.13 + 1));

const FIRE = { x: 112, y: groundY(112) - 2 };
const CHIMNEY = { x: 265, y: 54 };
const LANTERN_PIVOT = { x: 46, y: 77 };
const WINDOWS = [
	{ x: 226, y: 60, w: 5, h: 7 },
	{ x: 226, y: 84, w: 5, h: 7 },
	{ x: 240, y: 84, w: 6, h: 7 },
	{ x: 266, y: 84, w: 5, h: 7 },
	{ x: 245, y: 63, w: 6, h: 5 },
];
const PUMPKINS = [
	{ x: 80, r: 6 },
	{ x: 136, r: 4 },
	{ x: 212, r: 5 },
].map((p) => ({ ...p, y: groundY(p.x) - p.r + 2 }));
const PUDDLES = [
	{ x: 152, y: 170, rx: 12 },
	{ x: 58, y: 173, rx: 8 },
	{ x: 238, y: 168, rx: 10 },
];
const CAT_STONE = { x: 146, w: 10, h: 13 };
const CAT = { x: CAT_STONE.x + 2, y: groundY(CAT_STONE.x + 5) - CAT_STONE.h - 6 };

// ---------- static layers (built once) ----------

function buildSky(): Px {
	const d = new Uint8ClampedArray(W * H * 4);
	const stops = [0, 45, 85, 115, 140];
	for (let y = 0; y < H; y++) {
		let s = 0;
		while (s < stops.length - 2 && y >= stops[s + 1]) s++;
		const f = clamp01((y - stops[s]) / (stops[s + 1] - stops[s]));
		for (let x = 0; x < W; x++) put(d, x, y, f > bayer(x, y) ? C.sky[s + 1] : C.sky[s]);
	}
	// moon with a dithered halo
	const mx = 258, my = 34, r = 10;
	for (let y = my - 30; y <= my + 30; y++)
		for (let x = mx - 30; x <= mx + 30; x++) {
			const dist = Math.hypot(x - mx, y - my);
			if (dist <= r) {
				const shaded = x - mx < -r * 0.45 && bayer(x, y) < 0.6;
				put(d, x, y, shaded ? C.moonShade : C.moon);
			} else if (dist < r + 20) {
				const k = (1 - (dist - r) / 20) ** 2;
				if (k > bayer(x, y)) blend(d, x, y, C.halo, 0.45);
			}
		}
	ellipse(d, mx + 3, my - 3, 2, 2, C.moonShade);
	ellipse(d, mx - 2, my + 4, 1, 1, C.moonShade);
	put(d, mx + 5, my + 3, C.moonShade);
	return d;
}

function tree(d: Px, x: number, y: number, ang: number, len: number, wid: number, depth: number, seed: number, c: RGB) {
	const ex = x + Math.cos(ang) * len;
	const ey = y - Math.sin(ang) * len;
	const n = Math.ceil(len);
	for (let s = 0; s <= n; s++) {
		const k = s / n;
		const w = Math.max(1, Math.round(wid * (1 - k * 0.35)));
		rect(d, Math.round(x + (ex - x) * k - w / 2), Math.round(y + (ey - y) * k - w / 2), w, w, c);
	}
	if (depth === 0) return;
	for (let k = 0; k < 2; k++) {
		const a = ang + (k === 0 ? -1 : 1) * (0.3 + hash(seed * 13 + k) * 0.5);
		tree(d, ex, ey, a, len * (0.6 + hash(seed * 7 + k) * 0.2), wid * 0.62, depth - 1, seed * 2 + k + 1, c);
	}
}

function tombstone(d: Px, x: number, w: number, h: number) {
	const base = groundY(x + w / 2) + 1;
	const top = base - h;
	const r = Math.floor(w / 2);
	rect(d, x, top + r, w, h - r, C.stone);
	ellipse(d, x + r, top + r, r, r, C.stone);
	for (let y = top + 1; y < base; y++) {
		put(d, x + w - 1, y + (y < top + r ? 1 : 0), C.stoneLit);
		put(d, x, y + (y < top + r ? 1 : 0), C.stoneDark);
	}
	line(d, x + r - 1, top + 3, x + r, top + 6, C.stoneDark);
}

function buildScenery(): Px {
	const d = new Uint8ClampedArray(W * H * 4);

	// far hills with a row of pines
	for (let x = 0; x < W; x++) for (let y = Math.round(farHillY(x)); y < H; y++) put(d, x, y, C.farHill);
	for (let x = 2; x < W; x += 6 + Math.floor(hash(x) * 5)) {
		const h = 4 + Math.floor(hash(x * 3.3) * 7);
		peak(d, x, Math.round(farHillY(x)) - h, Math.round(farHillY(x)), Math.ceil(h / 3), C.farHill);
	}

	// hill with the house, rim-lit by the moon
	for (let x = 0; x < W; x++) {
		const top = Math.round(midHillY(x));
		for (let y = top; y < H; y++) put(d, x, y, C.midHill);
		if (x > 190) put(d, x, top, C.midRim);
	}
	tree(d, 298, Math.round(midHillY(298)) + 2, Math.PI / 2 + 0.15, 20, 3, 5, 3, C.treeFar);

	// house
	rect(d, 222, 74, 52, 28, C.house);
	for (let y = 77; y < 102; y += 4) rect(d, 222, y, 52, 1, C.houseLine);
	peak(d, 248, 54, 74, 32, C.roof);
	line(d, 249, 54, 280, 74, C.roofRim);
	rect(d, 262, 55, 7, 2, C.roof);
	rect(d, 263, 57, 5, 12, C.house);
	rect(d, 223, 52, 13, 50, C.house);
	for (let y = 55; y < 102; y += 4) rect(d, 223, y, 13, 1, C.houseLine);
	peak(d, 229, 34, 52, 9, C.roof);
	line(d, 230, 34, 238, 52, C.roofRim);
	line(d, 229, 28, 229, 34, C.iron);
	rect(d, 254, 86, 11, 2, C.roof);
	rect(d, 256, 88, 7, 14, C.dark);
	rect(d, 252, 101, 15, 2, C.houseLine);
	for (const w of WINDOWS) rect(d, w.x - 1, w.y - 1, w.w + 2, w.h + 2, C.dark);

	// foreground ground with grass tufts
	for (let x = 0; x < W; x++) {
		const top = groundY(x);
		for (let y = top; y < H; y++) put(d, x, y, y < top + 2 ? C.grass : C.ground);
		if (hash(x * 1.7) > 0.55) line(d, x, top - 1 - Math.floor(hash(x * 2.9) * 3), x, top, C.blade);
	}

	// iron fence on the right
	for (let x = 272; x < W; x += 5) {
		const g = groundY(x);
		line(d, x, g - 11, x, g, C.iron);
		put(d, x, g - 12, C.iron);
	}
	for (let x = 272; x < W; x++) {
		put(d, x, groundY(x) - 9, C.iron);
		put(d, x, groundY(x) - 3, C.iron);
	}

	// big dead tree framing the left side, plus the lantern branch
	tree(d, 16, 152, Math.PI / 2 - 0.08, 48, 7, 6, 1, C.tree);
	tree(d, 20, 80, 0.12, 40, 3, 2, 9, C.tree);

	// graves and the cat
	tombstone(d, CAT_STONE.x, CAT_STONE.w, CAT_STONE.h);
	rect(d, 170, groundY(171) - 14, 3, 15, C.stone);
	rect(d, 167, groundY(171) - 10, 9, 3, C.stone);
	put(d, 172, groundY(171) - 13, C.stoneLit);
	tombstone(d, 186, 7, 8);
	tombstone(d, 58, 8, 10);
	tombstone(d, 292, 11, 12);
	const catRows = ["#...#.", "#####.", "#####.", ".####.", ".#####", ".######", "######"];
	catRows.forEach((row, yy) =>
		[...row].forEach((ch, xx) => ch === "#" && put(d, CAT.x + xx, CAT.y + yy, C.dark)),
	);
	line(d, CAT.x + 7, CAT.y + 6, CAT.x + 9, CAT.y + 2, C.dark);

	// campfire: ring of stones and crossed logs
	for (let k = 0; k < 9; k++) {
		const a = Math.PI * (k / 8);
		const sx = Math.round(FIRE.x + Math.cos(a) * 10) - 1;
		const sy = Math.round(FIRE.y + 3 - Math.sin(a) * 2);
		rect(d, sx, sy, 3, 2, C.firePit);
		put(d, sx + 1, sy, C.firePitLit);
	}
	line(d, FIRE.x - 8, FIRE.y + 1, FIRE.x + 7, FIRE.y - 3, C.log);
	line(d, FIRE.x - 8, FIRE.y + 2, FIRE.x + 7, FIRE.y - 2, C.log);
	line(d, FIRE.x - 7, FIRE.y - 3, FIRE.x + 8, FIRE.y + 1, C.log);
	line(d, FIRE.x - 7, FIRE.y - 2, FIRE.x + 8, FIRE.y + 2, C.log);

	// pumpkins
	for (const p of PUMPKINS) {
		const rx = Math.round(p.r * 1.3);
		ellipse(d, p.x, p.y, rx, p.r, C.pumpkin);
		for (let dy = -p.r + 1; dy < p.r; dy++) {
			put(d, p.x - Math.round(rx / 2), p.y + dy, C.pumpkinRib);
			put(d, p.x + Math.round(rx / 2), p.y + dy, C.pumpkinRib);
		}
		rect(d, p.x - 2, p.y - p.r, 5, 1, C.pumpkinTop);
		rect(d, p.x, p.y - p.r - 2, 2, 2, C.stem);
	}

	// puddles
	for (const p of PUDDLES) {
		ellipse(d, p.x, p.y, p.rx + 1, 3, C.puddleRim);
		ellipse(d, p.x, p.y, p.rx, 2, C.puddle);
	}
	return d;
}

// Cloud sprites: soft blobs stored as 0/1/2 (none/body/rim) masks.
function buildCloud(w: number, h: number, seed: number) {
	const m = new Uint8Array(w * h);
	const blobs = Array.from({ length: 6 }, (_, k) => ({
		x: w * (0.15 + 0.7 * hash(seed + k)),
		y: h * (0.45 + 0.3 * hash(seed * 3 + k)),
		r: h * (0.3 + 0.35 * hash(seed * 5 + k)),
	}));
	for (let y = 0; y < h; y++)
		for (let x = 0; x < w; x++)
			if (blobs.some((b) => Math.hypot((x - b.x) * 0.6, y - b.y) < b.r)) m[y * w + x] = 1;
	for (let y = 1; y < h; y++)
		for (let x = 0; x < w; x++) if (m[y * w + x] && !m[(y - 1) * w + x]) m[y * w + x] = 2;
	return { w, h, m };
}

// ---------- per-frame renderer ----------

export function createDiorama() {
	const sky = buildSky();
	const scenery = buildScenery();
	const image = new ImageData(W, H);
	const f = image.data;
	const lr = new Float32Array(W * H);
	const lg = new Float32Array(W * H);
	const lb = new Float32Array(W * H);

	const vignette = new Float32Array(W * H);
	for (let y = 0; y < H; y++)
		for (let x = 0; x < W; x++) {
			const dx = (x - W / 2) / (W / 2), dy = (y - H / 2) / (H / 2);
			vignette[y * W + x] = Math.max(0.45, 1 - 0.35 * dx * dx - 0.4 * dy * dy);
		}

	const clouds = [
		{ y: 16, ...buildCloud(80, 18, 1), cycles: 1, off: 0.1 },
		{ y: 30, ...buildCloud(56, 14, 2), cycles: 2, off: 0.55 },
		{ y: 4, ...buildCloud(96, 20, 3), cycles: 1, off: 0.7 },
		{ y: 44, ...buildCloud(64, 14, 4), cycles: 1, off: 0.35 },
	];

	const rain = Array.from({ length: 280 }, (_, i) => {
		const near = hash(i * 1.31) > 0.4;
		return {
			near,
			cycles: cyclesFor((near ? 0.75 : 1.2) * (0.85 + 0.3 * hash(i * 2.7))),
			off: hash(i * 3.9),
			x: hash(i * 5.3) * (W + 60) - 30,
			len: near ? 5 : 3,
		};
	});
	const flames = Array.from({ length: 90 }, (_, i) => ({
		cycles: cyclesFor(0.5 + hash(i * 3.1) * 0.5),
		off: hash(i * 7.7),
		spread: hash(i * 1.3 + 5) - 0.5,
		height: 18 + hash(i * 3.1) * 16,
		sway: hash(i * 9.1) * 6,
	}));
	const sparks = Array.from({ length: 30 }, (_, i) => ({
		cycles: cyclesFor(1.8 + hash(i * 4.1) * 1.6),
		off: hash(i * 6.3),
		dx: hash(i * 2.2) - 0.5,
		rise: 45 + hash(i * 8.8) * 45,
		ph: hash(i * 5.5) * TAU,
	}));
	const smoke = [
		...Array.from({ length: 16 }, (_, i) => ({ src: FIRE, dy: -14, spread: 1, i })),
		...Array.from({ length: 10 }, (_, i) => ({ src: CHIMNEY, dy: 0, spread: 0.6, i: i + 40 })),
	].map((s) => ({ ...s, cycles: cyclesFor(6 * s.spread + 1 + hash(s.i * 3.7) * 3), off: hash(s.i * 1.9) }));
	const ripples = Array.from({ length: 18 }, (_, i) => ({
		pool: PUDDLES[i % PUDDLES.length],
		cycles: cyclesFor(1 + hash(i * 4.4) * 1.2),
		off: hash(i * 8.1),
		i,
	}));

	const fireFlicker = (t: number) =>
		0.85 + 0.07 * wave(t, 470) + 0.05 * wave(t, 830, 1) + 0.03 * wave(t, 1310, 2);
	const candle = (t: number, s: number) =>
		0.9 + 0.05 * wave(t, 190 + s * 7, s) + 0.04 * wave(t, 370 + s * 11, s * 2);

	const addLight = (cx: number, cy: number, r: number, c: [number, number, number], s: number) => {
		for (let y = Math.max(0, Math.floor(cy - r)); y < Math.min(H, cy + r); y++)
			for (let x = Math.max(0, Math.floor(cx - r)); x < Math.min(W, cx + r); x++) {
				const k = 1 - Math.hypot(x - cx, y - cy) / r;
				if (k <= 0) continue;
				const v = k ** 1.6 * s;
				const i = y * W + x;
				lr[i] += v * c[0];
				lg[i] += v * c[1];
				lb[i] += v * c[2];
			}
	};

	const smokePuff = (x: number, y: number, r: number, alpha: number) => {
		for (let dy = -r; dy <= r; dy++)
			for (let dx = -r; dx <= r; dx++) {
				const px = Math.round(x + dx), py = Math.round(y + dy);
				const q = (dx * dx + dy * dy) / (r * r);
				if (q > 1) continue;
				if (alpha * (1 - q) > bayer(px & 3, py & 3) * 0.9 + 0.05) blend(f, px, py, C.smoke, 0.28);
			}
	};

	return function render(t: number): ImageData {
		// sky, then drifting clouds that pass over the moon
		f.set(sky);
		for (const c of clouds) {
			const cx = Math.round(cycle(t, c.cycles, c.off) * (W + c.w) - c.w);
			for (let y = 0; y < c.h; y++)
				for (let x = 0; x < c.w; x++) {
					const m = c.m[y * c.w + x];
					if (m) blend(f, cx + x, c.y + y, m === 2 ? C.cloudRim : C.cloud, m === 2 ? 0.7 : 0.9);
				}
		}

		// bats circling the moon
		for (let i = 0; i < 3; i++) {
			const bx = Math.round(215 + 60 * wave(t, 3 + i, i * 2.1));
			const by = Math.round(38 + 16 * wave(t, 5 + 2 * i, i) + 6 * wave(t, 11, i));
			const up = (Math.floor(t * 8 + i * 3) & 1) === 0;
			const rows = up ? ["#.....#", "##.#.##", ".#####."] : ["...#...", ".#####.", "##...##"];
			rows.forEach((row, yy) => [...row].forEach((ch, xx) => ch === "#" && put(f, bx + xx - 3, by + yy, C.dark)));
		}

		// static scenery on top
		for (let i = 0; i < W * H; i++) {
			const j = i * 4;
			if (scenery[j + 3]) {
				f[j] = scenery[j];
				f[j + 1] = scenery[j + 1];
				f[j + 2] = scenery[j + 2];
			}
		}

		// low rolling mist
		for (let y = 126; y < H; y++)
			for (let x = 0; x < W; x++) {
				const n = 0.5 + 0.5 * Math.sin(x * 0.07 + (TAU * 2 * t) / LOOP) * Math.sin(x * 0.023 - (TAU * t) / LOOP + y * 0.1);
				if (((y - 126) / 54) * n * 0.55 > bayer(x, y)) blend(f, x, y, C.fog, 0.3);
			}

		// smoke from the campfire and the chimney, drifting with the wind
		for (const s of smoke) {
			const p = cycle(t, s.cycles, s.off);
			const x = s.src.x + p * p * 38 * s.spread + wave(t, 7 + (s.i % 5), s.i) * 3 * p;
			const y = s.src.y + s.dy - p * 75 * s.spread;
			smokePuff(x, y, Math.round((2 + p * 8) * s.spread + 1), Math.sin(p * Math.PI) * 0.7);
		}

		// swinging lantern (frame only; its glow comes later)
		const swing = 0.1 * wave(t, 40);
		const lx = Math.round(LANTERN_PIVOT.x + Math.sin(swing) * 10);
		const ly = Math.round(LANTERN_PIVOT.y + Math.cos(swing) * 10);
		line(f, LANTERN_PIVOT.x, LANTERN_PIVOT.y, lx, ly, C.iron);
		rect(f, lx - 2, ly, 5, 1, C.iron);
		rect(f, lx - 2, ly + 6, 5, 1, C.iron);

		// rain with splashes on the ground and ripples in puddles
		for (const r of rain) {
			const p = cycle(t, r.cycles, r.off);
			const head = -10 + p * (H + 20);
			const x0 = ((((r.x + head * 0.3) % (W + 60)) + W + 60) % (W + 60)) - 30;
			const floor = r.near ? groundY(Math.round(x0)) : 150;
			for (let k = 0; k < r.len; k++) {
				const y = head - k;
				if (y >= floor) continue;
				blend(f, x0 - k * 0.3, y, r.near ? C.rainNear : C.rainFar, r.near ? 0.65 : 0.45);
			}
			if (r.near && head >= floor) {
				const age = head - floor;
				if (age < 4) put(f, x0, floor - 1, C.rainNear);
				else if (age < 9) {
					put(f, x0 - 2, floor - 2, C.rainNear);
					put(f, x0 + 2, floor - 2, C.rainNear);
				}
			}
		}
		for (const r of ripples) {
			const p = cycle(t, r.cycles, r.off);
			const n = Math.floor((r.cycles * t) / LOOP + r.off) % r.cycles;
			const cx = r.pool.x + (hash(r.i * 100 + n) - 0.5) * r.pool.rx * 1.4;
			const rad = 1 + p * 4;
			for (let a = 0; a < TAU; a += 0.5)
				blend(f, cx + Math.cos(a) * rad, r.pool.y + Math.sin(a) * rad * 0.35, C.ripple, 0.6 * (1 - p));
		}

		// warm light from every source, ordered-dithered into bands
		lr.fill(0);
		lg.fill(0);
		lb.fill(0);
		const fire = fireFlicker(t);
		addLight(FIRE.x, FIRE.y - 6, 95 * (0.95 + 0.05 * fire), [1, 0.5, 0.18], 1.05 * fire);
		addLight(lx, ly + 3, 34, [1, 0.68, 0.32], 0.75 * candle(t, 1));
		WINDOWS.forEach((w, k) => addLight(w.x + w.w / 2, w.y + w.h / 2, 18, [1, 0.62, 0.28], 0.5 * candle(t, k + 2)));
		PUMPKINS.forEach((p, k) => addLight(p.x, p.y, 18, [1, 0.48, 0.12], 0.45 * candle(t, k + 8)));
		for (let i = 0; i < W * H; i++) {
			if (lr[i] === 0) continue;
			const th = bayer(i % W, (i / W) | 0);
			const j = i * 4;
			const qr = Math.floor(lr[i] * 5 + th) / 5, qg = Math.floor(lg[i] * 5 + th) / 5, qb = Math.floor(lb[i] * 5 + th) / 5;
			f[j] += qr * (70 + f[j] * 1.8);
			f[j + 1] += qg * (70 + f[j + 1] * 1.8);
			f[j + 2] += qb * (70 + f[j + 2] * 1.8);
		}

		// emissive details (not affected by lighting)
		WINDOWS.forEach((w, k) => {
			const glow = lerpRGB(C.windowWarm, C.windowHot, clamp01((candle(t, k + 2) - 0.82) * 6));
			for (let y = 0; y < w.h; y++) rect(f, w.x, w.y + y, w.w, 1, lerpRGB(glow, C.windowWarm, (y / w.h) * 0.5));
			rect(f, w.x + (w.w >> 1), w.y, 1, w.h, C.mullion);
			rect(f, w.x, w.y + (w.h >> 1), w.w, 1, C.mullion);
		});
		// a silhouette that walks past a window now and then
		const walk = cycle(t, 4, 0.2);
		if (walk < 0.12) {
			const w = WINDOWS[2];
			const sx = w.x - 2 + Math.round((walk / 0.12) * (w.w + 3));
			for (let y = w.y + 1; y < w.y + w.h; y++)
				for (let x = sx; x < sx + 2; x++) if (x >= w.x && x < w.x + w.w) put(f, x, y, C.mullion);
		}

		PUMPKINS.forEach((p, k) => {
			const c = lerpRGB(C.faceWarm, C.faceHot, clamp01((candle(t, k + 8) - 0.82) * 6));
			const e = p.r >= 5 ? 2 : 1;
			rect(f, p.x - 1 - e, p.y - 2, e, 1, c);
			rect(f, p.x + 2, p.y - 2, e, 1, c);
			put(f, p.x - 2, p.y - 3, c);
			put(f, p.x + 2, p.y - 3, c);
			for (let x = -p.r + 2; x <= p.r - 2; x++) if (x % 3 !== 0) put(f, p.x + x, p.y + 1, c);
			rect(f, p.x - p.r + 3, p.y + 2, (p.r - 3) * 2 + 1, 1, c);
		});

		if (cycle(t, 20, 0.3) > 0.03) {
			put(f, CAT.x + 1, CAT.y + 2, C.catEye);
			put(f, CAT.x + 3, CAT.y + 2, C.catEye);
		}

		const lantern = lerpRGB(C.orange, C.white, clamp01((candle(t, 1) - 0.82) * 6));
		rect(f, lx - 1, ly + 1, 3, 5, C.yellow);
		rect(f, lx, ly + 2, 1, 3, lantern);
		rect(f, lx - 2, ly + 1, 1, 5, C.iron);
		rect(f, lx + 2, ly + 1, 1, 5, C.iron);

		// fire: flame particles drawn cool-to-hot so the core stays on top
		rect(f, FIRE.x - 5, FIRE.y - 1, 11, 2, C.red);
		for (let pass = 0; pass < 2; pass++)
			for (const fl of flames) {
				const p = cycle(t, fl.cycles, fl.off);
				const spread = fl.spread * 15 * (1 - p * 0.8);
				const heat = 1 - p - Math.abs(spread) / 15;
				if ((heat > 0.45) !== (pass === 1)) continue;
				const x = FIRE.x + spread + wave(t, 90, fl.sway) * 1.5 * p + p * p * 3;
				const y = FIRE.y - 2 - p * fl.height;
				const size = p < 0.3 ? 3 : p < 0.6 ? 2 : 1;
				const c = heat > 0.75 ? C.white : heat > 0.55 ? C.yellow : heat > 0.35 ? C.orange : heat > 0.15 ? C.red : C.ember;
				rect(f, Math.round(x - size / 2), Math.round(y - size / 2), size, size, c);
			}
		for (let k = -4; k <= 4; k += 2) put(f, FIRE.x + k, FIRE.y, wave(t, 300 + k * 17, k) > 0 ? C.orange : C.red);

		for (const s of sparks) {
			const p = cycle(t, s.cycles, s.off);
			if (p > 0.6 && wave(t, 700 + s.cycles * 3, s.ph) < -0.2) continue;
			const x = FIRE.x + s.dx * 10 + p * p * 20 + Math.sin(p * 10 + s.ph) * 3 * p;
			const y = FIRE.y - 8 - p * s.rise;
			put(f, x, y, p < 0.3 ? C.white : p < 0.6 ? C.yellow : p < 0.85 ? C.orange : C.red);
		}

		for (let i = 0; i < W * H; i++) {
			const j = i * 4, v = vignette[i];
			f[j] *= v;
			f[j + 1] *= v;
			f[j + 2] *= v;
			f[j + 3] = 255;
		}
		return image;
	};
}
