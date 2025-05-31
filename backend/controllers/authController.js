const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { mailTransporter } = require('../utills/mailTransporter');

exports.register = async (req, res) => {
  try {
    const data= req.body;
    if(!data.username||!data.password||!data.email)  //if bypassed the frontend
    return res.status(422).json({message:"Please provide all details"})
   
    // Check if user already exists
     let existingUser = await User.findOne({
       $or: [{ email: data.email }, { username: data.username }],
     });
 
     if (existingUser) {
       const field = existingUser.email === data.email ? "email" : "username";
       return res
         .status(409)
         .json({ message: `This ${field} is already registered` });
     }
     

// Hash password
       const hashPassword = await bcrypt.hash(data.password, 10);
          data.password = hashPassword;
          let newUser = new User(data);
          await newUser.save();
          const newToken = jwt.sign({ UserID: newUser._id }, process.env.secret_key, {expiresIn: "24h"});
          res
            .status(201)
            .cookie("sessionToken", newToken, { maxAge: 24 * 60 * 60 * 1000 })
            .json({
              message: "User created successfully!",
              userID: newUser._id,
              username: newUser.username,
            }); 
        } catch (error) {
          console.error("Signup error:", error);
          res.status(500).json({ message: "Server error during registration" });
        }
};

exports.login = async (req, res) => {
  try{
      const token = req.cookies.sessionToken;
      if (token) {
        try {
          jwt.verify(token, process.env.secret_key);
          return res.status(400).json({
            message: "You are already logged in.",
          });
        } catch (err) { 
          // Token is invalid or expired, continue with login
          res.clearCookie("sessionToken");
        }
      }
      let data = req.body;
      let user = await User.findOne({ email: data.email });
  
      if (user && (await bcrypt.compare(data.password, user.password))) {
        let maximumAge=data.remember?7*24 * 60 * 60 * 1000:24 * 60 * 60 * 1000;
        const newToken = jwt.sign({ UserID: user._id }, process.env.secret_key, {
          expiresIn: maximumAge,
        });
        return res.status(200)
              .cookie("sessionToken", newToken, { 
                  maxAge: maximumAge,
                  httpOnly: true,
                  secure: true,     
                  sameSite: 'none',  
                  path: '/'
                }).json({
                    message: `Welcome ${user.username}`,
                    userID: user._id,
                    username: user.username,
                  });
      }
      res.status(409).json({
        message: "User Does not exist or wrong credentials provide",
      });
    }catch(error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login" });
    }
};

exports.logout= (req, res) => {
  try {
   
    res
      .clearCookie("sessionToken", {
        httpOnly: true,
      })
      .json({
        message: "Logged out successfully",
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
exports.updateProfile= async (req, res) => {
  data = req.body;
  console.log(data);
  const user = await User.findById(data.userID);
  if (!user || !(await bcrypt.compare(data.oldPassword, user.password))) {
    return res.status(404).json({ message: "User not found" });
  } else {
    user.username = data.username;
    user.email = data.email;
    user.password = await bcrypt.hash(data.newPassword, 10);
    await user.save();
    res.status(200).json({ message: "Profile Updated Successfully" });
  }
}

exports.getProfile=async (req, res) => {
  const user = req.user.userID; // as loggin middleware assigned the user to req 
  console.log(user);
    res.status(200).json({
      username: user.username, 
      email: user.email,
   
  })
}
exports.verifyEmail = async (req, res) => {
   try{ 
      const { email } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
   const mailOptions = {
     from: process.env.email_username,
     to: email,
     subject: "Verification of email",
     html: `<p>Here is the otp to verify your email</p>
           <p>OTP: ${otp}</p> `}
   await mailTransporter.sendMail(mailOptions);
   res.status(200).json({OTP:otp})
   }catch (error) {
   console.error(error);
   res.status(500).json({ message: "Error in verify email" });
 }
 }

exports.getLeaderboard= async (req, res) => {
  try {
    const topUsers = await User.find({ role: 'user' })
      .sort({ totalScore: -1 })
      .limit(10)
      .select('username totalScore');

    // Find the rank of the current user
    const allUsersSorted = await User.find({ role: 'user' })
      .sort({ totalScore: -1 })
      .select('_id');

    const userRank = allUsersSorted.findIndex(u => u._id.toString() === req.user._id.toString()) + 1;
    let currentUser=null
if(!userRank<=10)
{
  currentUser = await User.findById(req.user._id).select('username totalScore');
  currentUser = { ...currentUser.toObject(), rank: userRank };
}
    
    res.status(200).json({toppers:topUsers,activeUser: currentUser });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};