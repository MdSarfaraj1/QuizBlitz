require("dotenv").config();
const express = require('express');
const getQuizSet = require("./utills/getQuizSet");
const User = require("./models/User");
const { nanoid } = require('nanoid');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http"); // ✅ required for socket.io 
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // ✅ create HTTP server
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

// Import routers
const AdminRouter = require("./routers/Admin"); 
const QuizRouter = require("./routers/Quiz");
const UserAuthRouter = require("./routers/Authentication");
const ResetPassword = require("./routers/forgetPassword");
const Acheivement = require("./routers/Achievements");

// Middleware
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: true
}));
app.use(cookieParser());

// Routes
app.use("/Admin", AdminRouter);
app.use("/Quiz", QuizRouter);
app.use("/User", UserAuthRouter);
app.use("/resetPassword", ResetPassword);
app.use("/Acheivement", Acheivement);

// Connect to MongoDB and start the server
const connectDB = require("./configure/database");
const QuizSet = require("./models/QuizSet");

const rooms = {}; // For storing multiplayer rooms

io.on("connection", (socket) => {
  socket.on("create-room", async ({ categoryId, difficulty, userId,numberOfQuestions ,image,quizId,username,profilePicture}) => {
   const roomId = nanoid(6).toUpperCase();
   let  quizData
    socket.join(roomId);
    if(quizId!==""){
      console.log("predefined quizzes")
        const quizzes = await QuizSet.findById(quizId).populate('questions').populate('category');
        quizData={ questions: quizzes.questions,Id:quizId,category:quizzes.category.title,difficulty:quizzes.difficulty}
    }else{
       console.log("new generated quizzes quizzes")
        quizData = await getQuizSet({
      categoryId,
      difficulty,
      numberOfQuestions,
      userId,
      image,
    });

    }
   
    rooms[roomId] = {
      players: [{ id: userId, name:username,socketId: socket.id ,avatar: profilePicture}],
      quizData,
      scores: { [userId]: 0 },
    };
console.log("current status of rooms",rooms)
    socket.emit("room-created", { roomId });
  });

socket.on("join-room", async ({ roomId, userId ,profilePicture,username}) => {
  const room = rooms[roomId];
  if (!room || room.players.length >= 2) {
    return socket.emit("room-error", { message: "Room full or not found" });
  }

  try {
socket.join(roomId);
    const user = {
      id: userId,
      name:username || "Player",
      avatar: profilePicture ,
      socketId: socket.id
    };

    room.players.push(user);
    room.scores[userId] = 0;

    console.log("current status of rooms after joining", rooms);

    io.to(roomId).emit("start-game", {
      quizData: room.quizData,
      players: room.players,
      scores: room.scores
    });
  } catch (error) {
    console.error("Join-room DB error:", error);
    socket.emit("room-error", { message: "Server error" });
  }
});
socket.on('player-submitted', ({ roomId, userId, score, answers, timeSpent }) => {
  const room = rooms[roomId];
  if (!room) 
  {
      console.log("user submiting quiz i room:",roomId);
    return
  }
  

const player = room.players.find(p => p.id === userId);
  if (player) {
    player.completed = true;
    player.score = score;
    player.answers = answers;
    player.timeSpent = timeSpent;
  }
console.log("Player submitted answers:", {
    userId,
    score,
    answers,
    timeSpent
  });
  // Notify all clients in the room about updated players
  io.to(roomId).emit('player-updated', { players: room.players });
const allSubmitted = room.players.every(p => p.completed);
  if (allSubmitted) {
    io.to(roomId).emit('all-submitted', {
      players: room.players  
    });
  }

})
socket.on("disconnect", () => {
  // Find and remove user from any room
  for (const [roomId, room] of Object.entries(rooms)) {
    const idx = room.players.findIndex(u => u.socketId === socket.id);
    if (idx !== -1) {
      room.players.splice(idx, 1);
      io.to(roomId).emit("room-players", room.players);
      // Optionally: clean up empty rooms
    }
  }
});
});

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    server.listen(process.env.port, () => {
      console.log(`Server running with Socket.IO on port ${process.env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
