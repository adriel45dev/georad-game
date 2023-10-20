"use client";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
const { BoxGeometry, MeshBasicMaterial, Mesh } = require("three");

export default function Formas() {
  const meshRef = useRef<typeof Mesh>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mesh, setMesh] = useState<typeof Mesh>();

  const animate = (forma: typeof Mesh) => {
    requestAnimationFrame(() => animate(forma));
    forma.rotation.x += 0.01;
    forma.rotation.y += 0.01;
  };

  useEffect(() => {
    if (isLoaded) return;
    const interval = setTimeout(() => {
      if (meshRef.current) {
        setMesh(meshRef.current);
        return setIsLoaded(true);
      }
    }, 1000);

    if (isLoaded) {
      return clearTimeout(interval);
    }
  }, [meshRef.current]);

  useEffect(() => {
    if (!isLoaded) return;
    const { current } = meshRef;
    setMesh(current);
  }, [isLoaded]);

  useEffect(() => {
    if (!mesh) return;

    animate(mesh);

    mesh.scale.x = 2;
    mesh.scale.y = 2;
    mesh.scale.z = 2;

    console.log(mesh);
  }, [mesh]);

  const formas = {
    ["cubo"]: <boxGeometry />,
    ["capsula"]: <capsuleGeometry />,
  };

  return (
    <div className="min-w-screen h-screen p-8 backdrop-blur-sm  bg-sky-900">
      <div className="px-6 min-w-full min-h-full flex flex-col justify-center items-center bg-slate-800 rounded-lg">
        <h1 className="text-4xl p-4 text-white">Cubo</h1>
        <div className="max-w-full max-h-full md:w-96 md:h-96 bg-slate-700 rounded-lg flex justify-center items-center hover:bg-sky-800 mb-8">
          <Canvas>
            <mesh ref={meshRef}>
              <meshBasicMaterial color="white" wireframe={true} />
              {/* <boxGeometry /> */}
              {/* <capsuleGeometry /> */}
              {/* <coneGeometry args={[1, 2, 12]} /> */}
              {/* <cylinderGeometry args={[1, 1, 2]} /> */}
              {/* <sphereGeometry /> */}
              {/* <tetrahedronGeometry /> */}
              {/* <dodecahedronGeometry /> */}
              {formas["capsula"]}
            </mesh>
          </Canvas>
        </div>
      </div>
    </div>
  );
}
