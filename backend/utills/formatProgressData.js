const DIFFICULTY_MAP = {
  easy: 'Beginner',
  medium: 'Intermediate',
  hard: 'Advanced'
};
module.exports.formatQuizProgressData = (quizzesTaken) => {
  const categoryMap = {};

  quizzesTaken.forEach((quiz) => {
    const category = quiz.category || 'Unknown';
    const difficulty = DIFFICULTY_MAP[quiz.difficulty] || 'Unknown';

    const key = `${category}-${difficulty}`;

    if (!categoryMap[key]) {
      categoryMap[key] = {
        category,
        difficulty,
        quizzesTaken: 0
      };
    }

    categoryMap[key].quizzesTaken += 1;
  });

  return Object.values(categoryMap);
};