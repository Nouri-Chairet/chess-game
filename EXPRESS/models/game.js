const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const pieceSchema = new Schema({
  color: { type: String, enum: ['white', 'black'], required: true },
  current_pos_x: { type: Number, required: true }, // Position on the board
  current_pos_y: { type: Number, required: true },
  image: { type: String, required: true },          // SVG image URL
  name: { type: String, required: true },           // e.g., 'pawn', 'rook', etc.
  value: { type: Number, required: true }           // Chess piece point value
});

const playerSchema = new Schema({
  color: { type: String, enum: ['white', 'black'], required: true },
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
  takeOvers: { type: [pieceSchema], default: [] },  // Pieces taken by the player
  timer: { type: Number, default: 600 }             // Timer in seconds, default 10 minutes
});

// Adjust the board to allow for null values
const gameSchema = new Schema({
  gameId: { type: String, required: true },           // Unique game ID
  players: { type: [playerSchema], required: true },  // Array of two players
  board: { type: [[Schema.Types.Mixed]], default: [[]] },   // 2D array that can contain Piece objects or null
  MovesHistory: { type: [String], default: [] },      // Stores each move in algebraic notation or a similar format
  currentPlayer: { type: String, enum: ['white', 'black'], required: true }, // Current player
  winner: { type: String, enum: ['white', 'black', null], default: null },   // Stores winner if game ends
  stalemate: { type: Boolean, default: false },       // Stalemate flag
  status: { type: String, default: 'active' }         // Game status, e.g., 'active', 'finished'
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
