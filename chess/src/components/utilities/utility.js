const findPiece = (playerPieces,name) =>{
 for(let piece of playerPieces){
   if(piece.name === name) return [piece.current_pos_x,piece.current_pos_y];
 }
} 
export const isCheck = (board,whitePieces,blackPieces,color)=>{
    const [enemyPieces,playerPieces] = [color=="black" ? whitePieces: blackPieces,color=="white"?whitePieces:blackPieces];
    const kingPos =findPiece(playerPieces,"king");
    for(let i=0;i<enemyPieces.length;i++){
        let piece =enemyPieces[i];
        for(const move of piece.get_possible_moves(board)){
             if (move[0] === kingPos[0] && move[1] === kingPos[1]) {
                return true;
            }
         }   
      }
     return false;
 }
//  export function filterPossibleMoves(board,whitePieces,blackPieces,color){
//     const [enemyPieces,playerPieces] = [color=="black" ? whitePieces: blackPieces,color=="white"?whitePieces:blackPieces];
//     for (let piece of playerPieces){
//         piece.possible_moves=piece.get_possible_moves(board);
//         for (let [x,y] of piece.get_possible_moves(board)){
//             let newPlayerPieces=[...playerPieces];
//             let newBoard=[...board];
//             let [prevY,prevX] = [piece.current_pos_y,piece.current_pos_x];
//             newBoard[piece.current_pos_y][piece.current_pos_x]=null;
//             newBoard[y][x]=piece;
//             newPlayerPieces[piece.current_pos_y][piece.current_pos_x]=null;
//             newPlayerPieces[y][x]=piece;
//             piece.setCurrentPos(x,y);
//             if (isCheck(newBoard,newPlayerPieces,enemyPieces,"white")){
//                 piece.possible_moves.splice(piece.possible_moves.indexOf([x,y]),1);
//             }
//             piece.setCurrentPos(prevX,prevY);
//         }
//     }

// }
export function filterPossibleMoves(board, whitePieces, blackPieces, color) {
    let tempBoard=JSON.parse(JSON.stringify(board));
    const enemyPieces = color === "black" ? whitePieces : blackPieces;
    const playerPieces = color === "white" ? whitePieces : blackPieces;

    for (let piece of playerPieces) {
        piece.possible_moves = piece.get_possible_moves(tempBoard);
        let tempPosX = piece.current_pos_x;
        let tempPosY = piece.current_pos_y;
        for (let [x, y] of piece.get_possible_moves(board)) {
            let [prevY, prevX] = [piece.current_pos_y, piece.current_pos_x];
            
            let tempPiece = tempBoard[y][x];
            tempBoard[y][x] = piece;
            tempBoard[prevY][prevX] = null;
            piece.setCurrentPos(x, y);
            // Check for check condition
            if (isCheck(board, playerPieces, enemyPieces, color)) {
                piece.possible_moves.splice(piece.possible_moves.indexOf([x,y]),1);
            }
            // Revert the move
            piece.setCurrentPos(prevX, prevY);
            tempBoard[y][x] = tempPiece;
            tempBoard[tempPosY][tempPosX] = piece;
        }
    }
}

 export function isCheckMate(board,whitePieces,blackPieces,color){
    if (isCheck(board,whitePieces,blackPieces,color) ){
        const playerPieces =  color=== "white"? whitePieces : blackPieces ;
        for (let piece of playerPieces){
            if(piece.possible_moves.length>0) return false;
        }
        return true;
    }
    else{
        return false;
    }
}



// Import required modules
const express = require('express');

// Create an Express application
const app = express();
const port = 3000;
