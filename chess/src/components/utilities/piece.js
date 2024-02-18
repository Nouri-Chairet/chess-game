class Piece {
    constructor(color, current_pos_x, current_pos_y,image,name) {
        this.color = color;
        this.current_pos_x = current_pos_x;
        this.current_pos_y = current_pos_y;
        this.image = image;
        this.name = name;
        this.possible_moves=[];
    }
    setCurrentPos(x,y){
        this.current_pos_x=x;
        this.current_pos_y=y;
    }
    get_possible_moves(board) {
        let possible_moves=[];
        const isValid = (x,y) => {return x>=0 && x<8 && y>=0 && y<8;}
        const isEmpty = (x, y) => {return isValid(x,y) && board[y][x] === null;}
        const sameColor = (x, y, color) => board[y] && board[y][x] && board[y][x].color === color;
        const isEnemy = (x, y, color) => board[y] && board[y][x] != null && board[y][x].color !== color;
        let x = this.current_pos_x;//2
        let y = this.current_pos_y;//0
        if(this.name=="pawn"){
            let mov = this.color =="white" ? 1 :-1;//1
            const isblack = this.color=="black";//false
            if (isEmpty(x,y+mov)){
                possible_moves.push([x,y+mov]);
            }
            if (((y==1 && !isblack ) || (y == 6 && isblack) )&& isEmpty(x , y+2*mov) && isEmpty(x,y+mov))
            {
                possible_moves.push([x,y+2*mov]);
            }
            if (isEnemy(x+1,y+mov,this.color) )
                {
                     possible_moves.push([x+1,y+mov]);
                }
            if (isEnemy(x-1,y+mov,this.color))
                {
                    possible_moves.push([x-1,y+mov]);
                }
            
        }
        if (this.name=="knight"){
            const p_Moves = [
                [1, -2],// 2 ,-2
                [2, -1],
                [1, 2], // 2 ,2
                [2, 1], // 3,1
                [-1, -2],
                [-2, -1],
                [-1, 2],
                [-2, 1],
            ];
            for (const [dx, dy] of p_Moves) {
                const X = x + dx; // 2
                const Y = y + dy; // 2
                if ( isValid(X,Y) && isEmpty(X,Y)) {
                    possible_moves.push([X,Y]);
                }
                else if (isValid(X,Y) && isEnemy(X,Y,this.color)) {
                    possible_moves.push([X,Y]);
                }
            }
        }
        if (this.name=="king"){
            const p_Moves = [
                [1,0],
                [0,1],
                [1,1],
                [-1,0],
                [0,-1],
                [-1,-1],
                [-1,1],
                [1,-1],
            ];
            for (const [dx, dy] of p_Moves) {
                const X = x + dx;
                const Y = y + dy;
                if ( isValid(X,Y) && isEmpty(X,Y)) {
                    possible_moves.push([X,Y]);
                }
                else if (isEnemy(X,Y,this.color)) {
                    possible_moves.push([X,Y]);
                }
            }
        }
        if (this.name=="rock" || this.name == "queen"){
            for(let i=y+1;i<8;i++){
                if ( isEmpty(x,i)){
                    possible_moves.push([x,i]);
                }
                else if( isEnemy(x,i,this.color)){
                    possible_moves.push([x,i]);
                    break;
                }
                else if (sameColor(x,i,this.color)){
                    break;
                }
            }

            for(let i=y-1;i>=0;i--){
                if ( isEmpty(x,i)){
                    possible_moves.push([x,i]);
                }
                else if( isEnemy(x,i,this.color)){
                    possible_moves.push([x,i]);
                    break;
                }
                else if (sameColor(x,i,this.color)){
                    break;
                }
                
            }
            for(let i=x-1;i>=0;i--){
                if(isEmpty(i,y)){
                    possible_moves.push([i,y]);
                }
                else if( isEnemy(i,y,this.color)){
                    possible_moves.push([i,y]);
                    break;
                }
                else if (sameColor(i,y,this.color)){
                    break;
                }
                
            }
            for(let i=x+1;i<8;i++){
                if(isEmpty(i,y)){
                    possible_moves.push([i,y]);
                }
                else if( isEnemy(i,y,this.color)){
                    possible_moves.push([i,y]);
                    break;
                }
                else if (sameColor(i,y,this.color)){
                    break;
                }
            }
        }
        if(this.name=="bishop" || this.name == "queen" ){
            for (let i = y + 1, j = x + 1; i<8 && j<8; i++, j++) {
                    if ( isEmpty(j,i))
                    {
                        possible_moves.push([j,i]);
                    }
                    else if( isEnemy(j,i,this.color)){
                       possible_moves.push([j,i]);
                       break;
                    }
                    else if (sameColor(j,i,this.color)){
                       break;
                    }
               
            }
            for (let i = y + 1, j = x - 1; j>=0 && i<8; i++, j--) {
                if ( isEmpty(j,i))
                {
                    possible_moves.push([j,i]);
                }
                else if( isEnemy(j,i,this.color)){
                    possible_moves.push([j,i]);
                    break;
                }
                else if (sameColor(j,i,this.color)){
                    break;
                }
                
            }
            for (let i = y - 1, j = x + 1; i>=0 && j<8; i--, j++) {
                if ( isEmpty(j,i))
                {
                    possible_moves.push([j,i]);
                }
                else if( isEnemy(j,i,this.color)){
                    possible_moves.push([j,i]);
                    break;
                }
                else if (sameColor(j,i,this.color)){
                    break;
                }
              
            }
            for (let i = y - 1, j = x - 1; i>=0 && j>=0; i--, j--) {
                if ( isEmpty(j,i))
                {
                    possible_moves.push([j,i]);
                }
                else if( isEnemy(j,i,this.color)){
                    possible_moves.push([j,i]);
                    break;
                }
                else if (sameColor(j,i,this.color)){
                    break;
                }
               
            }
 
        }
    return possible_moves;
    
    }
}
export default Piece;