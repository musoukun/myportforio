"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createDiorama, DIORAMA_H, DIORAMA_W, LOOP_SECONDS } from "@/lib/osaka-diorama";

const PLANE_W = 16;
const PLANE_H = (PLANE_W * DIORAMA_H) / DIORAMA_W;
const FOV = 40;
// Osaka Castle (pixel x 128 of 320), in plane units: narrow screens pan toward it.
const FOCUS_X = (128 / DIORAMA_W - 0.5) * PLANE_W;

// Colour of the space around the diorama, from morning (top of page) to night (bottom).
// Kept deep enough that the white page copy stays readable at every time of day.
const SPACE = ["#3f5787", "#2f5f99", "#3a2d5c", "#070a18"].map((c) => new THREE.Color(c));

const ease = (v: number) => v * v * (3 - 2 * v);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const nightOf = (phase: number) => ease(clamp01((phase - 0.62) / 0.33));

function spaceColor(phase: number, out: THREE.Color) {
	const s = clamp01(phase) * (SPACE.length - 1);
	const i = Math.min(SPACE.length - 2, Math.floor(s));
	return out.copy(SPACE[i]).lerp(SPACE[i + 1], s - i);
}

// Camera distance at which the diorama plane exactly covers the viewport.
function coverDistance(aspect: number) {
	const visibleH = Math.min(PLANE_H, PLANE_W / aspect);
	return visibleH / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
}

type Scroll = { y: number; phase: number };

// Page scroll (pixels) and how far down the page we are (0..1 = morning..night),
// smoothed so the camera and the sky glide after the scrollbar.
function useSmoothScroll() {
	const target = useRef<Scroll>({ y: 0, phase: 0 });
	const current = useRef<Scroll>({ y: 0, phase: 0 });
	useEffect(() => {
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			target.current = { y: window.scrollY, phase: max > 0 ? window.scrollY / max : 0 };
		};
		onScroll();
		current.current = { ...target.current };
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);
	useFrame((_, dt) => {
		const k = 1 - Math.exp(-dt * 5);
		current.current.y += (target.current.y - current.current.y) * k;
		current.current.phase += (target.current.phase - current.current.phase) * k;
	});
	return current;
}

type SceneProps = { scroll: React.RefObject<Scroll> };

function Diorama({ scroll }: SceneProps) {
	const group = useRef<THREE.Group>(null);
	const { render, texture } = useMemo(() => {
		const render = createDiorama();
		const image = render(0, 0);
		const texture = new THREE.DataTexture(new Uint8Array(image.data.buffer), DIORAMA_W, DIORAMA_H);
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;
		texture.colorSpace = THREE.SRGBColorSpace;
		// ImageData rows run top-down; flip so the picture is upright.
		texture.repeat.set(1, -1);
		texture.offset.set(0, 1);
		texture.needsUpdate = true;
		return { render, texture };
	}, []);
	useEffect(() => () => texture.dispose(), [texture]);

	useFrame(({ clock, size }) => {
		render(clock.elapsedTime % LOOP_SECONDS, scroll.current.phase);
		texture.needsUpdate = true;
		const h = ease(clamp01(scroll.current.y / size.height));
		const g = group.current;
		if (!g) return;
		g.position.set(h * 5, h * 1.5, -h * 6);
		g.rotation.set(-h * 0.12, -h * 0.45, 0);
	});

	return (
		<group ref={group}>
			<mesh position={[0, 0, -0.02]}>
				<planeGeometry args={[PLANE_W + 0.5, PLANE_H + 0.5]} />
				<meshBasicMaterial color="#1b2238" toneMapped={false} fog={false} />
			</mesh>
			<mesh>
				<planeGeometry args={[PLANE_W, PLANE_H]} />
				<meshBasicMaterial map={texture} toneMapped={false} fog={false} />
			</mesh>
		</group>
	);
}

// Sky colour and fog of the surrounding space follow the time of day.
function Atmosphere({ scroll }: SceneProps) {
	const { scene } = useThree();
	const color = useMemo(() => new THREE.Color(), []);
	useEffect(() => {
		scene.background = color;
		scene.fog = new THREE.FogExp2(color, 0.03);
		return () => {
			scene.background = null;
			scene.fog = null;
		};
	}, [scene, color]);
	useFrame(() => {
		spaceColor(scroll.current.phase, color);
	});
	return null;
}

