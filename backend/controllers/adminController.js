
const User = require('../models/User');
const QuizSet = require('../models/QuizSet');
const Category = require('../models/Category');
const bcrypt = require('bcryptjs');
const { mailTransporter }  = require("../utills/mailTransporter"); // adjust path if needed

// Get all users and categories (admin only)
exports.getAllUsersAndCategories = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    // Format users for frontend (id, name, email, role, joinDate)
    const usersRaw = await User.find({}, '-password');
    const users = usersRaw.map(u => ({
      id: u._id,
      name: u.username ,
      email: u.email,
      role: u.role,
      joinDate: (u.createdAt ? u.createdAt.toISOString().slice(0, 10) : ''),
    }));

    // Format categories for frontend (id, name, description, quizCount)
    const categoriesRaw = await Category.find({});
    const categories = categoriesRaw.map(c => ({
      id: c._id,
      name: c.title,
      description: c.description,
      quizCount: c.totalQuizzes 
    }));
    console.log("Fetched users and categories successfully", users.length, "users and", categories.length, "categories");
    res.status(200).json({ users, categories });
  } catch (error) {
    console.error("Error fetching users/categories:", error);
    res.status(500).json({ message: "Failed to fetch users/categories" });
  }
};

// Add new user (admin only) 
exports.addNewUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username: name }] });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Auto-generate a random password (8 chars)
    const password = Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: name, email, password: hashPassword, role: role || 'user' });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully and password send to email",
      user: {
        id: newUser._id,
        name: newUser.username,
        email: newUser.email,
        role: newUser.role,
        joinDate: newUser.createdAt ? newUser.createdAt.toISOString().slice(0, 10) : ''
      }
    });
    // Optionally: send password to user via email (not implemented here)
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Failed to add user" });
  }
};

// Update user (admin only) 
exports.updateUserByAdmin = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    const userId = req.params.userId;
    const { name, email, role } = req.body;
    console.log("updating user by admin ", userId,name,email,role)
    if (!userId || !name || !email || !role) {
      return res.status(400).json({ message: "User ID, name, email, and role required" });
    }
    const updated = await User.findByIdAndUpdate(
      userId,
      { username: name, email, role },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updated._id,
        name: updated.username,
        email: updated.email,
        role: updated.role,
        joinDate: updated.createdAt ? updated.createdAt.toISOString().slice(0, 10) : ''
      }
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Delete any user (admin only) 
exports.deleteUserByAdmin = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    const userId = req.params.userId;
    const { reason } = req.body;
    console.log("deleting the user for the reason ",userId,reason)
    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }
    await QuizSet.updateMany(
      { createdBy: userId },
      { $set: { createdBy: process.env.ANONYMOUS_USER_ID } }
    );
    await User.findByIdAndDelete(userId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// Add new category (admin only)
exports.addNewCategory = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    const { name:title, description,icon } = req.body.newCategory;
    console.log("adding new category",title,description,icon)
    if (!title) {
      return res.status(400).json({ message: "Category name required" });
    }
    const existing = await Category.findOne({title});
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }
    const newCategory = new Category({ title, description,icon });
    await newCategory.save();
    res.status(201).json({ 
       id: newCategory._id,
  name: newCategory.title,
  description: newCategory.description,
  quizCount: newCategory.totalQuizzes
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Failed to add category" });
  }
};
// Update category (admin only)
exports.updateCategory = async (req, res) => { 
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    const { categoryId, name, description } = req.body;
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID required" });
    }
    const updated = await Category.findByIdAndUpdate(categoryId, { title:name, description }, { new: true });
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({
  id: updated._id,
  name: updated.title,
  description: updated.description,
  quizCount: updated.totalQuizzes
});
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};
// Delete category (admin only)
exports.deleteCategory = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID required" });
    }
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
// Send announcement to all users (admin only)


exports.sendAnnouncement = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: "Announcement message required" });
    }

    // Step 2: Find users with notifications.email === true
    const targetUsers = await User.find({ "notifications.email": true }, "email");

    // Step 3: Send email to each of them
    for (const user of targetUsers) {
      const mailOptions = {
        from: process.env.email_username,
        to: user.email,
        subject: "New Announcement",
        html: `<p>${message}</p>`,
      };

      try {
        await mailTransporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error(`Failed to send email to ${user.email}:`, emailError.message);
      }
    }

    res.status(200).json({ success: true, message: "Announcement sent to all users via DB and email" });

  } catch (error) {
    console.error("Error sending announcement:", error);
    res.status(500).json({ success: false, message: "Failed to send announcement" });
  }
};



// No router export here; use these as controller functions in your routes file