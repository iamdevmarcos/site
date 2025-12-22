"use client";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import React from "react";

import {
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Vector3 } from "three";

// Extend Three.js with meshline components
extend({ MeshLineGeometry, MeshLineMaterial });
useTexture.preload("/band.png");
useTexture.preload("/lanyard/bg.png");
useTexture.preload("/lanyard/bg2.jpeg");

// Add proper type declarations for the extended components
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: React.ComponentProps<"mesh">;
      meshLineMaterial: React.ComponentProps<"meshBasicMaterial"> & {
        color?: string;
        depthTest?: boolean;
        resolution?: [number, number];
        useMap?: boolean;
        map?: THREE.Texture;
        repeat?: [number, number];
        lineWidth?: number;
        transparent?: boolean;
      };
    }
  }
}

// Define types for mesh line ref
interface MeshLineRef {
  geometry: {
    setPoints: (points: THREE.Vector3[]) => void;
  };
}

// Extend Rigid body to include additional properties
interface ExtendedRigidBody extends RapierRigidBody {
  lerped?: THREE.Vector3;
}

// Shader material for rounded corners
function createRoundedMaterial(
  map: THREE.Texture,
  borderRadius: number,
  width: number,
  height: number
) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTexture: { value: map },
      uBorderRadius: { value: borderRadius },
      uSize: { value: new THREE.Vector2(width, height) },
      uClearcoat: { value: 1.0 },
      uClearcoatRoughness: { value: 0.15 },
      uRoughness: { value: 0.3 },
      uMetalness: { value: 0.5 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uBorderRadius;
      uniform vec2 uSize;
      varying vec2 vUv;
      
      float roundedBoxSDF(vec2 centerPos, vec2 size, float radius) {
        return length(max(abs(centerPos) - size + radius, 0.0)) - radius;
      }
      
      void main() {
        vec2 uv = vUv;
        vec2 size = uSize * 0.5;
        vec2 centerPos = (uv - 0.5) * uSize;
        
        float distOuter = roundedBoxSDF(centerPos, size, uBorderRadius);
        
        float alphaOuter = 1.0 - smoothstep(-0.01, 0.01, distOuter);
        
        if (alphaOuter < 0.01) discard;
        
        vec4 texColor = texture2D(uTexture, uv);
        
        gl_FragColor = vec4(texColor.rgb, texColor.a * alphaOuter);
      }
    `,
    transparent: true,
    side: THREE.FrontSide,
  });
}

export default function Card() {
  return (
    <div
      className="sticky top-0 right-0 h-screen pointer-events-none z-10"
      style={{
        position: "sticky",
        top: 0,
        width: "40%",
        right: 0,
        left: "auto",
        marginLeft: "60%",
        maxHeight: "891px",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 13], fov: 25 }}
        className="pointer-events-auto overflow-visible border-l border-dotted border-[var(--border)] border-opacity-40"
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 120}>
          <Band position={[0, 0, 0]} />
        </Physics>
        <Environment background={false}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  position?: [number, number, number];
}

function Band({
  maxSpeed = 50,
  minSpeed = 10,
  position = [0, 0, 0],
}: BandProps) {
  // Using the proper type for meshline components
  const band = useRef<MeshLineRef>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<ExtendedRigidBody>(null);
  const j2 = useRef<ExtendedRigidBody>(null);
  const j3 = useRef<ExtendedRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);

  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3(); // prettier-ignore
  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 3, 
    linearDamping: 3,
  } as const;

  const frontTexture = useTexture(`/lanyard/bg_3.png`);
  const backTexture = useTexture(`/lanyard/bg.jpeg`);
  const texture = useTexture(`/band.jpeg`);
  const { width, height } = useThree((state) => state.size);

  const cardWidth = 3.5;
  const cardHeight = 4.5;
  const borderRadius = 0.123; // 16px converted to 3D units
  
  // Create rounded materials for front and back
  const frontRoundedMaterial = React.useMemo(
    () => createRoundedMaterial(frontTexture, borderRadius, cardWidth, cardHeight),
    [frontTexture, borderRadius, cardWidth, cardHeight]
  );
  
  const backRoundedMaterial = React.useMemo(
    () => createRoundedMaterial(backTexture, borderRadius, cardWidth, cardHeight),
    [backTexture, borderRadius, cardWidth, cardHeight]
  );
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  // Force cast refs to use in joints
  const fixedRef = fixed as unknown as React.RefObject<RapierRigidBody>;
  const j1Ref = j1 as unknown as React.RefObject<RapierRigidBody>;
  const j2Ref = j2 as unknown as React.RefObject<RapierRigidBody>;
  const j3Ref = j3 as unknown as React.RefObject<RapierRigidBody>;
  const cardRef = card as unknown as React.RefObject<RapierRigidBody>;

  useRopeJoint(fixedRef, j1Ref, [[0, 0, 0], [0, 0, 0], 0.8]); 
  useRopeJoint(j1Ref, j2Ref, [[0, 0, 0], [0, 0, 0], 0.8]); 
  useRopeJoint(j2Ref, j3Ref, [[0, 0, 0], [0, 0, 0], 0.8]); 
  useSphericalJoint(j3Ref, cardRef, [
    [0, 0, 0],
    [0, 1.05, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  const lastUpdateTime = useRef(0);

  useFrame((state, delta) => {
    const currentTime = state.clock.getElapsedTime();

    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      if (currentTime - lastUpdateTime.current > 0.016) {
        [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
        lastUpdateTime.current = currentTime;
      }

      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current && band.current) {
      [j1, j2].forEach((ref) => {
        const rigidBody = ref.current as ExtendedRigidBody;
        if (rigidBody) {
          if (!rigidBody.lerped) {
            rigidBody.lerped = new THREE.Vector3().copy(
              rigidBody.translation()
            );
          }

          const clampedDistance = Math.max(
            0.1,
            Math.min(1, rigidBody.lerped.distanceTo(rigidBody.translation()))
          );

          const lerpSpeed = minSpeed + clampedDistance * (maxSpeed - minSpeed);
          rigidBody.lerped.lerp(
            rigidBody.translation(),
            Math.min(1, delta * lerpSpeed)
          );
        }
      });

      if (j3.current && j2.current && j1.current) {
        const j2Body = j2.current as ExtendedRigidBody;
        const j1Body = j1.current as ExtendedRigidBody;

        curve.points[0].copy(j3.current.translation());
        if (j2Body.lerped) curve.points[1].copy(j2Body.lerped);
        if (j1Body.lerped) curve.points[2].copy(j1Body.lerped);
        curve.points[3].copy(fixed.current.translation());

        band.current.geometry.setPoints(curve.getPoints(64)); 

        if (card.current) {
          ang.copy(card.current.angvel());
          rot.copy(card.current.rotation());
          card.current.setAngvel(
            { x: ang.x, y: ang.y - rot.y * 0.2, z: ang.z },
            true 
          );
        }
      }
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[position[0], position[1] + 4, position[2]]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.2, 0.31, 0.01]} />
          <group
            scale={0.65}
            position={[0, -0.4, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              const target = e.target as HTMLElement;
              target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              const target = e.target as HTMLElement;
              target.setPointerCapture(e.pointerId);
              if (card.current) {
                drag(
                  new Vector3()
                    .copy(e.point)
                    .sub(vec.copy(card.current.translation()))
                );
              }
            }}
          >
            {/* Front of card */}
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[cardWidth, cardHeight]} />
              <primitive object={frontRoundedMaterial} attach="material" />
            </mesh>
            {/* Back of card */}
            <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[cardWidth, cardHeight]} />
              <primitive object={backRoundedMaterial} attach="material" />
            </mesh>
          </group>
        </RigidBody>
      </group>
      {React.createElement("mesh", { ref: band }, [
        React.createElement("meshLineGeometry", { key: "geometry" }, null),
        React.createElement(
          "meshLineMaterial",
          {
            key: "material",
            color: "white",
            depthTest: false,
            resolution: [width, height],
            useMap: true,
            map: texture,
            repeat: [-3, 1],
            lineWidth: 1,
            transparent: true,
          },
          null
        ),
      ])}
    </>
  );
}
