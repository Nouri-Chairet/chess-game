import {isCheck,get_possible_moves} from './utility';
class Piece {
    constructor(color, current_pos_x, current_pos_y,image,name) {
        this.color = color;
        this.current_pos_x = current_pos_x;
        this.current_pos_y = current_pos_y;
        this.image = image;
        this.name = name;
    }
    setCurrentPos(x,y){
        this.current_pos_x=x;
        this.current_pos_y=y;
    }
    possible_moves(board,whitePieces,blackPieces) {
        let [x,y] = [this.current_pos_x,this.current_pos_y];
        let possible_moves=get_possible_moves(board,this);
        for (const move of possible_moves) {
                // Simulate the move
                let temp_piece = board[move[1]][move[0]];

                board[move[1]][move[0]] = this;
                board[y][x] = null;
                
                if (isCheck(board,whitePieces,blackPieces,this.color) ) {
                    console.log(board);
                    console.log(`${this.name} can move to ${move[0]} ${move[1]}`);
                    possible_moves.splice(possible_moves.indexOf(move), 1);
                }
              
                board[y][x] = this;
                board[move[1]][move[0]] = temp_piece;
            }
        
    return possible_moves;

    }
}
export default Piece;
