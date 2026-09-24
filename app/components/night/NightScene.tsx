"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createDiorama, DIORAMA_H, DIORAMA_W, LOOP_SECONDS } from "@/lib/halloween-diorama";

const NIGHT = "#070a18";
const PLANE_W = 16;
const PLANE_H = (PLANE_W * DIORAMA_H) / DIORAMA_W;
const FOV = 40;
// Campfire position in the diorama (pixel x 112 of 320), in plane units.
const CAMPFIRE_X = (112 / DIORAMA_W - 0.5) * PLANE_W;

const ease = (v: number) => v * v * (3 - 2 * v);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// Camera distance at which the diorama plane exactly covers the viewport.
function coverDistance(aspect: number) {
	const visibleH = Math.min(PLANE_H, PLANE_W / aspect);
	return visibleH / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
}

// Page scroll, smoothed so the camera glides after the scrollbar.
function useSmoothScroll() {
	const target = useRef(0);
	const current = useRef(0);
	useEffect(() => {
		const onScroll = () => (target.current = window.scrollY);
		onScroll();
		current.current = target.current;
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	useFrame((_, dt) => {
		current.current += (target.current - current.current) * (1 - Math.exp(-dt * 5));
	});
	return current;
}

function Diorama({ scroll }: { scroll: React.RefObject<number> }) {
	const group = useRef<THREE.Group>(null);
	const { render, texture } = useMemo(() => {
		const render = createDiorama();
		const image = render(0);
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
		render(clock.elapsedTime % LOOP_SECONDS);
		texture.needsUpdate = true;
		const h = ease(clamp01(scroll.current / size.height));
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

function Rain({ count = 1400 }) {
	const { geometry, drops } = useMemo(() => {
		const drops = Array.from({ length: count }, () => ({
			x: THREE.MathUtils.randFloatSpread(60),
			y: THREE.MathUtils.randFloatSpread(40),
			z: THREE.MathUtils.randFloat(-30, 28),
			speed: THREE.MathUtils.randFloat(16, 26),
		}));
		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 6), 3));
		return { geometry, drops };
	}, [count]);
	useEffect(() => () => geometry.dispose(), [geometry]);

	useFrame((_, dt) => {
		const pos = geometry.attributes.position.array as Float32Array;
		const step = Math.min(dt, 0.05);
		drops.forEach((d, i) => {
			d.y -= d.speed * step;
			d.x -= d.speed * step * 0.12;
			if (d.y < -20) {
				d.y += 40;
				d.x = THREE.MathUtils.randFloatSpread(60);
			}
			pos.set([d.x, d.y, d.z, d.x + 0.07, d.y + 0.6, d.z], i * 6);
		});
		geometry.attributes.position.needsUpdate = true;
	});

	return (
		<lineSegments geometry={geometry}>
			<lineBasicMaterial color="#8ea8d2" transparent opacity={0.28} depthWrite={false} />
		</lineSegments>
	);
}

// Warm square embers drifting upward; they rush past as the page scrolls.
function Embers({ scroll, count = 220 }: { scroll: React.RefObject<number>; count?: number }) {
	const points = useRef<THREE.Points>(null);
	const { geometry, seeds } = useMemo(() => {
		const warm = [new THREE.Color("#ffd166"), new THREE.Color("#ff9f1c"), new THREE.Color("#e2531a")];
		const positions = new Float32Array(count * 3);
		const colors = new Float32Array(count * 3);
		const seeds = Array.from({ length: count }, (_, i) => {
			const c = warm[i % warm.length];
			colors.set([c.r, c.g, c.b], i * 3);
			return {
				x: THREE.MathUtils.randFloatSpread(50),
				y: THREE.MathUtils.randFloatSpread(60),
				z: THREE.MathUtils.randFloat(-30, 20),
				rise: THREE.MathUtils.randFloat(0.3, 1.2),
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
		const lift = (scroll.current / size.height) * 6;
		const pos = geometry.attributes.position.array as Float32Array;
		seeds.forEach((s, i) => {
			const y = ((((s.y + t * s.rise + lift) % 60) + 60) % 60) - 30;
			pos.set([s.x + Math.sin(t * 0.6 + s.phase) * 0.6, y, s.z], i * 3);
		});
		geometry.attributes.position.needsUpdate = true;
		if (points.current) points.current.rotation.y = Math.sin(t * 0.05) * 0.1;
	});

	return (
		<points ref={points} geometry={geometry}>
			<pointsMaterial
				size={0.14}
				vertexColors
				transparent
				opacity={0.9}
				blending={THREE.AdditiveBlending}
				depthWrite={false}
				toneMapped={false}
			/>
		</points>
	);
}

// Floating paper lanterns: small glowing cubes that bob and turn.
function Lanterns({ count = 14 }) {
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
		items.forEach((it, i) => {
			const m = refs.current[i];
			if (!m) return;
			m.position.set(it.pos.x, it.pos.y + Math.sin(t * 0.5 + it.phase) * 0.6, it.pos.z);
			m.rotation.set(0.2, t * 0.3 + it.phase, 0.1);
			const flicker = 0.85 + 0.15 * Math.sin(t * 7 + it.phase * 3) * Math.sin(t * 3.1 + it.phase);
			(m.material as THREE.MeshBasicMaterial).color.setRGB(1 * flicker, 0.62 * flicker, 0.25 * flicker);
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

function CameraRig({ scroll }: { scroll: React.RefObject<number> }) {
	const { camera, size } = useThree();
	useFrame(({ clock }) => {
		const vh = size.height;
		const h = ease(clamp01(scroll.current / vh));
		const page = scroll.current / vh;
		const t = clock.elapsedTime;
		const cam = camera as THREE.PerspectiveCamera;
		const aspect = size.width / size.height;
		const start = coverDistance(aspect);
		// On narrow screens only a slice of the diorama fits; pan it toward the campfire.
		const visibleW = Math.min(PLANE_H, PLANE_W / aspect) * aspect;
		const room = Math.max(0, (PLANE_W - visibleW) / 2);
		const focusX = THREE.MathUtils.clamp(CAMPFIRE_X, -room, room) * (1 - h);
		cam.position.set(
			focusX + Math.sin(page * 0.45) * 3 * h + Math.sin(t * 0.2) * 0.15 * h,
			h * 1.2 - Math.max(0, page - 1) * 0.8,
			start + h * 10 - Math.max(0, page - 1) * 2.2,
		);
		cam.lookAt(focusX + h * 2, h * 0.8 - Math.max(0, page - 1) * 0.9, -10 * h);
	});
	return null;
}

function Scene() {
	const scroll = useSmoothScroll();
	return (
		<>
			<color attach="background" args={[NIGHT]} />
			<fogExp2 attach="fog" args={[NIGHT, 0.035]} />
			<CameraRig scroll={scroll} />
			<Diorama scroll={scroll} />
			<Lanterns />
			<Embers scroll={scroll} />
			<Rain />
		</>
	);
}

export default function NightScene() {
	return (
		<div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
			<Canvas dpr={[1, 1.75]} camera={{ fov: FOV, near: 0.1, far: 200, position: [0, 0, 12] }}>
				<Scene />
			</Canvas>
		</div>
	);
}
