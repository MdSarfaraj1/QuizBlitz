const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const adminId=req.body.adminId;
        // Check if the user is an admin
        const admin = await User.findOne({ _id: adminId, role: "admin" });
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        // Delete user from the database
        const result = await User.findByIdAndDelete(userId);
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
});

module.exports = router;