const hasMoved = (piece,movesHistory) => {
    for (let move of movesHistory){
        if (move.piece==piece.name && move.prevPos[0]==piece.current_pos_x && move.prevPos[1]==piece.current_pos_y){
            return true;
        }
    }
    return false;
}
export function castling(piece,board,movesHistory){
    let castleMoves=[];
    if(!piece){
        return castleMoves;
    }
    if (piece.name!="king"){
        return castleMoves;
    }
    if(hasMoved(piece,movesHistory)){
        return castleMoves;
    }
    let [color,x,y] = [piece.color,piece.current_pos_x,piece.current_pos_y];
    let leftRook=board[y][0];
    let rightRook=board[y][7];
    if(leftRook!=null && leftRook.name=="rook" && leftRook.color==color && !hasMoved(leftRook,movesHistory)){
        let canCatle=true;
        for(let i=1;i<x;i++){
            if(board[y][i]!=null){
                canCatle=false;
                break;
            }
        }
        if(canCatle){
            for(let row of board){
                for (let piece of row){
                    if(piece!=null && piece.color!=color){
                        let pMoves=get_possible_moves(board,piece,movesHistory);
                        for (let move of pMoves){
                            if(move[1]==y && (move[0]==x || move[0]==x-1 || move[0]==x-2)){
                                canCatle=false;
                                break;
                            }
                        }
                    }
                }
        }
        }
        if(canCatle){
            castleMoves.push([x-2,y]);
        } 
    }
    if(rightRook!=null && rightRook.name=="rook" && rightRook.color==color && !hasMoved(rightRook,movesHistory)){
        let canCatle=true;
        for(let i=x+1;i<7;i++){
            if(board[y][i]!=null){
                canCatle=false;
                break;
            }
        }
        if(canCatle){
            for(let row of board){
                for (let piece of row){
                    if(piece!=null && piece.color!=color){
                        let pMoves=get_possible_moves(board,piece,movesHistory);
                        for (let move of pMoves){
                            if(move[1]==y && (move[0]==x || move[0]==x+1 || move[0]==x+2)){
                                canCatle=false;
                                break;
                            }
                        }
                    }
                }
        }
        }
        if(canCatle){
            castleMoves.push([x+2,y]);
        } 
    }
    return castleMoves;
}

export const findPiece = (board,name,color) =>{
    for (let i=0;i<8;i++){
        for (let j=0;j<8;j++){
            if (board[i][j] && board[i][j].name==name && board[i][j].color==color){
                return [j,i];
            }
        }
    }
   } 
export function exist (white,black,x,y){
    for (let i=0;i<16;i++){
            if (white[i].current_pos_x==x && white[i].current_pos_y==y) {
                    return white[i];
            }
            if (black[i].current_pos_x==x && black[i].current_pos_y==y) {
                    return black[i];
            }
    }
    return null;
}
export function get_possible_moves(board,piece,movesHistory) {
    let possible_moves=[];
    const isValid = (x,y) => {return x>=0 && x<8 && y>=0 && y<8;}
    const isEmpty = (x, y) => {return isValid(x,y) && board[y][x] === null;}
    const sameColor = (x, y, color) => board[y] && board[y][x] && board[y][x].color === color;
    const isEnemy = (x, y, color) => board[y] && board[y][x] != null && board[y][x].color !== color;
    let x = piece.current_pos_x;//2
    let y = piece.current_pos_y;//0
    if(piece.name=="pawn"){
    
        let mov = piece.color =="white" ? -1 :1;
        const isblack = piece.color=="white";
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
        if (movesHistory.length>0){
            let lastMove = movesHistory[movesHistory.length-1];         
            if (lastMove.piece=="pawn" && Math.abs(lastMove.prevPos[1]-lastMove.newPos[1])==2 && (lastMove.newPos[0]==x+1 || lastMove.newPos[0]==x-1) && lastMove.newPos[1]==y){
                possible_moves.push([lastMove.newPos[0],y+mov]);
            }
        }
        
    }
    if (piece.name=="knight"){
        const p_Moves = [
            [1, -2],
            [2, -1],
            [1, 2], 
            [2, 1], 
            [-1, -2],
            [-2, -1],
            [-1, 2],
            [-2, 1],
        ];
        for (const [dx, dy] of p_Moves) {
            const X = x + dx; 
            const Y = y + dy; 
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
    if (piece.name=="rook" || piece.name == "queen"){
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


export const isCheck = (board,color,movesHistory)=>{
    const kingPos =findPiece(board,"king",color);
    if (!kingPos || kingPos.length !== 2) {
        console.error("King not found or invalid position.");
        return false;
    }
    for(let row of board){
        for(let piece of row){
            if(piece && piece.color !== color){
            let pMoves=get_possible_moves(board,piece,movesHistory);
            for(let move of pMoves){
                if (move[0]==kingPos[0] && move[1]==kingPos[1]){
                    return true;
                }
            }
        }
        }
    }
     
     return false;
 }


 