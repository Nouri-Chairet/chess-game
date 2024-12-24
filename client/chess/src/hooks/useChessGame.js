import { useState, useEffect } from 'react';
import { isCheckMate, isStalemate, isGameOver} from '../utilities/refere';
import { exist, isCheck  } from '../utilities/utility';
import { FenConverter } from '../utilities/FENconverter';
import Piece from '../utilities/piece';
import StockfishService from '../utils/engineService';
import { sounds } from '../utilities/audio';
import b_bishop from '../assets/black_bishop.svg';
import b_pawn from '../assets/black_pawn.svg';
import b_rock from '../assets/black_rock.svg';
import b_king from '../assets/black_king.svg';
import b_queen from '../assets/black_queen.svg';
import b_knight from '../assets/black_knight.svg';
import w_bishop from '../assets/white_bishop.svg';
import w_rock from '../assets/white_rock.svg';
import w_king from '../assets/white_king.svg';
import w_queen from '../assets/white_queen.svg';
import w_knight from '../assets/white_knight.svg';
import w_pawn from '../assets/white_pawn.svg';

class Player {
  constructor(color, name, timer) {
    this.score = 0;
    this.takeOvers = [];
    this.timer = timer;
    this.name = name;
    this.color = color;
  }
}

class Game {
  constructor(name1, name2, timer) {
    this.MovesHistory = [];
    this.board = [];
    this.Player1 = new Player("white", name1, timer);
    this.Player2 = new Player("black", name2, timer);
    this.currentPlayer = this.Player1;
    this.winner = null;
    this.stalemate = false;
  }

  initBoard() {
    let pawns = [];
    for (let i = 0; i < 8; i++) {
      pawns.push(new Piece('white', i, 6, w_pawn, 'pawn', 1));
    }
    const white = [
      ...pawns,
      new Piece('white', 2, 7, w_bishop, 'bishop', 3),
      new Piece('white', 5, 7, w_bishop, 'bishop', 3),
      new Piece('white', 0, 7, w_rock, 'rook', 5),
      new Piece('white', 7, 7, w_rock, 'rook', 5),
      new Piece('white', 1, 7, w_knight, 'knight', 3),
      new Piece('white', 6, 7, w_knight, 'knight', 3),
      new Piece('white', 4, 7, w_king, 'king', 0),
      new Piece('white', 3, 7, w_queen, 'queen', 9),
    ];
    let pawns_b = [];
    for (let i = 0; i < 8; i++) {
      pawns_b.push(new Piece('black', i, 1, b_pawn, 'pawn', 1));
    }
    const black = [
      ...pawns_b,
      new Piece('black', 2, 0, b_bishop, 'bishop', 3),
      new Piece('black', 5, 0, b_bishop, 'bishop', 3),
      new Piece('black', 0, 0, b_rock, 'rook', 5),
      new Piece('black', 7, 0, b_rock, 'rook', 5),
      new Piece('black', 1, 0, b_knight, 'knight', 3),
      new Piece('black', 6, 0, b_knight, 'knight', 3),
      new Piece('black', 4, 0, b_king, 'king', 0),
      new Piece('black', 3, 0, b_queen, 'queen', 9),
    ];
    for (let i = 0; i < 8; i++) {
      this.board[i] = [];
      for (let j = 0; j < 8; j++) {
        this.board[i][j] = exist(white, black, j, i);
      }
    }
  }
}

