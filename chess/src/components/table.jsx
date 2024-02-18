import React from 'react';
import './table.css';
import b_queen from './assets/black_queen.svg';
import w_queen from './assets/white_queen.svg';
import {isCheck,isCheckMate , filterPossibleMoves} from './utilities/utility';
import PlayerStats from './gameplay';

const Table = ({white,black,Piece,Player1,Player2}) => {
        function exist (x,y){
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
        
        
        const [blackPieces,setBlack] = React.useState(black);
        const [whitePieces,setWhite] = React.useState(white);
        const [possibleMoves, setPossibleMoves] = React.useState([]);
        const [ board, setBoard] =React.useState([]);
        const [currentPlayer,setCurrentPlayer] = React.useState(Player1);
        const [selectedPiece,setSelectedPiece] =React.useState(new Piece);
        
        const suggest = (piece) => {
                if (piece == null || !(piece.color == currentPlayer.color)) return;
                else {
                 return () => {
                     piece.possible_moves=piece.get_possible_moves(board);
                     const moves = piece.possible_moves;
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
                        boxShadow: isEmpty(i,j) ?'inset 0px 0px 10px 5px rgba(1, 1, 1, 0.4)' :'inset 0px 0px 15px 6px rgb(236, 10, 10,0.9)'
                }
        }
        const selectedStyle ={
                boxShadow: 'inset 0px 0px 20px 23px #e7f4a1',
        }
        const test =(i,j,element)=>{
                if (isPossibleMove([i,j])) return stylePossibleMove(i,j);
                if (element === selectedPiece) return selectedStyle;
                return {};
        }
        const makeAMove = (x,y,piece) =>{
                
                const isblack = piece.color === "black";
                const Pieces = isblack ? blackPieces : whitePieces;
                if(isCheckMate(board,whitePieces,blackPieces,piece.color)) {
                        alert("tahchelak");
                        return ;
                }
                else{
                        if (isCheck(board,whitePieces,blackPieces, piece.color)){
                                // styling 3al king
                                console.log("check")
                        }
                 return ()=>{
                    if (board[y][x] != null){
                        isblack ? Player2.takeOver(board[y][x]) :Player1.takeOver(board[y][x]);
                    }
                    let newBoard = board;
                    newBoard[piece.current_pos_y][piece.current_pos_x]=null;
                    let newPieces = Pieces;
                    newPieces[piece.current_pos_y][piece.current_pos_x]=null;
                    piece.setCurrentPos(x,y);
                    if ( ((y==7 && !isblack) || (y==0 && isblack)) && piece.name=="pawn"){
                            piece.name="queen";
                            piece.image= !isblack ? w_queen : b_queen;
                        }
                    newPieces[y][x]=piece;
                    newBoard[y][x]=piece;
                    isblack ? setBlack(newPieces):setWhite(newPieces);
                    setBoard(newBoard);
                    setPossibleMoves([]);
                    setSelectedPiece(undefined);
                    setCurrentPlayer(currentPlayer.color=="white" ? Player2 : Player1 )
                }
        }
}  
React.useEffect(()=>{
        let temp =[];
        for (let i = 0; i < 8; i++) {
                temp[i] = [];
                for (let j = 0; j < 8; j++) {
                        temp[i][j] = exist(j, i);
                }
        }
        setBoard(temp);
},[]
)
return (
                <div className='container-chess-table'>
                <PlayerStats name={Player1.name} takeOvers={Player1.takeOvers}/>
                <div className="chess-table">
                        <div className='chessss'>
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
                        {/* <p style={{ }}>{j+1}</p> */}
                        <div className='chess_tble'>
                        {
                            board.map((column, j) => {
                                    return (
                                            <div className="chess-row" key={`row-${j}`}>
                                    {column.map((element, i) => {
                                            return (
                                                    <div
                                                    className={`chess-cell ${(j + i) % 2 === 0 ? "white" : "brown" }`}
                                                    style={test(i,j,element)}
                                                    key={`cell-${i}-${j}`}
                                                    onClick={
                                                            isPossibleMove([i,j]) ? 
                                                            makeAMove(i,j,selectedPiece) :
                                                            suggest(element)}
                                                            >
                                                {element != null ? (
                                                        <img
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
                    { Array.from({length: 8}, (_, i) => <p>{String.fromCharCode(i+65)}</p>) }
                    </div>
                        </div>
                        
                        </div>
                       
                    
                </div>
                               
                <PlayerStats name={Player2.name} takeOvers={Player2.takeOvers}/>
                        </div>
                        
        );
};

export default Table;


