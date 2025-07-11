
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { mailTransporter } = require('../utills/mailTransporter');
const QuizSet = require("../models/QuizSet");



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
          const newToken = jwt.sign({ UserId: newUser._id }, process.env.secret_key, {expiresIn: "24h"});
          res
            .status(201)
            .cookie("sessionToken", newToken, { maxAge: 24 * 60 * 60 * 1000 })
            .json({
              message: "User created successfully!",
              userId: newUser._id,
              username: newUser.username,
              avatar: newUser.avatar,
              role:newUser.role
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
        let maximumAge=data.rememberMe?7*24 * 60 * 60 * 1000:24 * 60 * 60 * 1000;
        const newToken = jwt.sign({ UserId: user._id }, process.env.secret_key, {
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
                    userId: user._id,
                    username: user.username,
                    avatar: user.avatar,
                    role:user.role
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
   try {
    const { name, email } = req.body;
     const avatarUrl = req.file? req.file.path : req.body.avatarUrl 
console.log("from update user route",req.user._id,req.body,avatarUrl);
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        username: name,
        email,
        ...(avatarUrl && { avatar: avatarUrl }),
      },
      { new: true }
    );
    res.json({
      message: "Profile updated successfully",
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
}
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if old password matches
    console.log("updating  Password:", oldPassword,newPassword);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }
    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    // Update password in database
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ message: "Server error during password update" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData._id) 
      return res.status(404).json({ message: "User not found" });
    // Calculate averageScore
    const quizCount = await QuizSet.countDocuments({ createdBy: userData._id });
    const totalQuizzesTaken = userData.totalQuizzes;
  const averageScore = totalQuizzesTaken > 0
  ? Math.round((userData.totalScore / (totalQuizzesTaken * 10)) * 100)
  : 0;
    // Calculate rank based on totalScore
    const betterUsersCount = await User.countDocuments({ totalScore: { $gt: userData.totalScore } });
    const rank = betterUsersCount+1 ;

    res.status(200).json({
      username: userData.username,
      avatar: userData.avatar,
      totalQuizzesTaken,
      totalScore: userData.totalScore,
      averageScore,
      rank,
      email: userData.email,
      totalCreatedQuizzes:quizCount

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

exports.verifyAuthToken=(req,res)=>{
    const token = req.cookies.sessionToken;
    if (!token) {
      return res.status(401).json({message:"token not present"});
    }
    else{
      return res.status(200).json({message:"token present"})
    }
  }
const ANONYMOUS_USER_ID = process.env.ANONYMOUS_USER_ID || '60c72b2f9b1d4c001c8e4d1a'; 

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user._id is populated by your authentication middleware

    if (!userId) {
      return res.status(401).json({ message: "Authentication required: User ID not found in request." });
    }

    // 1. Find the user to get their username before deletion (optional, for logging/tracking)
    const user = req.user
    const username = user.username; // Store username for potential logging 

    // 2. Anonymize quizzes created by this user
    // Instead of deleting, we update the 'createdBy' field to the ANONYMOUS_USER_ID.
    const quizAnonymizationResult = await QuizSet.updateMany(
      { createdBy: userId },
      { $set: {createdBy: ANONYMOUS_USER_ID, }}
    );
    console.log(`Anonymized ${quizAnonymizationResult.modifiedCount} quizzes for user ${username} (${userId}).`);


    // 3. Clear user-specific references from the user's own document
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          savedQuizzes: [],
          quizzesTaken: [],
          achievements: [],
          favoriteCategories: [],
          totalScore: 0,
          lastQuizOfTheDate: null,
          quizOfTheDayStreak: 0,
        }
      }
    );
    console.log(`Cleared personal data references for user ${username} (${userId}).`);
    // 4. Delete the user account itself
    const deleteResult = await User.findByIdAndDelete(userId);
    if (!deleteResult) {
        return res.status(404).json({ message: "User not found for final deletion." });
    }
    console.log(`User account ${username} (${userId}) deleted successfully.`);
    res.status(200).json({ message: "Account deleted successfully, created quizzes anonymized." });

  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: errorMessage });
  }
};


// Get notification status
exports.getNotificationStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: "Authentication required" });
    const user = req.user
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ notifications: user.notifications });
  } catch (error) {
    console.error("Error fetching notification status:", error);
    res.status(500).json({ message: "Failed to fetch notification status" });
  }
};

// Update notification status
exports.updateNotificationStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(401).json({ message: "Authentication required" });

    const { notifications } = req.body;
    if (!notifications) {
      return res.status(400).json({ message: "Notifications required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { notifications } }, // directly update full notifications object
      { new: true, fields: { notifications: 1 } }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ notifications: updatedUser.notifications });
  } catch (error) {
    console.error("Error updating notification status:", error);
    res.status(500).json({ message: "Failed to update notification status" });
  }
};
