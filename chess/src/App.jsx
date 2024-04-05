import { useState ,useEffect } from 'react';
import { Game } from './components/utilities/game.js';
import Navbar from './components/navbar.jsx';
import './App.css';
import PlayerStats from './components/playerStats.jsx';
import Table from './components/table.jsx';


function App() {
  
  let [thisGame,setThisGame]=useState(new Game("player1","player2"));
  thisGame.initBoard();
  let [ board, setBoard] =useState(thisGame.board);
  let [player1,setPlayer1]=useState(thisGame.Player1);
  let [player2,setPlayer2]=useState(thisGame.Player2);
  let [movesHistory,setMovesHistory]=useState(thisGame.MovesHistory);
  let [activePlayer,setActivePlayer]=useState(thisGame.currentPlayer);
  useEffect(()=>{

  },[])
  
  return (
    <>
      <Navbar />
      <div className='container'>

      <div className="players-stats">
      <PlayerStats player={player1} setPlayer={setPlayer1} active={activePlayer.color==player1.color} />
      <PlayerStats player={player2} setPlayer={setPlayer2} active={activePlayer.color==player2.color}/>
      </div>               
      <Table 
       board={board} setBoard={setBoard}
       Player1={player1} Player2={player2}
       MovesHistory={movesHistory} setMovesHistory={setMovesHistory}
       setPlayer1={setPlayer1} setPlayer2={setPlayer2}
       currentPlayer={activePlayer} setCurrentPlayer={setActivePlayer} 
      />
      </div>
    </>
  )
}

export default App
