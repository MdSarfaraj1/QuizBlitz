const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const User = require('../models/User');

// Get all achievements
router.get('/getAll', async (req, res) => {
  const achievements = await Achievement.find();
  res.json(achievements);
});

// Get achievements for a user
router.get('/user/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).populate('achievements');
  res.json(user.achievements);
});

router.post('/quiz-of-the-day/update-streak', async (req, res) => {
  const { userId, isCorrect } = req.body;

  const user = await User.findById(userId);

  const today = new Date().toDateString();
  const lastDate = user.lastQuizOfTheDate ? new Date(user.lastQuizOfTheDate ).toDateString() : null;

  // Prevent duplicate submission
  if (today === lastDate) {
    return res.status(400).json({ message: "Quiz already submitted today." });
  }
// Calculate yesterday
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toDateString();

  // Update streak if correct, else reset
  if (isCorrect && lastDate===yesterdayStr) {
    user.quizOfTheDayStreak = (user.quizOfTheDayStreak || 0) + 1;
  } else {
    user.quizOfTheDayStreak = 0;
  }

  user.lastQuizOfTheDate  = new Date();

  // Reward logic
  if (user.quizOfTheDayStreak === 5) {
    const rewardId = "swdsa"/* your achievement ObjectId for "5-day streak" */

    // Check if already awarded
    const alreadyHas = user.achievements.some(a => a.achievementId.equals(rewardId));
    if (!alreadyHas) {
      user.achievements.push({
        achievementId: rewardId,
        dateEarned: new Date()
      });
    }
  }

  await user.save();
  res.json({ message: "Streak updated", streak: user.quizOfTheDayStreak });
});

module.exports = router;