const bcrypt = require("bcryptjs");
const { mailTransporter } = require("../Utils/mailTransporter");
const generateOTP=require("../utils/otpGenerator")
const User = require("../models/User");
exports.SendOTP=async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)
    let user = await User.findOne({ email});
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generating reset token
    const resetToken = generateOTP();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600; // 1 mintues
    await user.save();
    //sending mmail
    const mailOptions = {
      from: process.env.email_username,
      to: user.email,
      subject: "Password Reset Request",
      html: `
                 <p>You requested a password reset</p>
                <p>Here is your otp to reset your password : ${resetToken}</p>
                <p>This otp will expire in 1 hour</p>
    
                 `,
    };
    await mailTransporter.sendMail(mailOptions);
    res.status(200).json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in password reset request" });
  }
}

exports.VerifyOTP=async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findOne({
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
}

exports.SetNewPassword=async (req, res) => {
    // Update password
    try {
      const { email, otp, newPassword } = req.body;
      console.log(req.body)
      const user = await User.findOne({
        email,
        resetPasswordToken: otp,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid request" });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.json({ message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error resetting password" });
    }
  }