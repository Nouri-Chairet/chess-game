const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Ensure you import `jsonwebtoken`
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const Game = require('./models/game');
const User = require('./models/user'); // Ensure you import the User model
const authRoutes = require('./routes/auth');
const registerRoutes = require('./routes/register');
const authenticate = require('./middleware/authenticate');
const updateGameRoutes = require('./routes/updateGame');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB", error));

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/games', updateGameRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/register', registerRoutes);
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

// Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
    credentials: true
  }
});

let waitingPlayers = [];
const waitingSocket = [];
io.on('connection', async (socket) => {
  const token = socket.handshake.auth.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      socket.disconnect();
      return;
    }

    console.log(`User connected: ${user.username}, Socket ID: ${socket.id}`);
    socket.userId = userId;
    socket.username = user.username;
   

    socket.on('joinGame', async () => {
      if ([...new Set(waitingPlayers)].length <2) {
        const existingUser = waitingPlayers.find(user => user.id === socket.id);
        if (!existingUser) {
          waitingPlayers.push({ id: socket.id, name: socket.username });
          waitingSocket.push(socket);
        }
        console.log("waitingPlayers :", waitingPlayers);
       
      } 
      else if ([...new Set(waitingPlayers)].length === 2) {
        console.log("saif tilit")
        const player1 = waitingSocket[0];
        const player2 = socket;
        const gameId = `game-${player1.id}-${player2.id}-${Date.now()}`;
        player1.join(gameId);
        player2.join(gameId);
        const newGame = new Game({
          gameId: gameId,
          players: [
            { color: 'white', name: waitingPlayers[0].name },
            { color: 'black', name: waitingPlayers[1].name }
          ],
          currentPlayer: 'white',
          status: 'active',
        });

        const gameData = {
          id: newGame._id,
          gameId: newGame.gameId, 
          players: [
            { color: 'white', name: waitingPlayers[0].name },
            { color: 'black', name: waitingPlayers[1].name }
          ] ,
          board: newGame.board,
        };
        waitingPlayers.length = 0;
        waitingSocket.length = 0;
        
        
        
        try {
          await newGame.save();
          player1.emit('color', 'white');
          player2.emit('color', 'black');
          player1.emit('gameStart', gameData);
          player2.emit('gameStart', gameData);
          
        } catch (error) {
          console.error('Error creating game:', error);
        }
      }
    });
    socket.on('movePiece', async (moveData) => {
      const {id, gameId, nextMove,newboard,moveHistory,color,move } = moveData;
      try {
        const game = await Game.findOne({ _id: id });
        if (!game) {
          socket.emit('error', 'Game not found');
          return;
        }
  
        game.board=newboard;
        game.currentPlayer=color;
        await game.save();
  
        socket.to(gameId).emit('recieveMove', {...nextMove, color: color,newboard:newboard,moveHistory:moveHistory,move:move});
      } catch (error) {
        console.error('Error handling movePiece:', error);
        socket.emit('error', 'An error occurred while processing the move');
      }
    });
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      waitingPlayers = waitingPlayers.filter(user => user.id !== socket.id);
    });
  } catch (error) {
    console.error('Authentication error:', error);
    socket.disconnect();
  }
});

app.get('/', (req, res) => {
  res.send("Chess game server is running!");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
