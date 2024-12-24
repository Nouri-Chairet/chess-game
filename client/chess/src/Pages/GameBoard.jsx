import { useContext ,useEffect} from 'react';
import Navbar from '../components/navbar.jsx';
import './App.css';
import PlayerStats from '../components/playerStats.jsx';
import Table from '../components/table.jsx';
import WinnerModal from '../components/EndGame.jsx';
import StarsCanvas from '../Home/Stars.jsx';
import { ModeContext } from '../main.jsx';
import useChessGame from '../hooks/useChessGame';

function GameBoard() {
  const { mode } = useContext(ModeContext);
  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const player1Name = decodedToken ? decodedToken.username : "player1";
  const player2Name = mode==="1 vs Computer"?"AI":"player 2" ;

  const {
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
  } = useChessGame(player1Name, player2Name);
    useEffect(() => {
    setEngineSkillLevel(1);
  }, []);
  const handleCloseModal = () => {
    setGameOver(false);
    const game = new Game("player1", "player2");
    game.initBoard();
    setBoard(game.board);
    setPlayer1(game.Player1);
    setPlayer2(game.Player2);
    setMovesHistory(game.MovesHistory);
    setCurrentPlayer(game.currentPlayer);
  };

  return (
    <>
      <div style={{ position: 'absolute', height: '100vh', width: '100vw', zIndex: '0' }}>
        <StarsCanvas number={10600} />
      </div>
      <div className='container'>
        <div className="players-stats">
          <PlayerStats player={player1} setPlayer={setPlayer1} active={currentPlayer.color === player2.color} setGameOver={setGameOver} />
          <PlayerStats player={player2} setPlayer={setPlayer2} active={currentPlayer.color === player1.color} setGameOver={setGameOver} />
        </div>
        <WinnerModal
          isOpen={gameOver}
          winner={winner ? winner.name : "Draw"}
          onClose={handleCloseModal}
        />
        <Table
          board={board}
          setBoard={setBoard}
          player1={player1}
          player2={player2}
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
          movesHistory={movesHistory}
          setMovesHistory={setMovesHistory}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          setGameOver={setGameOver}
          mode={mode}
          selectedPiece={selectedPiece}
          setSelectedPiece={setSelectedPiece}
          possibleMoves={possibleMoves}
          setPossibleMoves={setPossibleMoves}
          makeAMove={makeAMove}
          fullMove={fullMove}
          getEngineMove={getEngineMove}
        />
        <div className="undo-redo" style={{ backgroundColor: 'white', width: '200px', height: '200px', position: 'absolute', right: '30px', top: '100px' }}>
          <button onClick={undoMove}>Undo</button>
          <button onClick={redoMove}>Redo</button>
        </div>
      </div>
    </>
  );
}

export default GameBoard;