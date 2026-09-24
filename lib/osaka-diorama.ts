// Pixel-art Osaka skyline, rendered into a 320x180 software framebuffer.
// 1080p is exactly 6x this size, so the art stays crisp when scaled up.
// render(t, phase): t loops seamlessly every LOOP_SECONDS (every motion has a
// whole number of cycles per loop); phase 0..1 moves the scene from morning to night.

export const DIORAMA_W = 320;
export const DIORAMA_H = 180;
export const LOOP_SECONDS = 120;

const W = DIORAMA_W;
const H = DIORAMA_H;
const LOOP = LOOP_SECONDS;
const TAU = Math.PI * 2;

type RGB = [number, number, number];

const hex = (s: string): RGB => [
	parseInt(s.slice(1, 3), 16),
	parseInt(s.slice(3, 5), 16),
	parseInt(s.slice(5, 7), 16),
];

// Daylight colours of every surface; the time of day tints them per frame.
const C = {
	far: hex("#b3bfd2"),
	mid: hex("#8795ad"),
	midSide: hex("#6f7d96"),
	glass: hex("#5d6f8c"),
	wheel: hex("#d9463b"),
	steel: hex("#9aa3b0"),
	gondola: hex("#f4f4f4"),
	stone: hex("#aaa598"),
	stoneDark: hex("#8b867b"),
	wall: hex("#f4f0e6"),
	roof: hex("#4f9a8b"),
	roofDark: hex("#3b7a6e"),
	gold: hex("#e2b545"),
	slit: hex("#2f3440"),
	tower: hex("#8d95a3"),
	towerDark: hex("#6c7482"),
	deck: hex("#c9cfd8"),
	umeda: hex("#a3b6ce"),
	umedaLine: hex("#8093ad"),
	harukas: hex("#7f9cc0"),
	harukasLine: hex("#a9bfda"),
	harukasSide: hex("#6483a8"),
	brick: hex("#c65a44"),
	brickDark: hex("#9a4232"),
	trim: hex("#efe6d6"),
	dome: hex("#6ea890"),
	crab: hex("#e04a35"),
	crabDark: hex("#b03424"),
	shop: hex("#dccaa6"),
	awning: hex("#c8413a"),
	door: hex("#5a4331"),
	water: hex("#6f9fc4"),
	edge: hex("#8a8374"),
	bank: hex("#b7ae9b"),
	bankLine: hex("#9c9482"),
	leaf: hex("#5f9a4f"),
	leafDark: hex("#447a3a"),
	trunk: hex("#7a5a3e"),
	lamp: hex("#3c4250"),
	hull: hex("#f4f1ea"),
	hullStripe: hex("#e36f5f"),
	cabin: hex("#5a6d86"),
	bird: hex("#39404d"),
	// emissive
	warmLight: hex("#ffd98a"),
	whiteLight: hex("#eef3ff"),
	moon: hex("#e9eef6"),
	moonShade: hex("#c3cddd"),
	neonPink: hex("#ff5c93"),
	neonBlue: hex("#5fd4ff"),
	neonGreen: hex("#7dff9a"),
	neonOrange: hex("#ffb14a"),
};

// Sky and light for four key times of day, blended by phase.
type Mood = { sky: RGB[]; amb: RGB; cloud: RGB; cloudRim: RGB };
const MOODS: Mood[] = [
	{ // morning
		sky: ["#7593c8", "#98b1d6", "#c1cde0", "#efd3c2", "#ffdcae"].map(hex),
		amb: [255, 232, 214], cloud: hex("#f7e6dc"), cloudRim: hex("#ffffff"),
	},
	{ // midday
		sky: ["#3f86d6", "#5b9be0", "#80b4e8", "#a8ccef", "#d2e4f4"].map(hex),
		amb: [255, 255, 255], cloud: hex("#eef3fa"), cloudRim: hex("#ffffff"),
	},
	{ // sunset
		sky: ["#2d3b7a", "#5b4a8b", "#b0608a", "#f08a5d", "#ffc070"].map(hex),
		amb: [220, 150, 140], cloud: hex("#c9708a"), cloudRim: hex("#ffc98f"),
	},
	{ // night
		sky: ["#060918", "#0b1230", "#142250", "#1d2f62", "#2a3f77"].map(hex),
		amb: [52, 62, 110], cloud: hex("#161f3c"), cloudRim: hex("#2c3b66"),
	},
];

