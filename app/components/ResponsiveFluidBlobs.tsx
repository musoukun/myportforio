"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import * as THREE from "three";
import Komyaku from "./komyaku/Komyaku";
import { KomyakuData, COLORS } from "./komyaku/types";
import { updatePhysics } from "./komyaku/physics";

interface ResponsiveFluidBlobsProps {
	className?: string;
	style?: React.CSSProperties;
}

// レスポンシブ対応の物理シミュレーション
function useResponsivePhysics(
	komyakus: KomyakuData[],
	setKomyakus: React.Dispatch<React.SetStateAction<KomyakuData[]>>
) {
	useFrame((state: RootState, delta: number) => {
		// 物理演算を実行（3つのパラメータのみ）
		const newKomyakus = updatePhysics(
			komyakus,
			delta,
			state.clock.elapsedTime
		);

		if (
			newKomyakus.length !== komyakus.length ||
			newKomyakus.some(
				(komyaku) => komyaku.isDying || komyaku.isSplitting
			)
		) {
			setKomyakus([...newKomyakus]);
		}
	});
}

// レスポンシブ対応メインコンポーネント
export default function ResponsiveFluidBlobs({
	className = "",
	style = {},
}: ResponsiveFluidBlobsProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerSize, setContainerSize] = useState({
		width: 800,
		height: 600,
	});
	const [komyakuCount, setKomyakuCount] = useState(5);

	// コンテナサイズを監視
	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				const { width, height } =
					containerRef.current.getBoundingClientRect();
				setContainerSize({ width, height });

				// コンテナサイズに応じて子脈の数を調整
				const area = width * height;
				if (area < 150000) {
					// 小さい画面
					setKomyakuCount(3);
				} else if (area < 300000) {
					// 中程度の画面
					setKomyakuCount(4);
				} else {
					// 大きい画面
					setKomyakuCount(5);
				}
			}
		};

		updateSize();
		const resizeObserver = new ResizeObserver(updateSize);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		return () => resizeObserver.disconnect();
	}, []);

	const [komyakus, setKomyakus] = useState<KomyakuData[]>([]);

	// 子脈の初期化（komyakuCountが変更された時に再生成）
	useEffect(() => {
		const komyakuArray: KomyakuData[] = [];
		const colors = Object.values(COLORS);

		// コンテナサイズに応じて範囲を調整
		const xRange = Math.min(containerSize.width / 150, 10);
		const yRange = Math.min(containerSize.height / 150, 6);

		for (let i = 0; i < komyakuCount; i++) {
			const radius = 0.4 + Math.random() * 0.3; // 少し小さめに
			komyakuArray.push({
				id: i,
				position: new THREE.Vector3(
					(Math.random() - 0.5) * xRange,
					(Math.random() - 0.5) * yRange,
					(Math.random() - 0.5) * 3
				),
				velocity: new THREE.Vector3(
					(Math.random() - 0.5) * 0.003,
					(Math.random() - 0.5) * 0.003,
					(Math.random() - 0.5) * 0.003
				),
				radius,
				originalRadius: radius,
				color: colors[Math.floor(Math.random() * colors.length)],
				mass: radius,
				driftDirection: new THREE.Vector3(
					(Math.random() - 0.5) * 2,
					(Math.random() - 0.5) * 2,
					(Math.random() - 0.5) * 2
				).normalize(),
				eyePhase: Math.random() * Math.PI * 2,
				age: 0,
				canSplit: true,
				isSplitting: false,
				splitProgress: 0,
				splitDirection: new THREE.Vector3(),
				isDying: false,
				deathProgress: 0,
				opacity: 1,
				childSphere1Offset: new THREE.Vector3(),
				childSphere2Offset: new THREE.Vector3(),
				isPulsing: false,
				pulseProgress: 0,
				generation: 0,
				isNewBorn: false,
			});
		}
		setKomyakus(komyakuArray);
	}, [komyakuCount, containerSize]);

	// レスポンシブカメラ設定
	const getCameraSettings = () => {
		if (containerSize.width < 640) {
			// モバイル
			return {
				position: [0, 0, 8] as [number, number, number],
				fov: 75,
			};
		} else if (containerSize.width < 1024) {
			// タブレット
			return {
				position: [0, 0, 10] as [number, number, number],
				fov: 70,
			};
		} else {
			// デスクトップ
			return {
				position: [0, 0, 12] as [number, number, number],
				fov: 65,
			};
		}
	};

	function PhysicsSystem() {
		useResponsivePhysics(komyakus, setKomyakus);
		return null;
	}

	const cameraSettings = getCameraSettings();

	return (
		<div
			ref={containerRef}
			className={`relative ${className}`}
			style={{
				width: "100%",
				height: "100%",
				minHeight: "300px",
				backgroundColor: "#000000",
				borderRadius: "12px",
				overflow: "hidden",
				...style,
			}}
		>
			<Canvas
				camera={{
					position: cameraSettings.position,
					fov: cameraSettings.fov,
				}}
				style={{
					width: "100%",
					height: "100%",
				}}
				dpr={
					typeof window !== "undefined"
						? Math.min(window.devicePixelRatio, 2)
						: 1
				}
				gl={{ alpha: false, antialias: true }}
			>
				<PhysicsSystem />
				<ambientLight intensity={0.9} />

				{/* 通常のkomyakuメッシュ（目を含む） */}
				{komyakus.map((komyaku) => (
					<Komyaku
						key={komyaku.id}
						komyakuData={komyaku}
						showMesh={true}
					/>
				))}
			</Canvas>

			{/* レスポンシブ情報パネル */}
			<div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white p-2 rounded text-xs">
				<div className="flex flex-col space-y-1">
					{/* <span>子脈数: {komyakuCount}</span> */}
					{/* <span className="hidden sm:inline">
						{containerSize.width}×{containerSize.height}
					</span> */}
				</div>
			</div>
		</div>
	);
}
