const crypto = require("crypto");

const generateOTP = () => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
        OTP += digits[crypto.randomInt(0, digits.length)];
    }
    return OTP;
};

module.exports = generateOTP; 