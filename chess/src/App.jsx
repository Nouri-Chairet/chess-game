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
  useEffect(()=>{

  })

  return (
    <>
      <Navbar />
      <div className='container'>

      <div className="players-stats">
      <PlayerStats name={thisGame.Player1.name} takeOvers={thisGame.Player1.takeOvers} active={thisGame.Player1.active} />
      <PlayerStats name={thisGame.Player2.name} takeOvers={thisGame.Player2.takeOvers} active={thisGame.Player2.active} />
      </div>               
      <Table  board={board} setBoard={setBoard} Player1={thisGame.Player1} Player2={thisGame.Player2} MovesHistory={thisGame.MovesHistory}  />
      </div>
    </>
  )
}

export default App