// 4x4 ordered-dither thresholds in (0, 1)
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const bayer = (x: number, y: number) => BAYER[(y & 3) * 4 + (x & 3)];

const hash = (n: number) => {
	const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
};
const frac = (v: number) => v - Math.floor(v);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (a: number, b: number, v: number) => {
	const k = clamp01((v - a) / (b - a));
	return k * k * (3 - 2 * k);
};
// a sine that completes `cycles` whole turns per loop
const wave = (t: number, cycles: number, phase = 0) => Math.sin((TAU * cycles * t) / LOOP + phase);
// a 0..1 sawtooth that completes `cycles` whole turns per loop
const cycle = (t: number, cycles: number, offset: number) => frac((cycles * t) / LOOP + offset);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const lerpRGB = (a: RGB, b: RGB, k: number): RGB => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];

function moodAt(phase: number): Mood {
	const s = clamp01(phase) * (MOODS.length - 1);
	const i = Math.min(MOODS.length - 2, Math.floor(s));
	const k = s - i;
	const a = MOODS[i], b = MOODS[i + 1];
	return {
		sky: a.sky.map((c, j) => lerpRGB(c, b.sky[j], k)),
		amb: lerpRGB(a.amb, b.amb, k),
		cloud: lerpRGB(a.cloud, b.cloud, k),
		cloudRim: lerpRGB(a.cloudRim, b.cloudRim, k),
	};
}

// Sun positions through the day: above Umeda in the morning, high at noon,
// low over the west at sunset, then down behind the city.
const SUN_KEYS: [number, number, number][] = [
	[0, 236, 34],
	[0.33, 180, 14],
	[0.62, 64, 64],
	[0.8, 48, 112],
];
function sunPath(phase: number): [number, number] {
	let i = 0;
	while (i < SUN_KEYS.length - 2 && phase > SUN_KEYS[i + 1][0]) i++;
	const [p0, x0, y0] = SUN_KEYS[i], [p1, x1, y1] = SUN_KEYS[i + 1];
	const k = smooth(0, 1, (phase - p0) / (p1 - p0));
	return [lerp(x0, x1, k), lerp(y0, y1, k)];
}

// ---------- layers ----------
// Every scenery pixel remembers which layer it belongs to, so the time of day
// can tint it (and haze distant ones) without redrawing the city.
const SKY = 0, FAR = 1, MID = 2, NEAR = 3, FLOODLIT = 4, WATER = 5;
const BASE = 138; // street level behind the river
const RIVER_TOP = 140;
const RIVER_BOTTOM = 160;

type Scene = { col: Uint8ClampedArray; layer: Uint8Array; windows: { x: number; y: number; h: number; warm: boolean }[] };

function put(s: Scene, x: number, y: number, c: RGB, l: number) {
	x = Math.round(x);
	y = Math.round(y);
	if (x < 0 || y < 0 || x >= W || y >= H) return;
	const i = y * W + x;
	s.col[i * 4] = c[0];
	s.col[i * 4 + 1] = c[1];
	s.col[i * 4 + 2] = c[2];
	s.col[i * 4 + 3] = 255;
	s.layer[i] = l;
}
function rect(s: Scene, x: number, y: number, w: number, h: number, c: RGB, l: number) {
	for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) put(s, x + xx, y + yy, c, l);
}
function ellipse(s: Scene, cx: number, cy: number, rx: number, ry: number, c: RGB, l: number, topHalf = false) {
	for (let dy = -ry; dy <= (topHalf ? 0 : ry); dy++)
		for (let dx = -rx; dx <= rx; dx++)
			if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1) put(s, cx + dx, cy + dy, c, l);
}
function line(s: Scene, x0: number, y0: number, x1: number, y1: number, c: RGB, l: number, wide = 1) {
	const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
	for (let k = 0; k <= n; k++)
		rect(s, Math.round(x0 + ((x1 - x0) * k) / n), Math.round(y0 + ((y1 - y0) * k) / n), wide, 1, c, l);
}
function windowGrid(s: Scene, x: number, y: number, w: number, h: number, dx: number, dy: number, seed: number) {
	for (let yy = y; yy < y + h; yy += dy)
		for (let xx = x; xx < x + w; xx += dx) {
			const r = hash(xx * 13.1 + yy * 7.7 + seed);
			if (r > 0.8) continue;
			put(s, xx, yy, C.glass, s.layer[yy * W + xx] || NEAR);
			s.windows.push({ x: xx, y: yy, h: hash(xx * 3.3 + yy * 1.9 + seed), warm: r < 0.55 });
		}
}

