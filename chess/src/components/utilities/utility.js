 export function get_possible_moves(board,piece) {
    let possible_moves=[];
    const isValid = (x,y) => {return x>=0 && x<8 && y>=0 && y<8;}
    const isEmpty = (x, y) => {return isValid(x,y) && board[y][x] === null;}
    const sameColor = (x, y, color) => board[y] && board[y][x] && board[y][x].color === color;
    const isEnemy = (x, y, color) => board[y] && board[y][x] != null && board[y][x].color !== color;
    let x = piece.current_pos_x;//2
    let y = piece.current_pos_y;//0
    if(piece.name=="pawn"){
        let mov = piece.color =="white" ? -1 :1;//1
        const isblack = piece.color=="white";//false
        if (isEmpty(x,y+mov)){
            possible_moves.push([x,y+mov]);
        }
        if (((y==1 && !isblack ) || (y == 6 && isblack) )&& isEmpty(x , y+2*mov) && isEmpty(x,y+mov))
        {
            possible_moves.push([x,y+2*mov]);
        }
        if (isEnemy(x+1,y+mov,piece.color) )
            {
                 possible_moves.push([x+1,y+mov]);
            }
        if (isEnemy(x-1,y+mov,piece.color))
            {
                possible_moves.push([x-1,y+mov]);
            }
        
    }
    if (piece.name=="knight"){
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
            else if (isValid(X,Y) && isEnemy(X,Y,piece.color)) {
                possible_moves.push([X,Y]);
            }
        }
    }
    if (piece.name=="king"){
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
            else if (isEnemy(X,Y,piece.color)) {
                possible_moves.push([X,Y]);
            }
        }
    }
    if (piece.name=="rock" || piece.name == "queen"){
        for(let i=y+1;i<8;i++){
            if ( isEmpty(x,i)){
                possible_moves.push([x,i]);
            }
            else if( isEnemy(x,i,piece.color)){
                possible_moves.push([x,i]);
                break;
            }
            else if (sameColor(x,i,piece.color)){
                break;
            }
        }

        for(let i=y-1;i>=0;i--){
            if ( isEmpty(x,i)){
                possible_moves.push([x,i]);
            }
            else if( isEnemy(x,i,piece.color)){
                possible_moves.push([x,i]);
                break;
            }
            else if (sameColor(x,i,piece.color)){
                break;
            }
            
        }
        for(let i=x-1;i>=0;i--){
            if(isEmpty(i,y)){
                possible_moves.push([i,y]);
            }
            else if( isEnemy(i,y,piece.color)){
                possible_moves.push([i,y]);
                break;
            }
            else if (sameColor(i,y,piece.color)){
                break;
            }
            
        }
        for(let i=x+1;i<8;i++){
            if(isEmpty(i,y)){
                possible_moves.push([i,y]);
            }
            else if( isEnemy(i,y,piece.color)){
                possible_moves.push([i,y]);
                break;
            }
            else if (sameColor(i,y,piece.color)){
                break;
            }
        }
    }
    if(piece.name=="bishop" || piece.name == "queen" ){
        for (let i = y + 1, j = x + 1; i<8 && j<8; i++, j++) {
                if ( isEmpty(j,i))
                {
                    possible_moves.push([j,i]);
                }
                else if( isEnemy(j,i,piece.color)){
                   possible_moves.push([j,i]);
                   break;
                }
                else if (sameColor(j,i,piece.color)){
                   break;
                }
           
        }
        for (let i = y + 1, j = x - 1; j>=0 && i<8; i++, j--) {
            if ( isEmpty(j,i))
            {
                possible_moves.push([j,i]);
            }
            else if( isEnemy(j,i,piece.color)){
                possible_moves.push([j,i]);
                break;
            }
            else if (sameColor(j,i,piece.color)){
                break;
            }
            
        }
        for (let i = y - 1, j = x + 1; i>=0 && j<8; i--, j++) {
            if ( isEmpty(j,i))
            {
                possible_moves.push([j,i]);
            }
            else if( isEnemy(j,i,piece.color)){
                possible_moves.push([j,i]);
                break;
            }
            else if (sameColor(j,i,piece.color)){
                break;
            }
          
        }
        for (let i = y - 1, j = x - 1; i>=0 && j>=0; i--, j--) {
            if ( isEmpty(j,i))
            {
                possible_moves.push([j,i]);
            }
            else if( isEnemy(j,i,piece.color)){
                possible_moves.push([j,i]);
                break;
            }
            else if (sameColor(j,i,piece.color)){
                break;
            }
           
        }

    }
    
return possible_moves;
}
 export const findPiece = (playerPieces,name) =>{
 for(let piece of playerPieces){
   if(piece.name === name) return [piece.current_pos_x,piece.current_pos_y];
 }
} 
export const isCheck = (board,whitePieces,blackPieces,color)=>{
    const [enemyPieces,playerPieces] = [color=="black" ? whitePieces: blackPieces,color=="white"?whitePieces:blackPieces];
    const kingPos =findPiece(playerPieces,"king");
    for(let piece of enemyPieces){
        for(const move of get_possible_moves(board,piece)){
             if (move[0] === kingPos[0] && move[1] === kingPos[1]) {
                return true;
            }
         }   
      }
     return false;
 }

 export function isCheckMate(board,whitePieces,blackPieces,color){
    if (isCheck(board,whitePieces,blackPieces,color) ){
        const playerPieces =  color=== "white"? whitePieces : blackPieces ;
        for (let piece of playerPieces){
            if(piece.possible_moves(board,whitePieces,blackPieces).length>0) return false;
        }
        return true;
    }
    else{
        return false;
    }
}