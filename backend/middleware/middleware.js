require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports.isLoggedIn = (fields = "") => {
    return async (req, res, next) => {
        const token = req.cookies.sessionToken;
        if (!token) {
            return res.status(401).json({ message: "Please login first" });
        }

        try {
            const decoded = jwt.verify(token, process.env.secret_key);
            const user = await User.findById(decoded.UserId)
                .select(fields)

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;
            next();
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    };
};
