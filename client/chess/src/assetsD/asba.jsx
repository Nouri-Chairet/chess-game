import React from 'react';
import '../styles/table.css';

import { sounds } from '../utilities/audio';
import { isGameOver } from '../utilities/refere.js';
import { isCheck } from '../utilities/utility.js';
import Piece from '../utilities/piece.js';

import dot from './assets/dot.svg';
import circle from './assets/circle.svg';

import { itemDataWhite, itemDataBlack } from '../utilities/constants';

import PromotionChoices from './promotion.jsx'

const Table = ({board,setBoard,Player1,Player2,setPlayer1,setPlayer2,MovesHistory,setMovesHistory,currentPlayer,setCurrentPlayer,setGameOver}) => {
        
        const [possibleMoves, setPossibleMoves] = React.useState([]);
        const [selectedPiece,setSelectedPiece] =React.useState(null);
       
        const itemData=currentPlayer.color==="black"?itemDataBlack:itemDataWhite;


        const suggest = React.useCallback((piece) => {
                console.log("Suggesting a move");
                if (!piece || piece.color !== currentPlayer.color) return;
                const moves = piece.possible_moves(board, MovesHistory);
                setPossibleMoves(moves);
                setSelectedPiece(piece);
              }, [board, MovesHistory, currentPlayer]);
            
     const isPossibleMove = ([x,y]) => {
             for (let i=0;i<possibleMoves.length;i++){
                     if (possibleMoves[i][0]==x && possibleMoves[i][1]==y){
                             return true;
                        }
                }
                return false;       
        }
        
        const stylePossibleMove=(i,j)=>{
                const isEmpty = (x, y) => {return  board[y][x] === null;}
                return {
                        backgroundImage:isEmpty(i,j)?`url(${dot})`:`url(${circle})`,
                        backgroundSize: isEmpty(i,j)?'70% 70%':"100% 100%",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',}
        }
        const selectedStyle ={
             boxShadow: 'inset 0px 0px 10px 10px  #aca56fbc',
        }
        const checkStyle={
                boxShadow:'inset 0px 0px 10px 10px #c13636 '
        }
        const Style =(i,j,element)=>{
                if (isPossibleMove([i,j])) return stylePossibleMove(i,j);
                if (element === selectedPiece) return selectedStyle;
                return {};
        }
        const handlePromotion = (name,piece) => {
                piece.name=name;
                switch(name){
                   case "queen":
                        piece.image= piece.color=="white" ? queen : b_queen;
                        piece.value=9;
                        break;
                   case "rook":
                        piece.image= piece.color=="white" ? rook : b_rook;
                        piece.value=5;
                        break;
                   case "bishop":
                        piece.image= piece.color=="white" ? bishop : b_bishop;
                        piece.value=3;
                        break;
                   case "knight":
                        piece.image= piece.color=="white" ? knight : b_knight;
                        piece.value=3;
                        break;
                
                }
                setBoard([...board]);
                sounds.promotion.play();
                setSelectedPiece([]);
        };
        const capture=(takenPiece)=>{
                if( currentPlayer.color==Player2.color){
                               
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
        const makeAMove = (x,y,piece) =>{
                let takenPiece = board[y][x];
                 return ()=>{  
                    let newBoard = [...board];
                    let move="move";

                    
                    if (takenPiece != null){
                        capture(takenPiece);
                        move="capture";
                    }
                    //for the castling move we need to move the rook as well
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
                                capture(board[lastMove.newPos[1]][lastMove.newPos[0]]);
                                newBoard[lastMove.newPos[1]][lastMove.newPos[0]]=null;
                                move="capture"; 
                        }
                }
                   
                      
                    
                    let color = currentPlayer.color==Player2.color ? Player1.color : Player2.color;
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
return (
                <div className='container-chess-table'>
                <div className="chess-table">
                        <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                       </ul>
                        <div className='table-container'>
                        {
                            board.map((column, j) => {
                                    return (
                                            <div className="chess-row" key={`row-${j}`}>
                                    {column.map((element, i) => {
                                            return (
                                                    <div
                                                    className={`chess-cell ${(j + i) % 2 === 0 ? "white" : "brown" }`}
                                                    style={Style(i,j,element)}
                                                    key={`cell-${i}-${j}`}
                                                    onClick={
                                                            isPossibleMove([i,j]) ? 
                                                            makeAMove(i,j,selectedPiece) :
                                                            suggest(element)
                                                        }
                                                            >
                                                {element != null ? 
                                                 (      (element.name=="pawn" && ( j==7 || j==0 ) ) ?
                                                       
                                                       <PromotionChoices  
                                                        itemData={itemData}
                                                       piece={selectedPiece}
                                                       onPromotion={handlePromotion}
                                                       />
                
                                                        :
                                                        <img
                                                        style={element.color==currentPlayer.color && element.name=="king" && isCheck(board,currentPlayer.color,MovesHistory) ? checkStyle : {}}
                                                        className="piece"
                                                        src={element.image}
                                                        alt={element.name}
                                                        /> ) : (<></> )}
                                            </div>
                                            
                                            );
                                        })}
                                </div>
                            );
                        })
                        
                }
                <div className='alpha'>
                    { Array.from({length: 8}, (_, i) => <p key={i}>{String.fromCharCode(i+65)}</p>) }
                    </div>
                </div>  
                </div>            
                        </div>
                        
        );
};

export default Table;


