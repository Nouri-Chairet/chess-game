import { useState, useEffect } from 'react';
import { Game } from '../utilities/game.js';
import './App.css';
import socket from '../utils/socket.js';
import OnlineParty from './OnlineParty.jsx';
import Loading from '../components/Loading.jsx';
import { updateGameState } from '../utils/api.js';

function OnlineMode() {
    const [thisGame, setThisGame] = useState(null);
    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [movesHistory, setMovesHistory] = useState([]);
    const [activePlayer, setActivePlayer] = useState(null);
    const [GameOver, setGameOver] = useState(false); 
    const [gameId, setGameId] = useState(null);
    const [isMatched, setIsMatched] = useState(false);
    const [id, setId] = useState(null);
    const [me, setMe] = useState(null);

    useEffect(() => {
        socket.on("color", (color) => {
                setMe(color);
        });
     
        socket.emit("joinGame");
        
        const handleGameStart = (gameData) => {
                try {
                        setId(gameData.id);
                        setGameId(gameData.gameId);
                        console.log(gameData);
                        const game = new Game(gameData.players[0].name, gameData.players[1].name);
                        game.initBoard();
                        setThisGame(game);
                        setBoard(game.board);
                        setPlayer1(game.Player1);
                        setPlayer2(game.Player2);
                        setMovesHistory(game.MovesHistory);
                        setActivePlayer(game.currentPlayer);
                        setIsMatched(true);

                        updateGameState(gameData.id, game.board, "white", game.MovesHistory);
                } catch (error) {
                        console.error('Error starting game:', error);
                }
        };
        
        socket.on("gameStart", handleGameStart);
        return () => {
            socket.off("color");
            socket.off("gameStart", handleGameStart);
        };    
        
  }, []);
    
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (thisGame && board && player1 && player2 && activePlayer) {
            setDataLoaded(true);
        }
    }, [thisGame, board, player1, player2, activePlayer]);
    console.log(dataLoaded)
    console.log(isMatched)
    return (
        <>
            {
                !isMatched || !dataLoaded ? <Loading /> :
                <OnlineParty
                    me={me}
                    board={board} setBoard={setBoard}
                    Player1={player1} Player2={player2}
                    MovesHistory={movesHistory} setMovesHistory={setMovesHistory}
                    setPlayer1={setPlayer1} setPlayer2={setPlayer2}
                    currentPlayer={activePlayer} setCurrentPlayer={setActivePlayer} 
                    setGameOver={setGameOver} gameOver={GameOver}
                    id={id} gameId={gameId}
                    socket={socket}
                />
            }
        </>
    );
}

export default OnlineMode;
