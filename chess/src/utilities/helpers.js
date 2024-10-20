import { isGameOver } from "./refere";
import {isCheck} from "./utility"
import { sounds } from '../utilities/audio';
const capture=(takenPiece,setPlayer1,setPlayer2,currentPlayer)=>{
    if( currentPlayer.color=="black"){        
            setPlayer2(prev => ({
                    ...prev,
                    takeOvers: [...prev.takeOvers, takenPiece],
                    score: prev.score+takenPiece.value
                }))
             setPlayer1(prev => ({...prev,score:prev.score-takenPiece.value}))
    } 
     else{
             setPlayer1(prev=>(
                     {
                     ...prev,
                     takeOvers: [...prev.takeOvers, takenPiece],
                     score: prev.score+takenPiece.value
              } ));
             setPlayer2(prev=>({...prev,score:prev.score-takenPiece.value}));
     }
}
export const makeAMove = (x,y,piece,board,setCurrentPlayer,setGameOver,setPossibleMoves,setBoard,setMovesHistory,currentPlayer,MovesHistory,setPlayer1,setPlayer2,setFullMove,Player1,Player2) =>{
    let takenPiece = board[y][x];
    return ()=>{  
    if(piece.color=="white"){
            setFullMove(prev=>prev+1);
    }
    let newBoard = [...board];
    let move="move";
            
            
    if (takenPiece != null){
             capture(takenPiece,setPlayer1,setPlayer2,currentPlayer);
             move="capture";
     }
    if(piece.name=="king" && Math.abs(piece.current_pos_x-x)==2){
        switch(x){
                case 2:
                    var rook = board[y][0];
                break;
             case 6:
                        var rook = board[y][7];
                     break;
             }
        newBoard[y][x==2?3:5]=rook;
                    
        newBoard[y][x==2?0:7]=null;
        rook.setCurrentPos(x==2?3:5,y);
        move="castle";
    }
     if(MovesHistory.length>0){
         let lastMove = MovesHistory[MovesHistory.length-1];
         if (piece.name=="pawn" && piece.current_pos_x!=x && takenPiece==null){
                   capture(board[lastMove.newPos[1]][lastMove.newPos[0]],setPlayer1,setPlayer2,currentPlayer);
                   newBoard[lastMove.newPos[1]][lastMove.newPos[0]]=null;
                move="capture"; 
        }
        }
        let color = currentPlayer.color=="black" ? "white" : "black";
        setMovesHistory(prev=>([...prev,{ piece: piece.name, prevPos: [piece.current_pos_x, piece.current_pos_y], newPos: [x, y], takeOver: board[y][x] }]));
        newBoard[piece.current_pos_y][piece.current_pos_x]=null;
        piece.setCurrentPos(x,y);
        newBoard[y][x]=piece;
        if(isCheck(newBoard,color,MovesHistory)) {
                move="check";
            }
            setBoard(newBoard);
            setPossibleMoves([]);
            if (isGameOver(newBoard, currentPlayer.color==Player1.color ? Player2 : Player1, MovesHistory, Player1, Player2) ) {
                    setGameOver(true);
                    sounds.end.play();
            }
            setCurrentPlayer(currentPlayer.color==Player1.color ? Player2 : Player1 );
            sounds[move].play();
            
    }
    
}  