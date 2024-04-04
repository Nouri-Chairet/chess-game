import React from 'react';
import './table.css';

import {isCheck} from './utilities/utility';
import Piece from './utilities/piece.js';

import PlayerStats from './playerStats.jsx';
import dot from './assets/dot.svg';
import circle from './assets/circle.svg';

import queen from './assets/white_queen.svg';
import rook from './assets/white_rock.svg';
import bishop from './assets/white_bishop.svg';
import knight from './assets/white_knight.svg';

import b_queen from './assets/black_queen.svg';
import b_rook from './assets/black_rock.svg';
import b_bishop from './assets/black_bishop.svg';
import b_knight from './assets/black_knight.svg';

const Table = ({board,setBoard,Player1,Player2,MovesHistory,setMovesHistory}) => {
        
        const [possibleMoves, setPossibleMoves] = React.useState([]);
        const [currentPlayer,setCurrentPlayer] = React.useState(Player1);
        const [selectedPiece,setSelectedPiece] =React.useState(new Piece);
        const [player1Time,setPlayer1Time]=React.useState(Player1.time);
        const [player2Time,setPlayer2Time]=React.useState(Player2.time);
        const suggest = (piece) => {

                if (piece == null || !(piece.color == currentPlayer.color)) return;
                else {
                 return () => {
                     const moves = piece.possible_moves(board,MovesHistory);
                     setPossibleMoves(moves);
                     setSelectedPiece(piece);
                }
        }
     } 
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
                        break;
                   case "rook":
                        piece.image= piece.color=="white" ? rook : b_rook;
                        break;
                   case "bishop":
                        piece.image= piece.color=="white" ? bishop : b_bishop;
                        break;
                   case "knight":
                        piece.image= piece.color=="white" ? knight : b_knight;
                        break;
                
                }
                setBoard([...board]);
                setSelectedPiece([]);

        };
        const makeAMove = (x,y,piece) =>{
                
                const isblack = piece.color === "black";


                 return ()=>{
                    let newBoard = board;
                    if (board[y][x] != null){
                        isblack ? Player2.takeOver(board[y][x]) :Player1.takeOver(board[y][x]);
                        //`${MovesHistory.length%2}.${piece.name}x${String.fromCharCode(x+65)}${8-y}`
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
                    
                    }
                    //for the en passant rule
                    if(MovesHistory.length>0){
                        let lastMove = MovesHistory[MovesHistory.length-1];
                        if (lastMove.piece=="pawn" && Math.abs(lastMove.prevPos[1]-lastMove.newPos[1])==2 && (lastMove.newPos[0]==piece.current_pos_x+1 || lastMove.newPos[0]==piece.current_pos_x-1) && lastMove.newPos[1]==piece.current_pos_y){
                                newBoard[lastMove.newPos[1]][lastMove.newPos[0]]=null;
                        }
                        
                    }
                    MovesHistory.push({ piece: piece.name, prevPos: [piece.current_pos_x, piece.current_pos_y], newPos: [x, y], takeOver: board[y][x] });
                    newBoard[piece.current_pos_y][piece.current_pos_x]=null;
                    piece.setCurrentPos(x,y);
                    newBoard[y][x]=piece;
                    setBoard(newBoard);
                    setPossibleMoves([]);
                    setCurrentPlayer(currentPlayer.color=="white" ? Player2 : Player1 )
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
                                                            suggest(element)}
                                                            >
                                                {element != null ? 
                                                 (      (element.name=="pawn" && ( j==7 || j==0 ) ) ?
                                                        <select onDoubleClick={(e) => handlePromotion(e.target.value,selectedPiece)} className='promotion-square'>
                                                                <option value="queen">Queen</option>:
                                                                <option value="rook">Rook</option>
                                                                <option value="bishop">Bishop</option>
                                                                <option value="knight">Knight</option>
                                                        </select>
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


