const mongoose = require('mongoose');

const questions = [
  // Easy Questions
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the correct syntax to print a message in the console in JavaScript?',
    options: ['console.log("message")', 'print("message")', 'echo("message")', 'System.out.println("message")'],
    correctAnswer: 'console.log("message")',
     
    hint: 'It starts with console.',
    level: 'easy',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'Which of the following is a JavaScript data type?',
    options: ['String', 'Number', 'Boolean', 'All of the above'],
    correctAnswer: 'All of the above',
     
    hint: 'JavaScript supports multiple data types.',
    level: 'easy',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'How do you declare a variable in JavaScript?',
    options: ['var', 'let', 'const', 'All of the above'],
    correctAnswer: 'All of the above',
     
    hint: 'JavaScript has multiple ways to declare variables.',
    level: 'easy',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'Which company developed JavaScript?',
    options: ['Microsoft', 'Netscape', 'Google', 'Sun Microsystems'],
    correctAnswer: 'Netscape',
     
    hint: 'It was developed for web browsers.',
    level: 'easy',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the correct way to write a JavaScript array?',
    options: ['var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = ["red", "green", "blue"]', 'var colors = "red", "green", "blue"', 'var colors = {"red", "green", "blue"}'],
    correctAnswer: 'var colors = ["red", "green", "blue"]',
     
    hint: 'Arrays use square brackets.',
    level: 'easy',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'How do you call a function named myFunction in JavaScript?',
    options: ['call myFunction()', 'myFunction()', 'call function myFunction()', 'Call.myFunction()'],
    correctAnswer: 'myFunction()',
     
    hint: 'Functions are called using parentheses.',
    level: 'easy',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'Which event occurs when the user clicks on an HTML element?',
    options: ['onchange', 'onclick', 'onmouseover', 'onmouseclick'],
    correctAnswer: 'onclick',
     
    hint: 'It starts with "on".',
    level: 'easy',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'How do you add a comment in JavaScript?',
    options: ['<!-- This is a comment -->', '// This is a comment', '/* This is a comment */', '** This is a comment **'],
    correctAnswer: '// This is a comment',
     
    hint: 'It starts with two slashes.',
    level: 'easy',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the correct way to write a JavaScript object?',
    options: ['var obj = {name: "John", age: 30}', 'var obj = (name: "John", age: 30)', 'var obj = [name: "John", age: 30]', 'var obj = "name: John, age: 30"'],
    correctAnswer: 'var obj = {name: "John", age: 30}',
     
    hint: 'Objects use curly braces.',
    level: 'easy',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the output of the following code: console.log(1 + "1")?',
    options: ['2', '11', 'undefined', 'NaN'],
    correctAnswer: '11',
     
    hint: 'It performs string concatenation.',
    level: 'easy',
  },

  // Medium Questions
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the output of the following code: console.log(typeof null)?',
    options: ['object', 'null', 'undefined', 'string'],
    correctAnswer: 'object',
     
    hint: 'It is a known bug in JavaScript.',
    level: 'medium',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'Which method is used to add an element to the end of an array in JavaScript?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()',
     
    hint: 'It is a common array method.',
    level: 'medium',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the purpose of the JavaScript isNaN() function?',
    options: ['To check if a value is NaN', 'To check if a value is a number', 'To convert a value to NaN', 'None of the above'],
    correctAnswer: 'To check if a value is NaN',
     
    hint: 'It checks for Not-a-Number.',
    level: 'medium',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the output of the following code: console.log([] + []);',
    options: ['""', '[]', 'undefined', 'NaN'],
    correctAnswer: '""',
     
    hint: 'It concatenates two empty arrays.',
    level: 'medium',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'Which keyword is used to define a constant in JavaScript?',
    options: ['let', 'var', 'const', 'constant'],
    correctAnswer: 'const',
     
    hint: 'It is a reserved keyword.',
    level: 'medium',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the purpose of the JavaScript map() function?',
    options: ['To iterate over an array', 'To transform each element of an array', 'To filter elements of an array', 'To find an element in an array'],
    correctAnswer: 'To transform each element of an array',
     
    hint: 'It creates a new array.',
    level: 'medium',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the output of the following code: console.log(typeof NaN);',
    options: ['number', 'NaN', 'undefined', 'string'],
    correctAnswer: 'number',
     
    hint: 'NaN is a special value in JavaScript.',
    level: 'medium',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'Which method is used to remove the last element of an array in JavaScript?',
    options: ['pop()', 'push()', 'shift()', 'unshift()'],
    correctAnswer: 'pop()',
     
    hint: 'It modifies the original array.',
    level: 'medium',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the output of the following code: console.log(1 == "1");',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 'true',
     
    hint: 'It performs type coercion.',
    level: 'medium',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the purpose of the JavaScript reduce() function?',
    options: ['To reduce the size of an array', 'To apply a function to each element and accumulate a result', 'To filter elements of an array', 'To find the maximum value in an array'],
    correctAnswer: 'To apply a function to each element and accumulate a result',
     
    hint: 'It reduces an array to a single value.',
    level: 'medium',
  },

  // Hard Questions
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the difference between == and === in JavaScript?',
    options: ['== checks value only, === checks value and type', 'Both are the same', '== checks type only, === checks value and type', 'None of the above'],
    correctAnswer: '== checks value only, === checks value and type',
     
    hint: 'One checks type as well.',
    level: 'hard',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is a closure in JavaScript?',
    options: ['A function having access to its outer scope', 'A function without parameters', 'A function that returns another function', 'None of the above'],
    correctAnswer: 'A function having access to its outer scope',
     
    hint: 'It is related to scope.',
    level: 'hard',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the output of the following code: console.log(0.1 + 0.2 === 0.3)?',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 'false',
     
    hint: 'It is due to floating-point precision.',
    level: 'hard',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the output of the following code: console.log([] == ![]);',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 'true',
     
    hint: 'It involves type coercion and logical negation.',
    level: 'hard',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the purpose of the JavaScript bind() method?',
    options: ['To bind an event to an element', 'To create a new function with a specific this value', 'To call a function immediately', 'To apply a function to an array'],
    correctAnswer: 'To create a new function with a specific this value',
     
    hint: 'It is used to set the this context.',
    level: 'hard',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the output of the following code: console.log(typeof function(){});',
    options: ['function', 'object', 'undefined', 'string'],
    correctAnswer: 'function',
     
    hint: 'Functions are first-class objects in JavaScript.',
    level: 'hard',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the purpose of the JavaScript Object.freeze() method?',
    options: ['To prevent adding new properties to an object', 'To make an object immutable', 'To delete all properties of an object', 'To clone an object'],
    correctAnswer: 'To make an object immutable',
     
    hint: 'It prevents modification of an object.',
    level: 'hard',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the output of the following code: console.log(0.1 + 0.2);',
    options: ['0.3', '0.30000000000000004', 'undefined', 'NaN'],
    correctAnswer: '0.30000000000000004',
     
    hint: 'It is due to floating-point precision.',
    level: 'hard',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the purpose of the JavaScript async/await syntax?',
    options: ['To handle asynchronous operations', 'To create promises', 'To define a function', 'To loop through an array'],
    correctAnswer: 'To handle asynchronous operations',
     
    hint: 'It is used with promises.',
    level: 'hard',
  },
  {
    quizId: 'PLACEHOLDER_QUIZ_ID',
    questionText: 'What is the output of the following code: console.log(typeof Symbol());',
    options: ['symbol', 'object', 'undefined', 'string'],
    correctAnswer: 'symbol',
     
    hint: 'It is a unique primitive type.',
    level: 'hard',
  },
];

module.exports = questions;