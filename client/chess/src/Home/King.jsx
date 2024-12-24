import React from 'react';
import { Suspense } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

import { OrbitControls, Preload } from '@react-three/drei';

const King = () => {
  const king = useGLTF('./doctor_dooms_mask/scene.gltf');
  return (
    <primitive
      object={king.scene}
      scale={4}
      position={[0, 0.5, 0]}
    />

  );
}

const KingCanvas = () => {
  return (
    <div   className='King'>


    <Canvas
      shadows
      frameloop='demand'
      camera={{ position: [-4, 3, 10] ,
        fov: 45,
        near: 0.1,
        far: 100
    }}
      gl={{ preserveDrawingBuffer: true }}
      >
      <OrbitControls
        autoRotate={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}  
      />
          <directionalLight 
        position={[20, 20,20]}  // Front light in Z direction
        intensity={4}  // Adjust brightness
        castShadow
      />
      <Suspense fallback={null}>
        <King />
      </Suspense>
    </Canvas>
        </div>
  );
}

export default KingCanvas;
