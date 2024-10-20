import { castling } from "./utility";  // Assuming you have a utility function for castling checks

export const FenConverter = (board, color, movesHistory, fullMove) => {
    let fen = "";

    // Iterate through the board rows
    for (let row of board) {
        let empty = 0;

        // Iterate through each piece in the row
        for (let piece of row) {
            if (!piece) {
                empty++;  // Count empty squares
            } else {
                if (empty > 0) {
                    fen += empty.toString();  // Add empty square count if any
                    empty = 0;  // Reset empty square count
                }
                
                // Determine piece type and case
                let pieceType = piece.name === "knight" ? "n" : piece.name[0];
                fen += piece.color === "white" ? pieceType.toUpperCase() : pieceType.toLowerCase();
            }
        }

        if (empty > 0) {
            fen += empty.toString();  // Add remaining empty squares at the end of the row
        }
        fen += "/";  // Move to the next row
    }

    // Remove trailing slash from the FEN string
    fen = fen.slice(0, -1);

    // Handle castling rights
    let castle = "";
    let whiteCastle = castling(board[7][4], board, movesHistory);  // White's king
    let blackCastle = castling(board[0][4], board, movesHistory);  // Black's king

    // Castling for white
    if (whiteCastle.length > 0) {
        if (whiteCastle.includes([2, 7])) castle += "Q";  // Queen's side castling for white
        if (whiteCastle.includes([6, 7])) castle += "K";  // King's side castling for white
    }

    // Castling for black
    if (blackCastle.length > 0) {
        if (blackCastle.includes([2, 0])) castle += "q";  // Queen's side castling for black
        if (blackCastle.includes([6, 0])) castle += "k";  // King's side castling for black
    }

    // If no castling rights, mark as '-'
    castle = castle === "" ? "-" : castle;

    // Build the full FEN string
    fen += ` ${color[0]} ${castle} - 0 ${fullMove.toString()}`;

    return fen;
};
