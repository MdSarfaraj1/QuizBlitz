require("dotenv").config();
const express=require('express');
const mongoose=require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app=express();
const AdminRouter=require("./routers/Admin");
const QuizRouter=require("./routers/Quiz");
const UserAuthRouter=require("./routers/Authentication");
const connectDB = require("./configure/database");
// const path=require("path");
// const ejsMate=require("ejs-mate");
// const methodOverride=require("method-override");//It tricks Express into treating a POST request as a PUT or DELETE


// app.set('views',path.join(__dirname,'views'));
// app.set('view engine','ejs');
// app.engine("ejs",ejsMate); // ejs mate supports layouts

// app.use(express.urlencoded({extended:true}));// helps read form data sent by the user in a POST request.
// app.use(express.static(path.join(__dirname, "public")));;
// app.use(methodOverride("_method"));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: true
}));
app.use(cookieParser()); // turns raw string of the request to javascript ob

//Routes
app.use("/Admin",AdminRouter);
app.use("/Quiz",QuizRouter);
app.use("/UserAuth",UserAuthRouter);


// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};
startServer();