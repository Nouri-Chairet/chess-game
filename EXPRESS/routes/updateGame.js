const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const mongoose = require('mongoose');

router.patch('/:id', async (req, res) => {
    let { id } = req.params;
    id = id.trim();

    const { board, currentPlayer, movesHistory } = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid game ID format' });
    }

    try {
        // Find the game by ID
        const game = await Game.findById(id);

        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        // Update the game fields
        if (board) game.board = board;
        if (currentPlayer) game.currentPlayer = currentPlayer;
        if (movesHistory) game.movesHistory = movesHistory;

        // Save the updated game
        const updatedGame = await game.save();

        console.log('Updated game:', updatedGame);
        res.status(200).json(updatedGame); // Send the updated game back to the client
    } catch (error) {
        console.error('Error during patching:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
