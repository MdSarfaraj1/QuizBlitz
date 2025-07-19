require("dotenv").config();
const express = require('express');
const getQuizSet = require("./utills/getQuizSet");
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
  socket.on("create-room", async ({ categoryId, difficulty, userId,numberOfQuestions ,image,quizId,username}) => {
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
      users: [{ id: userId, name:username,socketId: socket.id }],
      quizData,
      scores: { [userId]: 0 },
    };
console.log("current status of rooms",rooms)
    socket.emit("room-created", { roomId });
  });

socket.on("join-room", ({ roomId, userId,username }) => {
  const room = rooms[roomId];
  if (room && room.users.length < 2) {
    socket.join(roomId);
     const user = { id: userId, name: username || "Player", socketId: socket.id }
    room.users.push( user );
    room.scores[userId] = 0;

    console.log("current status of rooms after joining", rooms);
    io.to(roomId).emit("start-game", room.quizData);
  } else {
    socket.emit("room-error", { message: "Room full or not found" });
  }
});

  socket.on("submit-answer", ({ roomId, socketId, isCorrect }) => {
    if (rooms[roomId] && isCorrect) {
      rooms[roomId].scores[socketId]++;
    }
    io.to(roomId).emit("score-update", {
      scores: rooms[roomId]?.scores || {},
    });
  });

socket.on("disconnect", () => {
  // Find and remove user from any room
  for (const [roomId, room] of Object.entries(rooms)) {
    const idx = room.users.findIndex(u => u.socketId === socket.id);
    if (idx !== -1) {
      room.users.splice(idx, 1);
      io.to(roomId).emit("room-users", room.users);
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
