import { isCheck } from "./utility";

// Checkmate occurs when the player is in check and has no valid moves left
export function isCheckMate(board, color, movesHistory) {
    if (isCheck(board, color, movesHistory)) {
        // Iterate through all pieces of the current player
        for (let row of board) {
            for (let piece of row) {
                if (piece && piece.color === color) {
                    const possibleMoves = piece.possible_moves(board, movesHistory);
                    if (possibleMoves.length > 0) {
                        return false; // If any piece has valid moves, it's not checkmate
                    }
                }
            }
        }
        return true; // If no pieces have valid moves and the player is in check, it's checkmate
    }
    return false; // Not in check, so it's not checkmate
}

// Stalemate occurs when the player is NOT in check and has no valid moves
export const isStalemate = (board, color, movesHistory) => {
    if (!isCheck(board, color, movesHistory)) {
        // Iterate through all pieces of the current player
        for (let row of board) {
            for (let piece of row) {
                if (piece && piece.color === color) {
                    const possibleMoves = piece.possible_moves(board, movesHistory);
                    if (possibleMoves.length > 0) {
                        return false; // If any piece has valid moves, it's not a stalemate
                    }
                }
            }
        }
        return true; // No valid moves, and not in check, it's stalemate
    }
    return false; // If in check, it's not stalemate
};

export const isGameOver = (board, currentPlayer, movesHistory, player1, player2) => {
    if (isCheckMate(board, currentPlayer.color, movesHistory)) {
        return true;
    }

    if (isStalemate(board, currentPlayer.color, movesHistory)) {
        return true;
    }

    if (currentPlayer.timer<1) {
        return true;
    }
    return false;
};
