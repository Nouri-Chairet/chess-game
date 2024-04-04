import { isCheck, } from "./utility";
export function isCheckMate(board,color,movesHistory){
    if (isCheck(board,color) ){
        for(let row of board){
            for(let  piece of row){
                if (piece && piece.color==color && piece.possible_moves(board,movesHistory).length>0 ){
                    return false;
                }
        }
    }
        return true;
    }
    else{
        return false;
    }
}
export const isStalemate = (board, color,movesHistory) => {
    if (!isCheck(board,color) ){
        for(let row of board){
            for(let  piece of row){
                if (piece && piece.color==color && piece.possible_moves(board,movesHistory).length>0 ){
                    return false;
                }
        }
    }
        return true;
    }
    else{
        return false;
    }
}
