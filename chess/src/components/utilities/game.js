import {isCheckMate, isStalemate} from './refere.js';
import { exist } from './utility.js';
import Piece from '../utilities/piece.js';

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
    constructor(color,name){
      this.takeOvers=[];
      this.timer=600;
      this.name=name;
      this.color=color;
    }
    takeOver(piece){
      this.takeOvers.push(piece);
    }
  }
 export class Game {
    constructor(name1,name2) {
        this.MovesHistory=[];
        this.board = [];
        this.Player1 = new Player("white", name1);
        this.Player2 = new Player("black", name2);
        this.currentPlayer = this.Player1;
        this.winner = null;
        this.stalemate = false;
    }
    initBoard() {
        let pawns =[];
          for (let i=0;i<8;i++)     
        {
        pawns.push(new Piece('white', i, 6,  w_pawn, 'pawn'));
               }
        const white = [     
         ...pawns,
          new Piece('white', 2, 7,  w_bishop, 'bishop'),
          new Piece('white', 5, 7,  w_bishop, 'bishop'),
          new Piece('white', 0, 7,  w_rock, 'rook'),
          new Piece('white', 7, 7,  w_rock, 'rook'),
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
    new Piece('black', 0, 0, b_rock, 'rook'),
    new Piece('black', 7, 0, b_rock, 'rook'),
    new Piece('black', 1, 0, b_knight, 'knight'),
    new Piece('black', 6, 0, b_knight, 'knight'),
    new Piece('black', 4, 0, b_king, 'king'),
    new Piece('black', 3, 0, b_queen, 'queen'),
        ];
        for (let i = 0; i < 8; i++) {
            this.board[i] = [];
            for (let j = 0; j < 8; j++) {
                this.board[i][j] = exist(white, black, j, i);
            }
        }
    }
    isGameOver() {
        if (isCheckMate(this.board, this.currentPlayer.color,movesHistory)) {
            this.winner = this.currentPlayer.color == "white" ? this.Player2 : this.Player1;
            return true;
        }
        if (isStalemate(this.board, this.currentPlayer,movesHistory)) {
            this.stalemate = true;
            return true;
        }
        if (this.Player1.timer == 0 || this.Player2.timer == 0) {
            this.winner = this.Player1.timer == 0 ? this.Player2 : this.Player1;
            return true;
        }
        return false;
    }
    // makeAMove(x, y, piece) {
    //     if (this.board[y][x] != null) {
    //         this.currentPlayer.color == "black" ? this.Player2.takeOver(this.board[y][x]) : this.Player1.takeOver(this.board[y][x]);
    //     }
    //     let newBoard = this.board;
    //     newBoard[piece.current_pos_y][piece.current_pos_x] = null;
    //     piece.setCurrentPos(x, y);
    //     newBoard[y][x] = piece;
    //     this.board = newBoard;
    //     this.currentPlayer = this.currentPlayer.color == "white" ? this.Player2 : this.Player1;
    // }
}
