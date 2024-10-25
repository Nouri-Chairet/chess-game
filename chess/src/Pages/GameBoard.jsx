import { useState, useEffect } from 'react';
import { Game } from '../utilities/game.js';
import Navbar from '../components/navbar.jsx';
import './App.css';
import PlayerStats from '../components/playerStats.jsx';
import Table from '../components/table.jsx';
import WinnerModal from '../components/EndGame.jsx';
import StarsCanvas from '../Home/Stars.jsx';
function GameBoard() {
  const [thisGame, setThisGame] = useState(() => {
    const game = new Game("player1", "player2");
    game.initBoard();
    return game;
  });

  const [board, setBoard] = useState(thisGame.board);
  const [player1, setPlayer1] = useState(thisGame.Player1);
  const [player2, setPlayer2] = useState(thisGame.Player2);
  const [movesHistory, setMovesHistory] = useState(thisGame.MovesHistory);
  const [activePlayer, setActivePlayer] = useState(thisGame.currentPlayer);
  const [GameOver, setGameOver] = useState(false);
  const [ComputerMode,setComputerMode]=useState(true)
 

  const handleCloseModal = () => {
    setGameOver(false);
    setThisGame(()=>{
       const game = new Game("player1", "player2");
    game.initBoard();
    return game;
  })
    setBoard(thisGame.board);
    setPlayer1(thisGame.Player1);
    setPlayer2(thisGame.Player2);
    setMovesHistory(thisGame.MovesHistory);
    setActivePlayer(thisGame.currentPlayer);

};
  return (
    <>
      <div style={{ position: 'absolute', height: '100vh', width: '100vw',zIndex:'0' }}>
        <StarsCanvas number={10600} />
      </div>
      {/* <Navbar setComputerMode={setComputerMode}/> */}
      <div className='container'>
        <div className="players-stats">
          <PlayerStats player={player1} setPlayer={setPlayer1} active={activePlayer.color === player2.color }setGameOver={setGameOver} />
          <PlayerStats player={player2} setPlayer={setPlayer2} active={activePlayer.color === player1.color}setGameOver={setGameOver} />
        </div>
          <WinnerModal
          isOpen={GameOver}
          winner={"nouri"}
          onClose={handleCloseModal}
         />
      
          <Table 
            board={board} setBoard={setBoard}
            Player1={player1} Player2={player2}
            MovesHistory={movesHistory} setMovesHistory={setMovesHistory}
            setPlayer1={setPlayer1} setPlayer2={setPlayer2}
            currentPlayer={activePlayer} setCurrentPlayer={setActivePlayer} 
            setGameOver={setGameOver}
            ComputerMode={ComputerMode}
          />
       
      </div>
    </>
  );
}

export default GameBoard;
