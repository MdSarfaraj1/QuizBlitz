
const nodemailer=require("nodemailer")
module.exports.mailTransporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.email_username,
        pass:process.env.email_password
    }
})