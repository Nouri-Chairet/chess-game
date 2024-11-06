import { io } from "socket.io-client";


const token = localStorage.getItem("token");
const socket = io("http://localhost:5000/", {
  auth: {
    token: token, // Attach the JWT token here
  },
  transports: ['websocket'], // Ensure WebSocket transport is used
});
socket.connect();
socket.on("connect", () => {
  console.log("Connected to server");
});


export default socket;
