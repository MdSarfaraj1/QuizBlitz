export const categories = [
  {
    id: 'general',
    name: 'General Knowledge',
    description: 'Test your overall knowledge',
    icon: '🧠',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Physics, Chemistry, Biology',
    icon: '🔬',
    color: 'bg-gradient-to-r from-green-500 to-blue-500'
  },
  {
    id: 'history',
    name: 'History',
    description: 'Events from the past',
    icon: '📚',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Athletic competitions and games',
    icon: '⚽',
    color: 'bg-gradient-to-r from-red-500 to-pink-500'
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Computers, internet, and gadgets',
    icon: '💻',
    color: 'bg-gradient-to-r from-cyan-500 to-blue-500'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Movies, music, and pop culture',
    icon: '🎬',
    color: 'bg-gradient-to-r from-indigo-500 to-purple-500'
  }
];

const allQuestions = [
  {
    id: 'gen_easy_1',
    categoryId: 'general',
    difficulty: 'easy',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
    hint: 'It\'s known as the City of Light'
  },
  {
    id: 'gen_easy_2',
    categoryId: 'general',
    difficulty: 'easy',
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7',
    hint: 'Think about all the major landmasses'
  },
  {
    id: 'gen_med_1',
    categoryId: 'general',
    difficulty: 'medium',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
    hint: 'Named after the Roman god of war'
  },
  {
    id: 'sci_easy_1',
    categoryId: 'science',
    difficulty: 'easy',
    question: 'What is H2O?',
    options: ['Oxygen', 'Hydrogen', 'Water', 'Carbon'],
    correctAnswer: 'Water',
    hint: 'Essential for life'
  },
  {
    id: 'sci_easy_2',
    categoryId: 'science',
    difficulty: 'easy',
    question: 'How many bones are in an adult human body?',
    options: ['206', '256', '186', '216'],
    correctAnswer: '206',
    hint: 'More than 200 but less than 210'
  },
  {
    id: 'tech_easy_1',
    categoryId: 'technology',
    difficulty: 'easy',
    question: 'What does "WWW" stand for?',
    options: ['World Wide Web', 'World Wide Website', 'Web Wide World', 'Wide World Web'],
    correctAnswer: 'World Wide Web',
    hint: 'It\'s how we browse the internet'
  },
  {
    id: 'hist_easy_1',
    categoryId: 'history',
    difficulty: 'easy',
    question: 'In which year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    correctAnswer: '1945',
    hint: 'Mid-1940s'
  },
  {
    id: 'sports_easy_1',
    categoryId: 'sports',
    difficulty: 'easy',
    question: 'How many players are on a basketball team on the court at one time?',
    options: ['4', '5', '6', '7'],
    correctAnswer: '5',
    hint: 'Same as fingers on one hand'
  },
  {
    id: 'ent_easy_1',
    categoryId: 'entertainment',
    difficulty: 'easy',
    question: 'Which movie features the song "Let It Go"?',
    options: ['Moana', 'Frozen', 'Tangled', 'The Little Mermaid'],
    correctAnswer: 'Frozen',
    hint: 'It\'s about ice and snow'
  },
  {
    id: 'sci_med_1',
    categoryId: 'science',
    difficulty: 'medium',
    question: 'What is the speed of light in a vacuum?',
    options: ['300,000 km/s', '299,792,458 m/s', '186,000 mph', 'All of the above'],
    correctAnswer: 'All of the above',
    hint: 'They\'re all correct in different units'
  },
  {
    id: 'tech_med_1',
    categoryId: 'technology',
    difficulty: 'medium',
    question: 'Which programming language is known as the "mother of all languages"?',
    options: ['C', 'Assembly', 'FORTRAN', 'COBOL'],
    correctAnswer: 'C',
    hint: 'Many other languages are based on this one'
  },
  {
    id: 'gen_hard_1',
    categoryId: 'general',
    difficulty: 'hard',
    question: 'What is the smallest country in the world by area?',
    options: ['Monaco', 'Nauru', 'Vatican City', 'San Marino'],
    correctAnswer: 'Vatican City',
    hint: 'It\'s a religious state within Rome'
  },
  {
    id: 'sci_hard_1',
    categoryId: 'science',
    difficulty: 'hard',
    question: 'What is the Heisenberg Uncertainty Principle?',
    options: [
      'You cannot know both position and momentum of a particle precisely',
      'Energy cannot be created or destroyed',
      'For every action there is an equal and opposite reaction',
      'Objects at rest stay at rest'
    ],
    correctAnswer: 'You cannot know both position and momentum of a particle precisely',
    hint: 'It\'s a quantum mechanics principle'
  }
];

export const getQuestionsByCategory = (categoryId, difficulty, numQuestions) => {
  const filteredQuestions = allQuestions.filter(
    q => q.categoryId === categoryId && q.difficulty === difficulty
  );

  if (filteredQuestions.length < numQuestions) {
    const allCategoryQuestions = allQuestions.filter(q => q.categoryId === categoryId);
    const shuffled = [...allCategoryQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(numQuestions, shuffled.length));
  }

  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numQuestions);
};
