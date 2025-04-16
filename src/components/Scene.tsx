import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Loader2 } from 'lucide-react';

function Hotspot({ position, label, description }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <group position={position}>
      {/* Clickable sphere */}
      <mesh
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onClick={() => setIsActive(!isActive)}
        scale={isHovered ? 0.3 : 0.2}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={isHovered ? "#ff4444" : "#ff0000"} />
      </mesh>
      
      {/* Information popup */}
      {isActive && (
        <Html position={[0, 1, 0]} className="pointer-events-none">
          <div className="bg-white p-4 rounded-lg shadow-lg w-48">
            <h3 className="text-lg font-bold mb-2">{label}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function Model() {
  const { scene } = useGLTF('./models/castle.glb');
  
  const hotspots = [
    {
      position: [2, 3, 1],
      label: "Main Tower",
      description: "The central tower of the castle, standing tall and proud."
    },
    {
      position: [0.2, 0.3, 1],
      label: "Castle Entrance",
      description: "The fortified entrance to the castle."
    },
    {
      position: [2, 0.3, 4],
      label: "Courtyard",
      description: "The inner courtyard where daily castle life takes place."
    }
  ];

  return (
    <>
      <primitive object={scene} />
      {hotspots.map((hotspot, index) => (
        <Hotspot key={index} {...hotspot} />
      ))}
    </>
  );
}

export function Scene() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-full">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        </div>
      }>
        <Canvas
          camera={{ position: [5, 5, 5], fov: 50 }}
          style={{ background: '#f3f4f6' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model />
          <OrbitControls enableDamping autoRotate />
        </Canvas>
      </Suspense>
    </div>
  );
}