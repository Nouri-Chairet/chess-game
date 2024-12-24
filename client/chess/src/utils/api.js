import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust this URL according to your setup

export const registerUser = async (username,email, password) => {
    const response = await axios.post(`${API_URL}/register`, { username,email, password });
    return response.data; 
};

export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; 
};
export const updateGameState = async (gameId, board, currentPlayer, movesHistory) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/games/${gameId}`, {
        board,
        currentPlayer,
        movesHistory
      });
      console.log('Game state updated:', response.data);
    } catch (error) {
      console.error('Error updating game state:', error);
    }
  };
  