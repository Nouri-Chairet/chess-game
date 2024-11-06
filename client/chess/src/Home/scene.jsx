import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion-3d'; // Framer Motion 3D for Three.js animations
import  ChessboardModel  from './ChessBoardModal'; // Your 3D model component
import { OrbitControls } from '@react-three/drei';
import KingB from './ModelB';
export default function ChessboardScene() {
  const [moveRight, setMoveRight] = useState(true); // State to trigger animation

  // Trigger animation on component mount
  useEffect(() => {
    setTimeout(() => setMoveRight(false), 6000); // Start moving 1 second after page load
  }, []);

  // Animation variants for X movement
  const variants = {
    initial: { x: 10, y:1}, // Start position (left)
    moveRight: { x: 7,y:9 }, // End position (right)
  };

return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute' }}>

        <Canvas 
                camera={{ position: [3, 20, 5], // Position the camera above the board
                    fov: 45,
                    near: 0.1,
                    far: 100,
                    up: [0, 1, -1], // Ensure the camera is looking down
            }}    
        >
            <ambientLight intensity={1.5} />
            <directionalLight position={[16, 14, 15]} intensity={9} />
            {/* Motion group for animating the chessboard piece */}
            <OrbitControls
            autoRotate={true}
            enableZoom={false}
            maxPolarAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 6}  
        />
            <motion.group
                animate={moveRight ? 'moveRight' : 'initial'} // Toggle between the states
                variants={variants} // Animation properties
                transition={{ duration: 2, ease: 'easeInOut' }}
                
            >
                <ChessboardModel />
                <KingB position={[30, 10, 0]} />
            </motion.group>
        </Canvas>
    </div>
);
}
