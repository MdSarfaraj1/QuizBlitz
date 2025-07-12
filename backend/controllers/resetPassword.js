const bcrypt = require("bcryptjs");
const { mailTransporter } = require("../utills/mailTransporter");
const generateOTP=require("../utills/otpGenerator")
const User = require("../models/User");
exports.SendOTP=async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generating reset token
    const resetToken = generateOTP();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() +300000; // 5 mintues
    await user.save();
    //sending mmail
  const mailOptions = {
  from: process.env.email_username,
  to: user.email,
  subject: "🔐 Password Reset Request",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #2c3e50;">🔐 Password Reset Requested</h2>
      <p>Hello <strong>${user.name || "User"}</strong>,</p>
      <p>We received a request to reset your password. Use the OTP below to proceed:</p>
      <div style="font-size: 22px; font-weight: bold; color: #1a73e8; background: #e8f0fe; padding: 12px 20px; border-radius: 8px; display: inline-block; margin: 15px 0;">
        ${resetToken}
      </div>
      <p><strong>This OTP will expire in 1 hour.</strong></p>
      <p>If you didn’t request this, please ignore this email or contact our support immediately.</p>
      <hr style="margin: 30px 0;" />
      <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply.</p>
    </div>
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
    console.log("otp is:",otp)
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