function skyline(s: Scene, layer: number, color: RGB, minH: number, maxH: number, seed: number) {
	for (let x = -4; x < W; ) {
		const w = 8 + Math.floor(hash(x + seed) * 14);
		const h = minH + Math.floor(hash(x * 1.7 + seed) * (maxH - minH));
		rect(s, x, BASE - h, w, h, color, layer);
		if (layer === MID) rect(s, x + w - 2, BASE - h, 2, h, C.midSide, layer);
		windowGrid(s, x + 2, BASE - h + 3, w - 4, h - 5, 3, 4, seed + x);
		x += w + Math.floor(hash(x * 2.3 + seed) * 4);
	}
}

function osakaCastle(s: Scene, cx: number) {
	// stone base with staggered blocks
	for (let y = 118; y < BASE; y++) {
		const hw = Math.round(22 + ((y - 118) / 20) * 6);
		for (let x = cx - hw; x <= cx + hw; x++) {
			const block = (y - 118) % 4 === 3 || (x + (Math.floor((y - 118) / 4) % 2) * 3) % 6 === 0;
			put(s, x, y, block ? C.stoneDark : C.stone, FLOODLIT);
		}
	}
	// five tiers of white walls under green roofs
	let y = 118;
	[36, 30, 24, 18, 12].forEach((w, tier) => {
		rect(s, cx - w / 2, y - 6, w, 6, C.wall, FLOODLIT);
		for (let x = cx - w / 2 + 2; x < cx + w / 2 - 1; x += 4) rect(s, x, y - 4, 1, 2, C.slit, FLOODLIT);
		for (let r = 0; r < 3; r++) {
			const rw = w + 8 - r * 3;
			rect(s, cx - rw / 2, y - 7 - r, rw, 1, r === 0 ? C.roofDark : C.roof, FLOODLIT);
		}
		put(s, cx - (w + 8) / 2, y - 8, C.roof, FLOODLIT);
		put(s, cx + (w + 8) / 2 - 1, y - 8, C.roof, FLOODLIT);
		if (tier === 1 || tier === 3) {
			for (let k = 0; k < 3; k++) rect(s, cx - 3 + k, y - 12 + k, 7 - k * 2, 1, C.roof, FLOODLIT);
			put(s, cx, y - 12, C.gold, FLOODLIT);
		}
		y -= 9;
	});
	put(s, cx - 4, y + 7, C.gold, FLOODLIT);
	put(s, cx + 3, y + 7, C.gold, FLOODLIT);
	rect(s, cx - 3, y + 8, 6, 1, C.gold, FLOODLIT);
}

function tsutenkaku(s: Scene, cx: number) {
	line(s, cx - 10, BASE, cx - 4, 112, C.towerDark, NEAR, 2);
	line(s, cx + 9, BASE, cx + 3, 112, C.towerDark, NEAR, 2);
	rect(s, cx - 7, 124, 14, 1, C.towerDark, NEAR);
	for (let y = 66; y < 112; y++)
		for (let x = cx - 4; x <= cx + 4; x++) {
			const lattice = (x - cx + y) % 4 === 0 || (x - cx - y) % 4 === 0 || Math.abs(x - cx) === 4;
			put(s, x, y, lattice ? C.tower : C.towerDark, NEAR);
		}
	rect(s, cx - 7, 57, 15, 9, C.deck, NEAR);
	rect(s, cx - 7, 60, 15, 2, C.slit, NEAR);
	rect(s, cx - 2, 48, 5, 9, C.tower, NEAR);
	rect(s, cx - 3, 44, 7, 4, C.deck, NEAR);
	line(s, cx, 36, cx, 44, C.towerDark, NEAR);
}

