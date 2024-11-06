// Chessboard.js
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function ChessboardModel(props) {
  const chessboard = useGLTF('./chess_board/scene.gltf');
  return (
    <primitive object={chessboard.scene} scale ={3} {...props} />
  );
}
