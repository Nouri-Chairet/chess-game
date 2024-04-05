import {castling,isCheck,get_possible_moves} from './utility';
class Piece {
    constructor(color, current_pos_x, current_pos_y,image,name,value) {
        this.value =value;
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
    possible_moves(board,movesHistory) {
        let [x,y] = [this.current_pos_x,this.current_pos_y];
        let possible_moves=get_possible_moves(board,this,movesHistory);
        let filtredMoves=[];
        for (const move of possible_moves) {
            let temp_piece = board[move[1]][move[0]];
            board[move[1]][move[0]] = this;
            board[y][x] = null;
            if (!isCheck(board,this.color,movesHistory) ) {
                filtredMoves.push(move)
                }
            board[y][x] = this;
            board[move[1]][move[0]] = temp_piece;
        }
        if(this.name=="rook"){
            console.log(filtredMoves);
        
        }
        if(castling(this,board,movesHistory).length>0){
            filtredMoves.push(...castling(this,board,movesHistory));
        }
        return filtredMoves;

    }
}
export default Piece;