function umedaSky(s: Scene, x: number) {
	for (const tx of [x, x + 26]) {
		rect(s, tx, 62, 12, BASE - 62, C.umeda, NEAR);
		for (let y = 64; y < BASE; y += 2) rect(s, tx, y, 12, 1, C.umedaLine, NEAR);
		windowGrid(s, tx + 2, 66, 9, BASE - 70, 3, 4, tx);
	}
	// the floating garden with its ring-shaped hole
	for (let y = 55; y < 64; y++)
		for (let xx = x; xx < x + 38; xx++)
			if (Math.hypot(xx - (x + 19), y - 59.5) > 4.5) put(s, xx, y, y < 57 ? C.deck : C.umeda, NEAR);
	line(s, x + 12, 96, x + 26, 84, C.umedaLine, NEAR);
}

function abenoHarukas(s: Scene, x: number) {
	const steps = [
		{ x: x + 2, y: 84, w: 34 },
		{ x: x + 6, y: 56, w: 28 },
		{ x: x + 11, y: 30, w: 20 },
	];
	steps.forEach((st, i) => {
		const bottom = i === 0 ? BASE : steps[i - 1].y;
		rect(s, st.x, st.y, st.w, bottom - st.y, C.harukas, NEAR);
		for (let xx = st.x + 1; xx < st.x + st.w - 3; xx += 3) rect(s, xx, st.y, 1, bottom - st.y, C.harukasLine, NEAR);
		rect(s, st.x + st.w - 3, st.y, 3, bottom - st.y, C.harukasSide, NEAR);
		windowGrid(s, st.x + 2, st.y + 2, st.w - 6, bottom - st.y - 4, 3, 3, st.y);
	});
}

function publicHall(s: Scene, x: number) {
	rect(s, x, 122, 48, BASE - 122, C.brick, FLOODLIT);
	for (const yy of [122, 129]) rect(s, x, yy, 48, 1, C.trim, FLOODLIT);
	for (let xx = x + 3; xx < x + 46; xx += 5) if (Math.abs(xx - (x + 24)) > 8) rect(s, xx, 124, 2, 4, C.slit, FLOODLIT);
	rect(s, x, 116, 6, 22, C.brickDark, FLOODLIT);
	rect(s, x + 42, 116, 6, 22, C.brickDark, FLOODLIT);
	rect(s, x - 1, 115, 8, 1, C.dome, FLOODLIT);
	rect(s, x + 41, 115, 8, 1, C.dome, FLOODLIT);
	ellipse(s, x + 24, 122, 11, 7, C.dome, FLOODLIT, true);
	ellipse(s, x + 24, 133, 6, 6, C.trim, FLOODLIT, true);
	ellipse(s, x + 24, 133, 4, 4, C.slit, FLOODLIT, true);
	rect(s, x + 20, 133, 9, 5, C.slit, FLOODLIT);
}

function crabShop(s: Scene, x: number) {
	rect(s, x, 126, 22, BASE - 126, C.shop, NEAR);
	for (let xx = x; xx < x + 22; xx++) put(s, xx, 126, xx % 4 < 2 ? C.awning : C.trim, NEAR);
	rect(s, x + 8, 131, 6, 7, C.door, NEAR);
}

function tree(s: Scene, cx: number, cy: number, r: number) {
	rect(s, cx - 1, cy, 3, H - cy, C.trunk, NEAR);
	ellipse(s, cx, cy, r, Math.round(r * 0.85), C.leafDark, NEAR);
	ellipse(s, cx - 2, cy - 2, r - 2, Math.round((r - 2) * 0.8), C.leaf, NEAR);
}

const LAMPS = [60, 150, 250];
const WHEEL = { x: 46, y: 100, r: 26 };
const CRAB = { x: 81, y: 121 };

