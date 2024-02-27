import { useState } from 'react';
import Navbar from './components/navbar.jsx';
import './App.css';
import Table from './components/table.jsx';
import Piece from './components/utilities/piece.js';

import b_bishop from './components/assets/black_bishop.svg';
import b_pawn from './components/assets/black_pawn.svg';
import b_rock from './components/assets/black_rock.svg';
import b_king from './components/assets/black_king.svg';
import b_queen from './components/assets/black_queen.svg';
import b_knight from './components/assets/black_knight.svg';

import w_bishop from './components/assets/white_bishop.svg';
import w_rock from './components/assets/white_rock.svg';
import w_king from './components/assets/white_king.svg';
import w_queen from './components/assets/white_queen.svg';
import w_knight from './components/assets/white_knight.svg';
import w_pawn from './components/assets/white_pawn.svg';


let pawns =[];
for (let i=0;i<8;i++)
{
    pawns.push(new Piece('white', i, 6,  w_pawn, 'pawn'));
}
const white = [
    ...pawns,
    new Piece('white', 2, 7,  w_bishop, 'bishop'),
    new Piece('white', 5, 7,  w_bishop, 'bishop'),
    new Piece('white', 0, 7,  w_rock, 'rock'),
    new Piece('white', 7, 7,  w_rock, 'rock'),
    new Piece('white', 1, 7,  w_knight, 'knight'),
    new Piece('white', 6, 7, w_knight, 'knight'),
    new Piece('white', 4, 7,  w_king, 'king'),
    new Piece('white', 3, 7,  w_queen, 'queen'),
];
let pawns_b =[];
for (let i=0;i<8;i++)
{
    pawns_b.push(new Piece('black', i, 1, b_pawn, 'pawn'));
}
const black = [
    ...pawns_b,
    new Piece('black', 2, 0, b_bishop, 'bishop'),
    new Piece('black', 5, 0, b_bishop, 'bishop'),
    new Piece('black', 0, 0, b_rock, 'rock'),
    new Piece('black', 7, 0, b_rock, 'rock'),
    new Piece('black', 1, 0, b_knight, 'knight'),
    new Piece('black', 6, 0, b_knight, 'knight'),
    new Piece('black', 4, 0, b_king, 'king'),
    new Piece('black', 3, 0, b_queen, 'queen'),
];
class Player {
  constructor(color,name,Pieces){
          this.takeOvers=[];
          this.timer=10;
          this.name=name;
          this.color=color;
          this.pieces=Pieces;
  }
  takeOver(piece){
          this.takeOvers.push(piece);
  }
}
let Player1 = new Player("white","player1",white);
let Player2 = new Player("black","player2",black);
function App() {
  return (
    <>
      <Navbar/>
      <Table Piece={Piece} white={white} black={black} Player1={Player1} Player2={Player2} />
    </>
  )
}

export default App
