require("dotenv").config();
const mongoose=require("mongoose") ;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_atlas_url);
    console.log(" Connected to  MongoDB");

  } catch (err) {
    console.error("  DB connection error:", err);
    process.exit(1);
  }
};

module.exports= connectDB;
