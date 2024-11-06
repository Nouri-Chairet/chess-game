import React from 'react'
import PlayerStats from '../components/playerStats.jsx';
import Table from '../components/table.jsx';
import WinnerModal from '../components/EndGame.jsx';
import StarsCanvas from '../Home/Stars.jsx';

const OnlineParty = ({me,board,setBoard,Player1,Player2,setPlayer1,setPlayer2,MovesHistory,setMovesHistory,currentPlayer,setCurrentPlayer,setGameOver,gameOver,id,gameId,socket}) => {
  



    return (
    <>
            <div style={{ position: 'absolute', height: '100vh', width: '100vw',zIndex:'0' }}>
        <StarsCanvas number={10600} />
      </div>
      <div className='container'>
        <div className="players-stats">
          <PlayerStats player={Player1} setPlayer={setPlayer1} active={currentPlayer.color === Player2.color }setGameOver={setGameOver} />
          <PlayerStats player={Player2} setPlayer={setPlayer2} active={currentPlayer.color === Player1.color}setGameOver={setGameOver} />
        </div>
          <WinnerModal
          isOpen={gameOver}
          winner={"nouri"}
         />
          <Table 
            me={me}
            board={board} setBoard={setBoard}
            Player1={Player1} Player2={Player2}
            MovesHistory={MovesHistory} setMovesHistory={setMovesHistory}
            setPlayer1={setPlayer1} setPlayer2={setPlayer2}
            currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} 
            setGameOver={setGameOver}
            mode={"online"}
            id={id} gameId={gameId}
            socket={socket}
        
          />
    </div>
    </>
  )
}

export default OnlineParty