const useChessGame = (name1, name2, timer = 600) => {
  const [thisGame, setThisGame] = useState(() => {
    const game = new Game(name1, name2, timer);
    game.initBoard();
    return game;
  });

  const [board, setBoard] = useState(thisGame.board);
  const [currentPlayer, setCurrentPlayer] = useState(thisGame.currentPlayer);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [movesHistory, setMovesHistory] = useState(thisGame.MovesHistory);
  const [fullMove, setFullMove] = useState(1);
  const [player1, setPlayer1] = useState(thisGame.Player1);
  const [player2, setPlayer2] = useState(thisGame.Player2);
  const [previousBoards, setPreviousBoards] = useState([]);
  const [redoBoards, setRedoBoards] = useState([]);
  const [winner, setWinner] = useState(null);
  const [engine, setEngine] = useState(new StockfishService());

  const capture = (takenPiece, setPlayer1, setPlayer2, currentPlayer) => {
    if (currentPlayer.color === "black") {
      setPlayer2(prev => ({
        ...prev,
        takeOvers: [...prev.takeOvers, takenPiece],
        score: prev.score + takenPiece.value
      }));
      setPlayer1(prev => ({ ...prev, score: prev.score - takenPiece.value }));
    } else {
      setPlayer1(prev => ({
        ...prev,
        takeOvers: [...prev.takeOvers, takenPiece],
        score: prev.score + takenPiece.value
      }));
      setPlayer2(prev => ({ ...prev, score: prev.score - takenPiece.value }));
    }
  };

  const makeAMove = (x, y, piece, id = "", gameId = "", socket = "", mode = "", me = "") => {
    let takenPiece = board[y][x];
    let nextMove = {
      sourceSquareY: piece.current_pos_x,
      sourceSquareX: piece.current_pos_y,
      destinationSquareY: x,
      destinationSquareX: y
    };

    if (piece.color === "white") {
      setFullMove(prev => prev + 1);
    }

    let newBoard = [...board];
    let move = "move";

    if (takenPiece != null) {
      capture(takenPiece, setPlayer1, setPlayer2, currentPlayer);
      move = "capture";
    }

    if (piece.name === "king" && Math.abs(piece.current_pos_x - x) === 2) {
      let rook;
      switch (x) {
        case 2:
          rook = board[y][0];
          break;
        case 6:
          rook = board[y][7];
          break;
      }
      newBoard[y][x === 2 ? 3 : 5] = rook;
      newBoard[y][x === 2 ? 0 : 7] = null;
      rook.setCurrentPos(x === 2 ? 3 : 5, y);
      move = "castle";
    }

    if (movesHistory.length > 0) {
      let lastMove = movesHistory[movesHistory.length - 1];
      if (piece.name === "pawn" && piece.current_pos_x !== x && takenPiece == null) {
        capture(board[lastMove.newPos[1]][lastMove.newPos[0]], setPlayer1, setPlayer2, currentPlayer);
        newBoard[lastMove.newPos[1]][lastMove.newPos[0]] = null;
        move = "capture";
      }
    }

    let color = currentPlayer.color === "black" ? "white" : "black";
    setMovesHistory(prev => ([...prev, { piece: piece.name, prevPos: [piece.current_pos_x, piece.current_pos_y], newPos: [x, y], takeOver: board[y][x] }]));
    newBoard[piece.current_pos_y][piece.current_pos_x] = null;
    piece.setCurrentPos(x, y);
    newBoard[y][x] = piece;

    if (isCheck(newBoard, color, movesHistory)) {
      move = "check";
    }

    if (mode === "online" && me === currentPlayer.color) {
      socket.emit("movePiece", {
        id: id,
        color: color,
        newboard: newBoard,
        gameId: gameId,
        movesHistory: [...movesHistory, { piece: piece.name, prevPos: [piece.current_pos_x, piece.current_pos_y], newPos: [x, y], takeOver: board[y][x] }],
        nextMove: nextMove,
        move: move
      });
    }

    setBoard(newBoard);
    setPossibleMoves([]);
    setPreviousBoards(prev => [...prev, board]);
    setRedoBoards([]);
    if (isGameOver(newBoard, currentPlayer.color === player1.color ? player2 : player1, movesHistory, player1, player2)) {
      setGameOver(true);
      if(isStalemate(newBoard, currentPlayer.color === player1.color ? player2 : player1, movesHistory)){
         setWinner(null);
      }
    else{
      setWinner(currentPlayer.color === player1.color ? player2 : player1);
        }
      sounds.end.play();
    }
    setCurrentPlayer(currentPlayer.color === player1.color ? player2 : player1);
    sounds[move].play();
  };

  const undoMove = () => {
    if (previousBoards.length > 0) {
      const lastBoard = previousBoards[previousBoards.length - 1];
      setRedoBoards(prev => [board, ...prev]);
      setBoard(lastBoard);
      setPreviousBoards(prev => prev.slice(0, -1));
      setMovesHistory(prev => prev.slice(0, -1));
      setCurrentPlayer(currentPlayer.color === player1.color ? player2 : player1);
    }
  };

  const redoMove = () => {
    if (redoBoards.length > 0) {
      const nextBoard = redoBoards[0];
      setPreviousBoards(prev => [...prev, board]);
      setBoard(nextBoard);
      setRedoBoards(prev => prev.slice(1));
      setMovesHistory(prev => [...prev, nextBoard]);
      setCurrentPlayer(currentPlayer.color === player1.color ? player2 : player1);
    }
  };
  const setEngineSkillLevel = (skillLevel) => {
    engine.setSkillLevel(skillLevel);
  };

  const getEngineMove = async () => {
    const fen = FenConverter(board, currentPlayer.color, movesHistory, fullMove);
    const bestMove = await engine.getBestMove(fen);
    return bestMove;
  };



  return {
    board,
    currentPlayer,
    selectedPiece,
    gameOver,
    possibleMoves,
    movesHistory,
    fullMove,
    player1,
    player2,
    winner,
    setSelectedPiece,
    makeAMove,
    undoMove,
    redoMove,
    setBoard,
    setCurrentPlayer,
    setGameOver,
    setPossibleMoves,
    setMovesHistory,
    setFullMove,
    setPlayer1,
    setPlayer2,
    setEngineSkillLevel,
    getEngineMove
  };
};

export default useChessGame;