// Drifting motes of light: soft dust by day, city sparkle by night.
function Motes({ scroll, count = 220 }: SceneProps & { count?: number }) {
	const points = useRef<THREE.Points>(null);
	const material = useRef<THREE.PointsMaterial>(null);
	const { geometry, seeds } = useMemo(() => {
		const palette = [new THREE.Color("#ffd98a"), new THREE.Color("#eef3ff"), new THREE.Color("#ffb14a")];
		const positions = new Float32Array(count * 3);
		const colors = new Float32Array(count * 3);
		const seeds = Array.from({ length: count }, (_, i) => {
			const c = palette[i % palette.length];
			colors.set([c.r, c.g, c.b], i * 3);
			return {
				x: THREE.MathUtils.randFloatSpread(50),
				y: THREE.MathUtils.randFloatSpread(60),
				z: THREE.MathUtils.randFloat(-30, 20),
				rise: THREE.MathUtils.randFloat(0.2, 0.8),
				phase: Math.random() * Math.PI * 2,
			};
		});
		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
		return { geometry, seeds };
	}, [count]);
	useEffect(() => () => geometry.dispose(), [geometry]);

	useFrame(({ clock, size }) => {
		const t = clock.elapsedTime;
		const lift = (scroll.current.y / size.height) * 6;
		const pos = geometry.attributes.position.array as Float32Array;
		seeds.forEach((s, i) => {
			const y = ((((s.y + t * s.rise + lift) % 60) + 60) % 60) - 30;
			pos.set([s.x + Math.sin(t * 0.6 + s.phase) * 0.6, y, s.z], i * 3);
		});
		geometry.attributes.position.needsUpdate = true;
		if (points.current) points.current.rotation.y = Math.sin(t * 0.05) * 0.1;
		if (material.current) material.current.opacity = 0.25 + 0.7 * nightOf(scroll.current.phase);
	});

	return (
		<points ref={points} geometry={geometry}>
			<pointsMaterial
				ref={material}
				size={0.12}
				vertexColors
				transparent
				blending={THREE.AdditiveBlending}
				depthWrite={false}
				toneMapped={false}
			/>
		</points>
	);
}

// Floating paper lanterns (chochin) that light up as night falls.
function Lanterns({ scroll, count = 14 }: SceneProps & { count?: number }) {
	const refs = useRef<(THREE.Mesh | null)[]>([]);
	const items = useMemo(
		() =>
			Array.from({ length: count }, (_, i) => ({
				pos: new THREE.Vector3(
					(i % 2 ? 1 : -1) * THREE.MathUtils.randFloat(7, 18),
					THREE.MathUtils.randFloatSpread(22),
					THREE.MathUtils.randFloat(-26, 4),
				),
				size: THREE.MathUtils.randFloat(0.35, 0.7),
				phase: Math.random() * Math.PI * 2,
			})),
		[count],
	);
	useFrame(({ clock }) => {
		const t = clock.elapsedTime;
		const lit = 0.45 + 0.55 * nightOf(scroll.current.phase);
		items.forEach((it, i) => {
			const m = refs.current[i];
			if (!m) return;
			m.position.set(it.pos.x, it.pos.y + Math.sin(t * 0.5 + it.phase) * 0.6, it.pos.z);
			m.rotation.set(0.2, t * 0.3 + it.phase, 0.1);
			const flicker = lit * (0.88 + 0.12 * Math.sin(t * 7 + it.phase * 3) * Math.sin(t * 3.1 + it.phase));
			(m.material as THREE.MeshBasicMaterial).color.setRGB(0.95 * flicker, 0.36 * flicker, 0.24 * flicker);
		});
	});
	return (
		<>
			{items.map((it, i) => (
				<mesh key={i} ref={(m) => void (refs.current[i] = m)} scale={[it.size, it.size * 1.3, it.size]}>
					<boxGeometry />
					<meshBasicMaterial toneMapped={false} fog={false} />
				</mesh>
			))}
		</>
	);
}

function CameraRig({ scroll }: SceneProps) {
	const { camera, size } = useThree();
	useFrame(({ clock }) => {
		const vh = size.height;
		const h = ease(clamp01(scroll.current.y / vh));
		const page = scroll.current.y / vh;
		const t = clock.elapsedTime;
		const cam = camera as THREE.PerspectiveCamera;
		const aspect = size.width / size.height;
		const start = coverDistance(aspect);
		// On narrow screens only a slice of the diorama fits; pan it toward the castle.
		const visibleW = Math.min(PLANE_H, PLANE_W / aspect) * aspect;
		const room = Math.max(0, (PLANE_W - visibleW) / 2);
		const focusX = THREE.MathUtils.clamp(FOCUS_X, -room, room) * (1 - h);
		// After the hero the camera drifts around the floating city but always
		// keeps it in view, so the sky can be watched turning from day to night.
		cam.position.set(
			focusX + Math.sin(page * 0.5) * 2.5 * h + Math.sin(t * 0.2) * 0.15 * h,
			h * 1.2 + Math.sin(page * 0.35) * 0.6 * h,
			start + h * 10 + Math.sin(page * 0.25) * 1.5 * h,
		);
		cam.lookAt(focusX + h * 4, h * 1.3, -6 * h);
	});
	return null;
}

function Scene() {
	const scroll = useSmoothScroll();
	return (
		<>
			<Atmosphere scroll={scroll} />
			<CameraRig scroll={scroll} />
			<Diorama scroll={scroll} />
			<Lanterns scroll={scroll} />
			<Motes scroll={scroll} />
		</>
	);
}

export default function CityScene() {
	return (
		<div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
			<Canvas dpr={[1, 1.75]} camera={{ fov: FOV, near: 0.1, far: 200, position: [0, 0, 12] }}>
				<Scene />
			</Canvas>
		</div>
	);
}
