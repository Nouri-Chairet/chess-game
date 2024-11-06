// Chessboard.js
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function KingB(props) {
  const chessboard = useGLTF('./heavenly_baroque_king_chess_piece (1)/scene.gltf');
  return (
    <primitive object={chessboard.scene} scale ={3} {...props} />
  );
}
