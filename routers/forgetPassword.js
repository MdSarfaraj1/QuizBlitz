const express=require("express");
const router=express.Router({mergeParams:true});
const ResetPassword=require("../controllers/resetPassword")

router.post("/",ResetPassword.SendOTP);
router.post("/verify-otp", ResetPassword.VerifyOTP);
router.post("/set-new-password", ResetPassword.SetNewPassword);

module.exports=router;