function buildCity(): Scene {
	const s: Scene = { col: new Uint8ClampedArray(W * H * 4), layer: new Uint8Array(W * H), windows: [] };
	skyline(s, FAR, C.far, 20, 58, 11);
	skyline(s, MID, C.mid, 14, 44, 37);
	umedaSky(s, 212);
	abenoHarukas(s, 262);
	tsutenkaku(s, 184);
	osakaCastle(s, 128);
	line(s, WHEEL.x, WHEEL.y, WHEEL.x - 12, BASE, C.steel, NEAR, 2);
	line(s, WHEEL.x, WHEEL.y, WHEEL.x + 12, BASE, C.steel, NEAR, 2);
	crabShop(s, 70);
	publicHall(s, 150);
	// riverbank, river and promenade
	rect(s, 0, BASE, W, RIVER_TOP - BASE, C.edge, NEAR);
	rect(s, 0, RIVER_TOP, W, RIVER_BOTTOM - RIVER_TOP, C.water, WATER);
	for (let y = RIVER_BOTTOM; y < H; y++)
		for (let x = 0; x < W; x++) put(s, x, y, y === RIVER_BOTTOM || (y - RIVER_BOTTOM) % 7 === 0 || x % 16 === 0 ? C.bankLine : C.bank, NEAR);
	for (const lx of LAMPS) {
		rect(s, lx, 158, 1, 18, C.lamp, NEAR);
		rect(s, lx - 1, 156, 3, 2, C.lamp, NEAR);
	}
	tree(s, 12, 152, 13);
	tree(s, 308, 150, 14);
	tree(s, 118, 162, 6);
	tree(s, 206, 163, 6);
	return s;
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
	const city = buildCity();
	const image = new ImageData(W, H);
	const f = image.data;
	const glow = new Float32Array(W * H);

	const px = (x: number, y: number, c: RGB, a = 1) => {
		x = Math.round(x);
		y = Math.round(y);
		if (x < 0 || y < 0 || x >= W || y >= H) return;
		const j = (y * W + x) * 4;
		f[j] += (c[0] - f[j]) * a;
		f[j + 1] += (c[1] - f[j + 1]) * a;
		f[j + 2] += (c[2] - f[j + 2]) * a;
	};
	const tint = (c: RGB, amb: RGB): RGB => [(c[0] * amb[0]) / 255, (c[1] * amb[1]) / 255, (c[2] * amb[2]) / 255];

	const clouds = [
		{ y: 14, ...buildCloud(80, 18, 1), cycles: 1, off: 0.1 },
		{ y: 34, ...buildCloud(56, 14, 2), cycles: 2, off: 0.55 },
		{ y: 4, ...buildCloud(96, 20, 3), cycles: 1, off: 0.7 },
		{ y: 50, ...buildCloud(64, 14, 4), cycles: 1, off: 0.35 },
	];
	const stars = Array.from({ length: 70 }, (_, i) => ({
		x: Math.floor(hash(i * 3.7) * W),
		y: Math.floor(hash(i * 5.1) * 95),
		cycles: 20 + Math.floor(hash(i * 7.3) * 60),
		ph: hash(i * 1.1) * TAU,
	}));
	const birds = Array.from({ length: 5 }, (_, i) => ({
		off: hash(i * 2.9),
		y: 30 + hash(i * 4.3) * 40,
		cycles: 2 + (i % 2),
		flap: 90 + i * 7,
	}));
	const shimmer = Array.from({ length: 36 }, (_, i) => ({
		y: RIVER_TOP + 1 + Math.floor(hash(i * 6.1) * (RIVER_BOTTOM - RIVER_TOP - 2)),
		x: hash(i * 9.7) * W,
		cycles: 3 + Math.floor(hash(i * 2.2) * 5),
		len: 2 + Math.floor(hash(i * 4.4) * 4),
	}));

	const addGlow = (cx: number, cy: number, r: number, s: number) => {
		for (let y = Math.max(0, Math.floor(cy - r)); y < Math.min(H, cy + r); y++)
			for (let x = Math.max(0, Math.floor(cx - r)); x < Math.min(W, cx + r); x++) {
				const k = 1 - Math.hypot(x - cx, y - cy) / r;
				if (k > 0) glow[y * W + x] += k * k * s;
			}
	};

	return function render(t: number, phase = 0): ImageData {
		const mood = moodAt(phase);
		const night = smooth(0.62, 0.95, phase);
		const dusk = smooth(0.45, 0.72, phase) * (1 - smooth(0.85, 1, phase));
		const amb = mood.amb;
		const horizon = mood.sky[4];

		// sky gradient, dithered between the five stops
		const stops = [0, 30, 65, 100, 135];
		for (let y = 0; y < H; y++) {
			let s = 0;
			while (s < stops.length - 2 && y >= stops[s + 1]) s++;
			const k = clamp01((y - stops[s]) / (stops[s + 1] - stops[s]));
			for (let x = 0; x < W; x++) {
				const c = k > bayer(x, y) ? mood.sky[s + 1] : mood.sky[s];
				const j = (y * W + x) * 4;
				f[j] = c[0];
				f[j + 1] = c[1];
				f[j + 2] = c[2];
				f[j + 3] = 255;
			}
		}

		// stars and the moon at night
		for (const st of stars) {
			const a = night * (0.55 + 0.45 * wave(t, st.cycles, st.ph));
			if (a > 0.05) px(st.x, st.y, C.moon, a);
		}
		const moonA = smooth(0.72, 0.92, phase);
		if (moonA > 0) {
			const mx = 262, my = 26;
			for (let y = my - 22; y <= my + 22; y++)
				for (let x = mx - 22; x <= mx + 22; x++) {
					const d = Math.hypot(x - mx, y - my);
					if (d <= 8) px(x, y, x - mx < -3 && bayer(x, y) < 0.6 ? C.moonShade : C.moon, moonA);
					else if (d < 22 && ((1 - (d - 8) / 14) ** 2) * moonA > bayer(x, y)) px(x, y, C.moonShade, 0.18);
				}
		}

		// the sun travels right to left and sets behind the city
		const sunA = 1 - smooth(0.7, 0.8, phase);
		if (sunA > 0) {
			const [sx, sy] = sunPath(phase);
			const core = lerpRGB(hex("#fff6d8"), hex("#ffa25a"), smooth(0.4, 0.7, phase));
			for (let y = Math.floor(sy - 30); y <= sy + 30; y++)
				for (let x = Math.floor(sx - 30); x <= sx + 30; x++) {
					const d = Math.hypot(x - sx, y - sy);
					if (d <= 8) px(x, y, core, sunA);
					else if (d < 30) {
						const k = (1 - (d - 8) / 22) ** 2;
						if (k > bayer(x, y) * 1.2) px(x, y, core, 0.35 * sunA);
					}
				}
		}

		// drifting clouds
		for (const c of clouds) {
			const cx = Math.round(cycle(t, c.cycles, c.off) * (W + c.w) - c.w);
			for (let y = 0; y < c.h; y++)
				for (let x = 0; x < c.w; x++) {
					const m = c.m[y * c.w + x];
					if (m) px(cx + x, c.y + y, m === 2 ? mood.cloudRim : mood.cloud, m === 2 ? 0.75 : 0.85);
				}
		}

		// birds by day
		if (night < 0.5)
			for (const b of birds) {
				const bx = cycle(t, b.cycles, b.off) * (W + 20) - 10;
				const by = b.y + 3 * wave(t, 7, b.off * 6);
				const up = wave(t, b.flap) > 0;
				const a = 1 - night * 2;
				px(bx, by, C.bird, a);
				px(bx - 1, by + (up ? -1 : 0), C.bird, a);
				px(bx + 1, by + (up ? -1 : 0), C.bird, a);
				px(bx - 2, by + (up ? -1 : 1), C.bird, a);
				px(bx + 2, by + (up ? -1 : 1), C.bird, a);
			}

		// city, tinted by the time of day and hazed with distance
		const flood = lerpRGB(amb, [235, 225, 205], night * 0.85);
		for (let i = 0; i < W * H; i++) {
			const l = city.layer[i];
			if (l === SKY) continue;
			const j = i * 4;
			const a = l === FLOODLIT ? flood : amb;
			let r = (city.col[j] * a[0]) / 255, g = (city.col[j + 1] * a[1]) / 255, b = (city.col[j + 2] * a[2]) / 255;
			const haze = l === FAR ? 0.5 : l === MID ? 0.22 : 0;
			if (haze) {
				r = lerp(r, horizon[0], haze);
				g = lerp(g, horizon[1], haze);
				b = lerp(b, horizon[2], haze);
			}
			f[j] = r;
			f[j + 1] = g;
			f[j + 2] = b;
		}

		// Ferris wheel turning once per loop, lit with running colours at night
		const spin = cycle(t, 1, 0) * TAU;
		const steel = tint(C.steel, amb);
		for (let k = 0; k < 12; k++) {
			const a = spin + (k / 12) * TAU;
			for (let r = 0; r < WHEEL.r; r += 1) px(WHEEL.x + Math.cos(a) * r, WHEEL.y + Math.sin(a) * r, steel);
		}
		const neon = [C.neonPink, C.neonBlue, C.neonGreen, C.neonOrange];
		for (let k = 0; k < 96; k++) {
			const a = (k / 96) * TAU;
			const x = WHEEL.x + Math.cos(a) * WHEEL.r, y = WHEEL.y + Math.sin(a) * WHEEL.r;
			px(x, y, tint(C.wheel, amb));
			if (night > 0) px(x, y, neon[(k + Math.floor(cycle(t, 30, 0) * 4)) % 4], night * 0.9);
		}
		for (let k = 0; k < 16; k++) {
			const a = spin + (k / 16) * TAU;
			const x = Math.round(WHEEL.x + Math.cos(a) * WHEEL.r) - 1, y = Math.round(WHEEL.y + Math.sin(a) * WHEEL.r);
			const c = tint(k % 4 === 0 ? C.wheel : C.gondola, amb);
			for (let yy = 0; yy < 2; yy++) for (let xx = 0; xx < 3; xx++) px(x + xx, y + yy, c);
		}
		px(WHEEL.x, WHEEL.y, tint(C.wheel, amb));

		// the crab sign waving its claws
		const claw = wave(t, 50);
		const crab = tint(C.crab, amb), crabDark = tint(C.crabDark, amb);
		for (let dy = -4; dy <= 4; dy++)
			for (let dx = -7; dx <= 7; dx++)
				if ((dx * dx) / 49 + (dy * dy) / 16 <= 1) px(CRAB.x + dx, CRAB.y + dy, dy > 1 ? crabDark : crab);
		for (let k = 0; k < 3; k++) {
			for (const side of [-1, 1]) {
				const kick = wave(t, 50, k + side) * 1.2;
				const x0 = CRAB.x + side * (4 + k * 2), y0 = CRAB.y + 2;
				for (let s = 0; s < 5; s++) px(x0 + side * s * 0.8, y0 + s * 0.8 + (s > 2 ? kick : 0), crabDark);
			}
		}
		for (const side of [-1, 1]) {
			const ax = CRAB.x + side * 7, ay = CRAB.y - 2;
			const lift = side === 1 ? claw : -claw;
			for (let s = 0; s < 5; s++) px(ax + side * s, ay - s * 0.9 - lift * s * 0.3, crab);
			const cx = ax + side * 5, cy = ay - 5 - lift * 1.5;
			for (let yy = -2; yy <= 1; yy++) for (let xx = -1; xx <= 1; xx++) px(cx + xx + side, cy + yy, crab);
		}
		px(CRAB.x - 2, CRAB.y - 6, C.gondola);
		px(CRAB.x + 2, CRAB.y - 6, C.gondola);
		px(CRAB.x - 2, CRAB.y - 5, crabDark);
		px(CRAB.x + 2, CRAB.y - 5, crabDark);

		// windows light up one by one as night falls
		for (const w of city.windows) {
			if (w.h < night * 0.85 + dusk * 0.25) px(w.x, w.y, w.warm ? C.warmLight : C.whiteLight, 0.95);
		}

		// landmark illumination
		glow.fill(0);
		if (night > 0) {
			const tx = 184;
			const band = [C.neonPink, C.neonOrange, C.neonBlue][Math.floor(cycle(t, 12, 0) * 3)];
			for (let y = 67; y < 111; y += 1) {
				px(tx - 4, y, C.neonPink, night * 0.85);
				px(tx + 4, y, C.neonBlue, night * 0.85);
			}
			for (let x = tx - 7; x <= tx + 7; x++) px(x, 60, C.neonOrange, night);
			for (let x = tx - 3; x <= tx + 3; x++) for (let y = 44; y < 48; y++) px(x, y, band, night);
			addGlow(tx, 46, 16, night * 0.6);
			for (let x = 273; x < 293; x++) px(x, 30, C.whiteLight, night);
			addGlow(283, 31, 18, night * 0.5);
			for (let x = 212; x < 250; x++) px(x, 55, C.neonBlue, night * 0.8);
			addGlow(231, 58, 16, night * 0.4);
			for (const lx of LAMPS) {
				for (let x = lx - 1; x <= lx + 1; x++) px(x, 156, C.warmLight, night);
				addGlow(lx, 158, 20, night * 0.9);
			}
			addGlow(128, 100, 34, night * 0.25);
		}
		for (let i = 0; i < W * H; i++) {
			const g = glow[i];
			if (!g) continue;
			const q = Math.floor(g * 4 + bayer(i % W, (i / W) | 0)) / 4;
			const j = i * 4;
			f[j] += q * 90;
			f[j + 1] += q * 70;
			f[j + 2] += q * 40;
		}

		// the river mirrors the city, rippling and darker with depth
		const water = tint(C.water, amb);
		for (let y = RIVER_TOP; y < RIVER_BOTTOM; y++) {
			const depth = (y - RIVER_TOP) / (RIVER_BOTTOM - RIVER_TOP);
			const sy = 2 * RIVER_TOP - y - 3;
			const wob = Math.round(Math.sin(y * 0.9 + (TAU * 30 * t) / LOOP) * (0.6 + depth * 1.6));
			for (let x = 0; x < W; x++) {
				if (city.layer[y * W + x] !== WATER) continue;
				const sx = Math.min(W - 1, Math.max(0, x + wob));
				const s = (sy * W + sx) * 4, j = (y * W + x) * 4;
				const k = 0.45 + depth * 0.25;
				f[j] = lerp(f[s], water[0], k);
				f[j + 1] = lerp(f[s + 1], water[1], k);
				f[j + 2] = lerp(f[s + 2], water[2], k);
			}
		}
		const glint = lerpRGB(horizon, [255, 255, 255], 0.5);
		for (const sh of shimmer) {
			const x0 = (sh.x + cycle(t, sh.cycles, 0) * W) % W;
			for (let k = 0; k < sh.len; k++) px(x0 + k, sh.y, glint, 0.35 + night * 0.2);
		}

		// sightseeing boat crossing the river
		const bx = Math.round(W + 20 - cycle(t, 2, 0.3) * (W + 60));
		const hull = tint(C.hull, amb), stripe = tint(C.hullStripe, amb), cabin = tint(C.cabin, amb);
		for (let x = 0; x < 38; x++) {
			const taper = x < 3 ? 3 - x : 0;
			for (let y = 151 + taper; y < 156; y++) px(bx + x, y, y === 153 ? stripe : hull);
		}
		for (let x = 5; x < 33; x++) for (let y = 146; y < 151; y++) px(bx + x, y, y === 146 ? hull : cabin);
		if (night > 0) for (let x = 6; x < 32; x += 2) px(bx + x, 148, C.warmLight, night);

		// gentle vignette, deeper at night
		const vig = 0.18 + night * 0.25;
		for (let y = 0; y < H; y++)
			for (let x = 0; x < W; x++) {
				const dx = (x - W / 2) / (W / 2), dy = (y - H / 2) / (H / 2);
				const v = 1 - vig * (dx * dx * 0.6 + dy * dy * 0.8);
				const j = (y * W + x) * 4;
				f[j] *= v;
				f[j + 1] *= v;
				f[j + 2] *= v;
			}
		return image;
	};
}
