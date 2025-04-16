import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

function Model() {
  // This path will be relative to the base URL when deployed
  const { scene } = useGLTF('./models/castle.glb');
  return <primitive object={scene} />;
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