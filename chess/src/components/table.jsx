import React from 'react';
import '../styles/table.css';
import { sounds } from '../utilities/audio';
import { isCheck } from '../utilities/utility.js';
import { makeAMove } from '../utilities/helpers.js';
import dot from '../assets/dot.svg';
import circle from '../assets/circle.svg';
import { itemDataWhite, itemDataBlack } from '../utilities/constants';
import PromotionChoices from './promotion.jsx';
import { FenConverter } from '../utilities/FENconverter.js';
import fetchNextMove from '../utilities/nextMove.js'
const Table = React.memo(({board,setBoard,Player1,Player2,setPlayer1,setPlayer2,MovesHistory,setMovesHistory,currentPlayer,setCurrentPlayer,setGameOver,ComputerMode}) => {
        
        const [possibleMoves, setPossibleMoves] = React.useState([]);
        const [selectedPiece,setSelectedPiece] =React.useState(null);
        const [fullMove,setFullMove]=React.useState(0);
        
        const itemData=currentPlayer.color==="white"?itemDataBlack:itemDataWhite;
        const suggest = React.useCallback((piece) => {
                if (!piece || piece.color !== currentPlayer.color) return;
                const moves = piece.possible_moves(board, MovesHistory);
                setPossibleMoves(moves);
                setSelectedPiece(piece);
              }, [board, MovesHistory, currentPlayer.color]);
            
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
                if(!selectedPiece){
                        return {};
                }
                if (element === selectedPiece) return selectedStyle;
                if (isPossibleMove([i,j])) return stylePossibleMove(i,j);
                return {};
        }
        const handlePromotion = (item,piece) => {
                piece.name=item.name;
                piece.image=item.src;
                piece.value=item.value;
                
                setBoard([...board]);
                sounds.promotion.play();
                setSelectedPiece(null);
        };
        if(ComputerMode){
                if (currentPlayer.color === "black") {
                        fetchNextMove(FenConverter(board,currentPlayer.color,MovesHistory,fullMove))
                        .then(nextMove => {
                                let words=nextMove.split(' ')
                                nextMove=words[1];
                                let sourceSquareY=nextMove[0].charCodeAt(0)-'a'.charCodeAt(0);
                                let sourceSquareX=8-Number(nextMove[1]);
                                let destinationSquareY=nextMove[2].charCodeAt(0)-'a'.charCodeAt(0);
                                let destinationSquareX=8-Number(nextMove[3]);
                                setSelectedPiece(board[sourceSquareX][sourceSquareY])
                                makeAMove(destinationSquareY,
                                        destinationSquareX,
                                        board[sourceSquareX][sourceSquareY],
                                        board,
                                        setCurrentPlayer,
                                        setGameOver,
                                        setPossibleMoves,
                                        setBoard,
                                        setMovesHistory,
                                        currentPlayer,
                                        MovesHistory,
                                        setPlayer1,
                                        setPlayer2,
                                        setFullMove,
                                        Player1,
                                        Player2)();  
                        })
                        .catch(error => {
                                 console.error('Error while getting next move:', error);
                        });                        
                        
                      
                }
        }
return (
        <div className='container-chess-table'>
                <div className="chess-table">
                        <ul>
                                <li>8</li>
                                <li>7</li>
                                <li>6</li>
                                <li>5</li>
                                <li>4</li>
                                <li>3</li>
                                <li>2</li>
                                <li>1</li>
                        </ul>
                        <div className='table-container'>
                                {
                                        board.map((column, j) => {
                                                return (
                                                        <div className="chess-row" key={`row-${j}`}>
                                                                {column.map((element, i) => {
                                                                        return (
                                                                                <div
                                                                                        className={`chess-cell ${(j + i) % 2 === 0 ? "white" : "brown"}`}
                                                                                        style={Style(i, j, element)}
                                                                                        key={`cell-${i}-${j}`}
                                                                                        onClick={() => {
                                                                                                if (isPossibleMove([i, j])) {
                                                                                                        makeAMove(i, j, selectedPiece,board,setCurrentPlayer,setGameOver,setPossibleMoves,setBoard,setMovesHistory,currentPlayer,MovesHistory,setPlayer1,setPlayer2,setFullMove,Player1,Player2)();
                                                                                                } else {
                                                                                                        suggest(element);
                                                                                                }
                                                                                        }}
                                                                                >
                                                                                        {element != null ?
                                                                                                ((element.name == "pawn" && (j == 7 || j == 0)) ?

                                                                                                        <PromotionChoices
                                                                                                                itemData={itemData}
                                                                                                                piece={selectedPiece}
                                                                                                                onPromotion={handlePromotion}
                                                                                                                reverse={j == 7}
                                                                                                        />

                                                                                                        :
                                                                                                        <img
                                                                                                                style={element.color == currentPlayer.color && element.name == "king" && isCheck(board, currentPlayer.color, MovesHistory) ? checkStyle : {}}
                                                                                                                className={`piece `}
                                                                                                                src={element.image}
                                                                                                                alt={element.name}
                                                                                                        />) : (<></>)}
                                                                                </div>

                                                                        );
                                                                })}
                                                        </div>
                                                );
                                        })

                                }
                                <div className='alpha'>
                                        {Array.from({ length: 8 }, (_, i) => <p key={i}>{String.fromCharCode(i + 65)}</p>)}
                                </div>
                        </div>
                </div>
        </div>

);
});

export default Table;


