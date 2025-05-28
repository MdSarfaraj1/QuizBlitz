require("dotenv").config();
const express=require('express');
const mongoose=require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app=express();
const AdminRouter=require("./routers/Admin");
const QuizRouter=require("./routers/Quiz");
const UserAuthRouter=require("./routers/Authentication");
const ResetPassword =require("./routers/forgetPassword")
const connectDB = require("./configure/database");
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: true
}));
app.use(cookieParser()); 

//Routes
app.use("/Admin",AdminRouter);
app.use("/Quiz",QuizRouter);
app.use("/UserAuth",UserAuthRouter);
app.use("/resetPassword", ResetPassword);


// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.port, () => {
      console.log(`Server running on port ${process.env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};
startServer();