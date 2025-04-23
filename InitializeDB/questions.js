const mongoose = require('mongoose');

const questions = [
  // Easy Questions
  {
    quizId: 'javascript',
    questionText: 'What is the correct syntax to print a message in the console in JavaScript?',
    options: ['console.log("message")', 'print("message")', 'echo("message")', 'System.out.println("message")'],
    correctAnswer: 'console.log("message")',
     
    hint: 'It starts with console.',
    level: 'easy',
  marks:1 },
  {
    quizId: 'javascript',
    questionText: 'Which of the following is a JavaScript data type?',
    options: ['String', 'Number', 'Boolean', 'All of the above'],
    correctAnswer: 'All of the above',
     
    hint: 'JavaScript supports multiple data types.',
    level: 'easy',
  marks:1 },
  {
    quizId: 'javascript',
    questionText: 'How do you declare a variable in JavaScript?',
    options: ['var', 'let', 'const', 'All of the above'],
    correctAnswer: 'All of the above',
     
    hint: 'JavaScript has multiple ways to declare variables.',
    level: 'easy',
  marks:1 },
  {
    quizId: 'javascript',
    questionText: 'Which company developed JavaScript?',
    options: ['Microsoft', 'Netscape', 'Google', 'Sun Microsystems'],
    correctAnswer: 'Netscape',
     
    hint: 'It was developed for web browsers.',
    level: 'easy',
  marks:1 },
  {
    quizId: 'javascript',
    questionText: 'What is the correct way to write a JavaScript array?',
    options: ['var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = ["red", "green", "blue"]', 'var colors = "red", "green", "blue"', 'var colors = {"red", "green", "blue"}'],
    correctAnswer: 'var colors = ["red", "green", "blue"]',
     
    hint: 'Arrays use square brackets.',
    level: 'easy',
  marks:1 },
  {
    quizId: 'javascript',
    questionText: 'How do you call a function named myFunction in JavaScript?',
    options: ['call myFunction()', 'myFunction()', 'call function myFunction()', 'Call.myFunction()'],
    correctAnswer: 'myFunction()',
     
    hint: 'Functions are called using parentheses.',
    level: 'easy',
  marks:1 },
  {
    quizId: 'javascript',
    questionText: 'Which event occurs when the user clicks on an HTML element?',
    options: ['onchange', 'onclick', 'onmouseover', 'onmouseclick'],
    correctAnswer: 'onclick',
     
    hint: 'It starts with "on".',
    level: 'easy',
  marks:1 },
  {
    quizId: 'javascript',
    questionText: 'How do you add a comment in JavaScript?',
    options: ['<!-- This is a comment -->', '// This is a comment', '/* This is a comment */', '** This is a comment **'],
    correctAnswer: '// This is a comment',
     
    hint: 'It starts with two slashes.',
    level: 'easy',
  marks:1 },
  {
    quizId: 'javascript',
    questionText: 'What is the correct way to write a JavaScript object?',
    options: ['var obj = {name: "John", age: 30}', 'var obj = (name: "John", age: 30)', 'var obj = [name: "John", age: 30]', 'var obj = "name: John, age: 30"'],
    correctAnswer: 'var obj = {name: "John", age: 30}',
     
    hint: 'Objects use curly braces.',
    level: 'easy',
  marks:1 },
  {
    quizId: 'javascript',
    questionText: 'What is the output of the following code: console.log(1 + "1")?',
    options: ['2', '11', 'undefined', 'NaN'],
    correctAnswer: '11',
     
    hint: 'It performs string concatenation.',
    level: 'easy',
  marks:1 },

  // Medium Questions
  {
    quizId: 'javascript',
    questionText: 'What is the output of the following code: console.log(typeof null)?',
    options: ['object', 'null', 'undefined', 'string'],
    correctAnswer: 'object',
     
    hint: 'It is a known bug in JavaScript.',
    level: 'medium',
  marks:2 },
  {
    quizId: 'javascript',
    questionText: 'Which method is used to add an element to the end of an array in JavaScript?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()',
     
    hint: 'It is a common array method.',
    level: 'medium',
  marks:2 },
  {
    quizId: 'javascript',
    questionText: 'What is the purpose of the JavaScript isNaN() function?',
    options: ['To check if a value is NaN', 'To check if a value is a number', 'To convert a value to NaN', 'None of the above'],
    correctAnswer: 'To check if a value is NaN',
     
    hint: 'It checks for Not-a-Number.',
    level: 'medium',
  marks:2 },
  {
    quizId: 'javascript',
    questionText: 'What is the output of the following code: console.log([] + []);',
    options: ['""', '[]', 'undefined', 'NaN'],
    correctAnswer: '""',
     
    hint: 'It concatenates two empty arrays.',
    level: 'medium',
  marks:2 },
  {
    quizId: 'javascript',
    questionText: 'Which keyword is used to define a constant in JavaScript?',
    options: ['let', 'var', 'const', 'constant'],
    correctAnswer: 'const',
     
    hint: 'It is a reserved keyword.',
    level: 'medium',
  marks:2 },
  {
    quizId: 'javascript',
    questionText: 'What is the purpose of the JavaScript map() function?',
    options: ['To iterate over an array', 'To transform each element of an array', 'To filter elements of an array', 'To find an element in an array'],
    correctAnswer: 'To transform each element of an array',
     
    hint: 'It creates a new array.',
    level: 'medium',
  marks:2 },
  {
    quizId: 'javascript',
    questionText: 'What is the output of the following code: console.log(typeof NaN);',
    options: ['number', 'NaN', 'undefined', 'string'],
    correctAnswer: 'number',
     
    hint: 'NaN is a special value in JavaScript.',
    level: 'medium',
  marks:2 },
  {
    quizId: 'javascript',
    questionText: 'Which method is used to remove the last element of an array in JavaScript?',
    options: ['pop()', 'push()', 'shift()', 'unshift()'],
    correctAnswer: 'pop()',
     
    hint: 'It modifies the original array.',
    level: 'medium',
  marks:2 },
  {
    quizId: 'javascript',
    questionText: 'What is the output of the following code: console.log(1 == "1");',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 'true',
     
    hint: 'It performs type coercion.',
    level: 'medium',
  marks:2 },
  {
    quizId: 'javascript',
    questionText: 'What is the purpose of the JavaScript reduce() function?',
    options: ['To reduce the size of an array', 'To apply a function to each element and accumulate a result', 'To filter elements of an array', 'To find the maximum value in an array'],
    correctAnswer: 'To apply a function to each element and accumulate a result',
     
    hint: 'It reduces an array to a single value.',
    level: 'medium',
  marks:2 },

  // Hard Questions
  {
    quizId: 'javascript',
    questionText: 'What is the difference between == and === in JavaScript?',
    options: ['== checks value only, === checks value and type', 'Both are the same', '== checks type only, === checks value and type', 'None of the above'],
    correctAnswer: '== checks value only, === checks value and type',
     
    hint: 'One checks type as well.',
    level: 'hard',
  marks:3 },
  {
    quizId: 'javascript',
    questionText: 'What is a closure in JavaScript?',
    options: ['A function having access to its outer scope', 'A function without parameters', 'A function that returns another function', 'None of the above'],
    correctAnswer: 'A function having access to its outer scope',
     
    hint: 'It is related to scope.',
    level: 'hard',
  marks:3 },
  {
    quizId: 'javascript',
    questionText: 'What is the output of the following code: console.log(0.1 + 0.2 === 0.3)?',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 'false',
     
    hint: 'It is due to floating-point precision.',
    level: 'hard',
  marks:3 },
  {
    quizId: 'javascript',
    questionText: 'What is the output of the following code: console.log([] == ![]);',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 'true',
     
    hint: 'It involves type coercion and logical negation.',
    level: 'hard',
  marks:3 },
  {
    quizId: 'javascript',
    questionText: 'What is the purpose of the JavaScript bind() method?',
    options: ['To bind an event to an element', 'To create a new function with a specific this value', 'To call a function immediately', 'To apply a function to an array'],
    correctAnswer: 'To create a new function with a specific this value',
     
    hint: 'It is used to set the this context.',
    level: 'hard',
  marks:3 },
  {
    quizId: 'javascript',
    questionText: 'What is the output of the following code: console.log(typeof function(){});',
    options: ['function', 'object', 'undefined', 'string'],
    correctAnswer: 'function',
     
    hint: 'Functions are first-class objects in JavaScript.',
    level: 'hard',
  marks:3 },
  {
    quizId: 'javascript',
    questionText: 'What is the purpose of the JavaScript Object.freeze() method?',
    options: ['To prevent adding new properties to an object', 'To make an object immutable', 'To delete all properties of an object', 'To clone an object'],
    correctAnswer: 'To make an object immutable',
     
    hint: 'It prevents modification of an object.',
    level: 'hard',
  marks:3 },
  {
    quizId: 'javascript',
    questionText: 'What is the output of the following code: console.log(0.1 + 0.2);',
    options: ['0.3', '0.30000000000000004', 'undefined', 'NaN'],
    correctAnswer: '0.30000000000000004',
     
    hint: 'It is due to floating-point precision.',
    level: 'hard',
  marks:3 },
  {
    quizId: 'javascript',
    questionText: 'What is the purpose of the JavaScript async/await syntax?',
    options: ['To handle asynchronous operations', 'To create promises', 'To define a function', 'To loop through an array'],
    correctAnswer: 'To handle asynchronous operations',
     
    hint: 'It is used with promises.',
    level: 'hard',
  marks:3 },
  {
    quizId: 'javascript',
    questionText: 'What is the output of the following code: console.log(typeof Symbol());',
    options: ['symbol', 'object', 'undefined', 'string'],
    correctAnswer: 'symbol',
     
    hint: 'It is a unique primitive type.',
    level: 'hard',
  marks:3 },
];

// Adding 30 Python questions (10 easy, 10 medium, 10 hard)
const pythonQuestions = [
  // Easy Questions
  {
    quizId: 'python',
    questionText: 'What is the correct file extension for Python files?',
    options: ['.py', '.python', '.pt', '.pyt'],
    correctAnswer: '.py',
    hint: 'It is a two-letter extension.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'python',
    questionText: 'Which keyword is used to define a function in Python?',
    options: ['function', 'def', 'func', 'define'],
    correctAnswer: 'def',
    hint: 'It is a three-letter keyword.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'python',
    questionText: 'How do you print a message in Python?',
    options: ['print("message")', 'echo("message")', 'console.log("message")', 'System.out.println("message")'],
    correctAnswer: 'print("message")',
    hint: 'It starts with print.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'python',
    questionText: 'Which of the following is a Python data type?',
    options: ['List', 'Dictionary', 'Tuple', 'All of the above'],
    correctAnswer: 'All of the above',
    hint: 'Python supports multiple data types.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'python',
    questionText: 'How do you start a comment in Python?',
    options: ['# This is a comment', '// This is a comment', '/* This is a comment */', '<!-- This is a comment -->'],
    correctAnswer: '# This is a comment',
    hint: 'It starts with a hash symbol.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print(2 + 3)?',
    options: ['5', '23', 'undefined', 'NaN'],
    correctAnswer: '5',
    hint: 'It performs addition.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'python',
    questionText: 'Which keyword is used to create a loop in Python?',
    options: ['for', 'loop', 'iterate', 'while'],
    correctAnswer: 'for',
    hint: 'It is a three-letter keyword.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'python',
    questionText: 'What is the correct way to create a list in Python?',
    options: ['list = [1, 2, 3]', 'list = (1, 2, 3)', 'list = {1, 2, 3}', 'list = "1, 2, 3"'],
    correctAnswer: 'list = [1, 2, 3]',
    hint: 'Lists use square brackets.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'python',
    questionText: 'Which function is used to get the length of a list in Python?',
    options: ['length()', 'len()', 'size()', 'count()'],
    correctAnswer: 'len()',
    hint: 'It is a three-letter function.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print("Hello" + " World")?',
    options: ['Hello World', 'HelloWorld', 'undefined', 'NaN'],
    correctAnswer: 'Hello World',
    hint: 'It concatenates strings.',
    level: 'easy',
    marks: 1
  },

  // Medium Questions
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print(type(5))?',
    options: ['int', 'float', 'str', 'None'],
    correctAnswer: 'int',
    hint: 'It is an integer type.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'python',
    questionText: 'Which method is used to add an element to the end of a list in Python?',
    options: ['append()', 'add()', 'insert()', 'push()'],
    correctAnswer: 'append()',
    hint: 'It is a common list method.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'python',
    questionText: 'What is the purpose of the Python range() function?',
    options: ['To create a sequence of numbers', 'To iterate over a list', 'To filter elements of a list', 'To find an element in a list'],
    correctAnswer: 'To create a sequence of numbers',
    hint: 'It generates numbers.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print(10 // 3)?',
    options: ['3', '3.33', '4', 'None'],
    correctAnswer: '3',
    hint: 'It performs floor division.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'python',
    questionText: 'Which keyword is used to handle exceptions in Python?',
    options: ['try', 'catch', 'except', 'finally'],
    correctAnswer: 'except',
    hint: 'It is used with try.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print("5" * 3)?',
    options: ['555', '15', 'undefined', 'NaN'],
    correctAnswer: '555',
    hint: 'It repeats the string.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'python',
    questionText: 'Which method is used to remove an element from a list in Python?',
    options: ['remove()', 'delete()', 'pop()', 'discard()'],
    correctAnswer: 'remove()',
    hint: 'It modifies the original list.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print(2 ** 3)?',
    options: ['8', '6', '9', 'None'],
    correctAnswer: '8',
    hint: 'It performs exponentiation.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'python',
    questionText: 'What is the purpose of the Python zip() function?',
    options: ['To combine two lists into tuples', 'To iterate over a list', 'To filter elements of a list', 'To find an element in a list'],
    correctAnswer: 'To combine two lists into tuples',
    hint: 'It pairs elements.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print(len("Hello"))?',
    options: ['5', '6', '4', 'None'],
    correctAnswer: '5',
    hint: 'It counts the characters.',
    level: 'medium',
    marks: 2
  },

  // Hard Questions
  {
    quizId: 'python',
    questionText: 'What is a Python decorator?',
    options: ['A function that modifies another function', 'A function without parameters', 'A function that returns another function', 'None of the above'],
    correctAnswer: 'A function that modifies another function',
    hint: 'It is related to functions.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print(0.1 + 0.2 == 0.3)?',
    options: ['True', 'False', 'undefined', 'NaN'],
    correctAnswer: 'False',
    hint: 'It is due to floating-point precision.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'python',
    questionText: 'What is the purpose of the Python @staticmethod decorator?',
    options: ['To define a static method', 'To define a class method', 'To define an instance method', 'None of the above'],
    correctAnswer: 'To define a static method',
    hint: 'It is used in classes.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print(type(lambda x: x))?',
    options: ['function', 'lambda', 'None', 'str'],
    correctAnswer: 'function',
    hint: 'Lambdas are functions.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'python',
    questionText: 'What is the purpose of the Python with statement?',
    options: ['To manage resources', 'To handle exceptions', 'To define a function', 'To loop through an array'],
    correctAnswer: 'To manage resources',
    hint: 'It is used with files.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print({1, 2, 3} & {2, 3, 4})?',
    options: ['{2, 3}', '{1, 2, 3, 4}', '{1}', 'None'],
    correctAnswer: '{2, 3}',
    hint: 'It performs set intersection.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'python',
    questionText: 'What is the purpose of the Python super() function?',
    options: ['To call a parent class method', 'To define a static method', 'To define a class method', 'None of the above'],
    correctAnswer: 'To call a parent class method',
    hint: 'It is used in inheritance.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print(sorted([3, 1, 2]))?',
    options: ['[1, 2, 3]', '[3, 2, 1]', '[2, 1, 3]', 'None'],
    correctAnswer: '[1, 2, 3]',
    hint: 'It sorts the list.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'python',
    questionText: 'What is the purpose of the Python __init__ method?',
    options: ['To initialize an object', 'To define a static method', 'To define a class method', 'None of the above'],
    correctAnswer: 'To initialize an object',
    hint: 'It is a constructor.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'python',
    questionText: 'What is the output of the following code: print({x: x**2 for x in range(3)})?',
    options: ['{0: 0, 1: 1, 2: 4}', '{1: 1, 2: 4}', '{0: 0, 1: 1}', 'None'],
    correctAnswer: '{0: 0, 1: 1, 2: 4}',
    hint: 'It creates a dictionary.',
    level: 'hard',
    marks: 3
  }
];

// Adding 30 MySQL questions (10 easy, 10 medium, 10 hard)
const mysqlQuestions = [
  // Easy Questions
  {
    quizId: 'mysql',
    questionText: 'What does SQL stand for?',
    options: ['Structured Query Language', 'Simple Query Language', 'Structured Question Language', 'Simple Question Language'],
    correctAnswer: 'Structured Query Language',
    hint: 'It is used to interact with databases.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mysql',
    questionText: 'Which command is used to retrieve data from a database?',
    options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    correctAnswer: 'SELECT',
    hint: 'It is used to fetch data.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mysql',
    questionText: 'Which keyword is used to sort the result-set in SQL?',
    options: ['ORDER BY', 'SORT BY', 'GROUP BY', 'FILTER BY'],
    correctAnswer: 'ORDER BY',
    hint: 'It orders the rows.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL statement is used to insert new data in a database?',
    options: ['INSERT INTO', 'ADD NEW', 'INSERT NEW', 'ADD INTO'],
    correctAnswer: 'INSERT INTO',
    hint: 'It starts with INSERT.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL statement is used to update data in a database?',
    options: ['UPDATE', 'MODIFY', 'CHANGE', 'ALTER'],
    correctAnswer: 'UPDATE',
    hint: 'It modifies existing data.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL statement is used to delete data from a database?',
    options: ['DELETE', 'REMOVE', 'DROP', 'CLEAR'],
    correctAnswer: 'DELETE',
    hint: 'It removes rows.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL function is used to count the number of rows in a table?',
    options: ['COUNT()', 'SUM()', 'TOTAL()', 'ROWS()'],
    correctAnswer: 'COUNT()',
    hint: 'It starts with COUNT.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL clause is used to filter records?',
    options: ['WHERE', 'FILTER', 'HAVING', 'GROUP BY'],
    correctAnswer: 'WHERE',
    hint: 'It specifies conditions.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL statement is used to create a new table?',
    options: ['CREATE TABLE', 'NEW TABLE', 'ADD TABLE', 'MAKE TABLE'],
    correctAnswer: 'CREATE TABLE',
    hint: 'It starts with CREATE.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL keyword is used to retrieve unique values?',
    options: ['DISTINCT', 'UNIQUE', 'FILTER', 'SEPARATE'],
    correctAnswer: 'DISTINCT',
    hint: 'It removes duplicates.',
    level: 'easy',
    marks: 1
  },

  // Medium Questions
  {
    quizId: 'mysql',
    questionText: 'What is the default port for MySQL?',
    options: ['3306', '1433', '1521', '5432'],
    correctAnswer: '3306',
    hint: 'It is a four-digit number.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL clause is used to group rows that have the same values?',
    options: ['GROUP BY', 'ORDER BY', 'HAVING', 'FILTER'],
    correctAnswer: 'GROUP BY',
    hint: 'It groups rows.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL statement is used to create a database?',
    options: ['CREATE DATABASE', 'NEW DATABASE', 'ADD DATABASE', 'MAKE DATABASE'],
    correctAnswer: 'CREATE DATABASE',
    hint: 'It starts with CREATE.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL function is used to calculate the sum of a column?',
    options: ['SUM()', 'COUNT()', 'TOTAL()', 'ADD()'],
    correctAnswer: 'SUM()',
    hint: 'It starts with SUM.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL keyword is used to specify a condition for aggregate functions?',
    options: ['HAVING', 'WHERE', 'FILTER', 'GROUP BY'],
    correctAnswer: 'HAVING',
    hint: 'It is used with GROUP BY.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL command is used to remove a table from a database?',
    options: ['DROP TABLE', 'DELETE TABLE', 'REMOVE TABLE', 'CLEAR TABLE'],
    correctAnswer: 'DROP TABLE',
    hint: 'It starts with DROP.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL statement is used to modify the structure of a table?',
    options: ['ALTER TABLE', 'MODIFY TABLE', 'CHANGE TABLE', 'UPDATE TABLE'],
    correctAnswer: 'ALTER TABLE',
    hint: 'It starts with ALTER.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL keyword is used to combine rows from two or more tables?',
    options: ['JOIN', 'MERGE', 'UNION', 'COMBINE'],
    correctAnswer: 'JOIN',
    hint: 'It is used to combine tables.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL function is used to find the maximum value in a column?',
    options: ['MAX()', 'MIN()', 'GREATEST()', 'HIGHEST()'],
    correctAnswer: 'MAX()',
    hint: 'It starts with MAX.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mysql',
    questionText: 'Which SQL function is used to find the minimum value in a column?',
    options: ['MIN()', 'MAX()', 'LEAST()', 'LOWEST()'],
    correctAnswer: 'MIN()',
    hint: 'It starts with MIN.',
    level: 'medium',
    marks: 2
  },

  // Hard Questions
  {
    quizId: 'mysql',
    questionText: 'What is a foreign key in MySQL?',
    options: ['A key that links two tables', 'A key that uniquely identifies a row', 'A key that is used for indexing', 'None of the above'],
    correctAnswer: 'A key that links two tables',
    hint: 'It is used for relationships.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mysql',
    questionText: 'What is the purpose of the MySQL AUTO_INCREMENT attribute?',
    options: ['To automatically generate unique values', 'To increment a column by 1', 'To create a primary key', 'None of the above'],
    correctAnswer: 'To automatically generate unique values',
    hint: 'It is used for primary keys.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mysql',
    questionText: 'What is the purpose of the MySQL PRIMARY KEY constraint?',
    options: ['To uniquely identify each row', 'To link two tables', 'To create an index', 'None of the above'],
    correctAnswer: 'To uniquely identify each row',
    hint: 'It ensures uniqueness.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mysql',
    questionText: 'What is the purpose of the MySQL UNIQUE constraint?',
    options: ['To ensure all values in a column are unique', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To ensure all values in a column are unique',
    hint: 'It prevents duplicates.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mysql',
    questionText: 'What is the purpose of the MySQL INDEX?',
    options: ['To speed up queries', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To speed up queries',
    hint: 'It improves performance.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mysql',
    questionText: 'What is the purpose of the MySQL TRIGGER?',
    options: ['To automatically execute a statement', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To automatically execute a statement',
    hint: 'It is triggered by events.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mysql',
    questionText: 'What is the purpose of the MySQL VIEW?',
    options: ['To create a virtual table', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To create a virtual table',
    hint: 'It is a stored query.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mysql',
    questionText: 'What is the purpose of the MySQL TRANSACTION?',
    options: ['To ensure data integrity', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To ensure data integrity',
    hint: 'It is used for atomic operations.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mysql',
    questionText: 'What is the purpose of the MySQL FOREIGN KEY constraint?',
    options: ['To link two tables', 'To create a primary key', 'To ensure uniqueness', 'None of the above'],
    correctAnswer: 'To link two tables',
    hint: 'It is used for relationships.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mysql',
    questionText: 'What is the purpose of the MySQL CASCADE option?',
    options: ['To automatically update or delete related rows', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To automatically update or delete related rows',
    hint: 'It is used with foreign keys.',
    level: 'hard',
    marks: 3
  }
];

// Adding 30 MongoDB questions (10 easy, 10 medium, 10 hard)
const mongoDBQuestions = [
  // Easy Questions
  {
    quizId: 'mongodb',
    questionText: 'What is MongoDB?',
    options: ['A NoSQL database', 'A relational database', 'A programming language', 'A web server'],
    correctAnswer: 'A NoSQL database',
    hint: 'It is a type of database.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mongodb',
    questionText: 'Which command is used to show all databases in MongoDB?',
    options: ['show dbs', 'list databases', 'show databases', 'list dbs'],
    correctAnswer: 'show dbs',
    hint: 'It starts with show.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the default port for MongoDB?',
    options: ['27017', '3306', '5432', '8080'],
    correctAnswer: '27017',
    hint: 'It is a five-digit number.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mongodb',
    questionText: 'Which data format does MongoDB use to store data?',
    options: ['JSON', 'XML', 'CSV', 'YAML'],
    correctAnswer: 'JSON',
    hint: 'It is a lightweight data format.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mongodb',
    questionText: 'Which command is used to insert a document into a collection?',
    options: ['insert()', 'add()', 'push()', 'append()'],
    correctAnswer: 'insert()',
    hint: 'It starts with insert.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mongodb',
    questionText: 'Which command is used to delete a document in MongoDB?',
    options: ['deleteOne()', 'remove()', 'delete()', 'drop()'],
    correctAnswer: 'deleteOne()',
    hint: 'It starts with delete.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mongodb',
    questionText: 'Which command is used to update a document in MongoDB?',
    options: ['updateOne()', 'modify()', 'change()', 'edit()'],
    correctAnswer: 'updateOne()',
    hint: 'It starts with update.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mongodb',
    questionText: 'What is a collection in MongoDB?',
    options: ['A group of documents', 'A single document', 'A database', 'A table'],
    correctAnswer: 'A group of documents',
    hint: 'It is similar to a table in relational databases.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mongodb',
    questionText: 'Which command is used to drop a collection in MongoDB?',
    options: ['drop()', 'delete()', 'remove()', 'clear()'],
    correctAnswer: 'drop()',
    hint: 'It starts with drop.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the shell command to connect to a MongoDB instance?',
    options: ['mongo', 'connect', 'mongodb', 'start'],
    correctAnswer: 'mongo',
    hint: 'It is a short command.',
    level: 'easy',
    marks: 1
  },

  // Medium Questions
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB find() method?',
    options: ['To retrieve documents', 'To insert documents', 'To update documents', 'To delete documents'],
    correctAnswer: 'To retrieve documents',
    hint: 'It is used to query data.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB aggregate() method?',
    options: ['To perform aggregation operations', 'To retrieve documents', 'To update documents', 'To delete documents'],
    correctAnswer: 'To perform aggregation operations',
    hint: 'It is used for data processing.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $match stage in aggregation?',
    options: ['To filter documents', 'To group documents', 'To sort documents', 'To project fields'],
    correctAnswer: 'To filter documents',
    hint: 'It is similar to a WHERE clause.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $group stage in aggregation?',
    options: ['To group documents', 'To filter documents', 'To sort documents', 'To project fields'],
    correctAnswer: 'To group documents',
    hint: 'It is used for grouping data.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $project stage in aggregation?',
    options: ['To project fields', 'To filter documents', 'To group documents', 'To sort documents'],
    correctAnswer: 'To project fields',
    hint: 'It is used to include or exclude fields.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $sort stage in aggregation?',
    options: ['To sort documents', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To sort documents',
    hint: 'It is used to order data.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $lookup stage in aggregation?',
    options: ['To perform a join operation', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To perform a join operation',
    hint: 'It is used to join collections.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $unwind stage in aggregation?',
    options: ['To deconstruct arrays', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To deconstruct arrays',
    hint: 'It is used to flatten arrays.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $limit stage in aggregation?',
    options: ['To limit the number of documents', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To limit the number of documents',
    hint: 'It is used to restrict results.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $skip stage in aggregation?',
    options: ['To skip a number of documents', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To skip a number of documents',
    hint: 'It is used to offset results.',
    level: 'medium',
    marks: 2
  },

  // Hard Questions
  {
    quizId: 'mongodb',
    questionText: 'What is a replica set in MongoDB?',
    options: ['A group of MongoDB servers', 'A single MongoDB server', 'A collection of documents', 'A database'],
    correctAnswer: 'A group of MongoDB servers',
    hint: 'It is used for high availability.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mongodb',
    questionText: 'What is sharding in MongoDB?',
    options: ['A method of distributing data', 'A method of indexing data', 'A method of querying data', 'A method of updating data'],
    correctAnswer: 'A method of distributing data',
    hint: 'It is used for horizontal scaling.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB oplog?',
    options: ['To track changes to the database', 'To store documents', 'To index data', 'To query data'],
    correctAnswer: 'To track changes to the database',
    hint: 'It is used in replication.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $geoNear stage in aggregation?',
    options: ['To perform geospatial queries', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To perform geospatial queries',
    hint: 'It is used for location-based queries.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $text index?',
    options: ['To perform text searches', 'To index data', 'To query data', 'To update data'],
    correctAnswer: 'To perform text searches',
    hint: 'It is used for full-text search.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $graphLookup stage in aggregation?',
    options: ['To perform graph traversal', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To perform graph traversal',
    hint: 'It is used for hierarchical data.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $bucket stage in aggregation?',
    options: ['To group documents into buckets', 'To filter documents', 'To sort documents', 'To project fields'],
    correctAnswer: 'To group documents into buckets',
    hint: 'It is used for data binning.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $facet stage in aggregation?',
    options: ['To perform multiple aggregations', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To perform multiple aggregations',
    hint: 'It is used for multi-faceted analysis.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $merge stage in aggregation?',
    options: ['To merge results into a collection', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To merge results into a collection',
    hint: 'It is used to write results.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'mongodb',
    questionText: 'What is the purpose of the MongoDB $out stage in aggregation?',
    options: ['To write results to a collection', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To write results to a collection',
    hint: 'It is used to output data.',
    level: 'hard',
    marks: 3
  }
];

// Adding 30 Linked List questions (10 easy, 10 medium, 10 hard)
const linkedListQuestions = [
  // Easy Questions
  {
    quizId: 'linkedlist',
    questionText: 'What is a linked list?',
    options: ['A linear data structure', 'A type of array', 'A database', 'A sorting algorithm'],
    correctAnswer: 'A linear data structure',
    hint: 'It consists of nodes connected by pointers.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is the first node of a linked list called?',
    options: ['Head', 'Tail', 'Root', 'Start'],
    correctAnswer: 'Head',
    hint: 'It is the starting point.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is the last node of a linked list called?',
    options: ['Tail', 'Head', 'End', 'Root'],
    correctAnswer: 'Tail',
    hint: 'It points to null.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'linkedlist',
    questionText: 'What does each node in a linked list contain?',
    options: ['Data and a pointer', 'Only data', 'Only a pointer', 'Data and an index'],
    correctAnswer: 'Data and a pointer',
    hint: 'It stores data and a reference.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is a singly linked list?',
    options: ['A list where each node points to the next node', 'A list where each node points to the previous node', 'A list with two pointers', 'A circular list'],
    correctAnswer: 'A list where each node points to the next node',
    hint: 'It has one direction.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is a doubly linked list?',
    options: ['A list where each node points to both the next and previous nodes', 'A list with only one pointer', 'A circular list', 'A list with no pointers'],
    correctAnswer: 'A list where each node points to both the next and previous nodes',
    hint: 'It has two directions.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is the time complexity of inserting a node at the beginning of a linked list?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(1)',
    hint: 'It is a constant time operation.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is the time complexity of searching for an element in a linked list?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(n)',
    hint: 'It requires traversal.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is a circular linked list?',
    options: ['A list where the last node points to the first node', 'A list with no end', 'A list with two pointers', 'A doubly linked list'],
    correctAnswer: 'A list where the last node points to the first node',
    hint: 'It forms a loop.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is the advantage of a linked list over an array?',
    options: ['Dynamic size', 'Faster access', 'Less memory', 'None of the above'],
    correctAnswer: 'Dynamic size',
    hint: 'It can grow or shrink.',
    level: 'easy',
    marks: 1
  },

  // Medium Questions
  {
    quizId: 'linkedlist',
    questionText: 'How do you reverse a linked list?',
    options: ['By changing the direction of pointers', 'By swapping data', 'By creating a new list', 'By sorting the list'],
    correctAnswer: 'By changing the direction of pointers',
    hint: 'It involves pointer manipulation.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you detect a cycle in a linked list?',
    options: ['Using two pointers', 'By counting nodes', 'By checking null pointers', 'By sorting the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is the time complexity of deleting a node in a linked list?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(1)',
    hint: 'It depends on the position.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you merge two sorted linked lists?',
    options: ['By comparing nodes', 'By concatenating lists', 'By sorting the lists', 'By reversing one list'],
    correctAnswer: 'By comparing nodes',
    hint: 'It involves traversal.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is the space complexity of a linked list?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(n)',
    hint: 'It depends on the number of nodes.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you find the middle element of a linked list?',
    options: ['Using two pointers', 'By counting nodes', 'By sorting the list', 'By reversing the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is the time complexity of appending a node to the end of a singly linked list?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(n)',
    hint: 'It requires traversal.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you remove duplicates from a linked list?',
    options: ['Using a hash set', 'By sorting the list', 'By reversing the list', 'By counting nodes'],
    correctAnswer: 'Using a hash set',
    hint: 'It involves storing visited nodes.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'linkedlist',
    questionText: 'What is the time complexity of searching for an element in a doubly linked list?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(n)',
    hint: 'It requires traversal.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you split a linked list into two halves?',
    options: ['Using two pointers', 'By counting nodes', 'By sorting the list', 'By reversing the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'medium',
    marks: 2
  },

  // Hard Questions
  {
    quizId: 'linkedlist',
    questionText: 'How do you detect and remove a cycle in a linked list?',
    options: ['Using two pointers', 'By counting nodes', 'By checking null pointers', 'By sorting the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you flatten a linked list?',
    options: ['By merging sublists', 'By sorting the list', 'By reversing the list', 'By concatenating lists'],
    correctAnswer: 'By merging sublists',
    hint: 'It involves recursion.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you rotate a linked list?',
    options: ['By changing pointers', 'By sorting the list', 'By reversing the list', 'By concatenating lists'],
    correctAnswer: 'By changing pointers',
    hint: 'It involves pointer manipulation.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you find the intersection point of two linked lists?',
    options: ['Using two pointers', 'By counting nodes', 'By sorting the lists', 'By reversing one list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves traversal.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you clone a linked list with random pointers?',
    options: ['Using a hash map', 'By sorting the list', 'By reversing the list', 'By concatenating lists'],
    correctAnswer: 'Using a hash map',
    hint: 'It involves storing references.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you reverse a doubly linked list?',
    options: ['By swapping pointers', 'By sorting the list', 'By reversing the list', 'By concatenating lists'],
    correctAnswer: 'By swapping pointers',
    hint: 'It involves pointer manipulation.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you find the kth node from the end of a linked list?',
    options: ['Using two pointers', 'By counting nodes', 'By sorting the list', 'By reversing the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you check if two linked lists are identical?',
    options: ['By comparing nodes', 'By sorting the lists', 'By reversing one list', 'By concatenating lists'],
    correctAnswer: 'By comparing nodes',
    hint: 'It involves traversal.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you find the length of a cycle in a linked list?',
    options: ['Using two pointers', 'By counting nodes', 'By checking null pointers', 'By sorting the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'linkedlist',
    questionText: 'How do you sort a linked list?',
    options: ['Using merge sort', 'By swapping nodes', 'By reversing the list', 'By concatenating lists'],
    correctAnswer: 'Using merge sort',
    hint: 'It is a divide-and-conquer algorithm.',
    level: 'hard',
    marks: 3
  }
];

// Adding 30 Array questions (10 easy, 10 medium, 10 hard)
const arrayQuestions = [
  // Easy Questions
  {
    quizId: 'array',
    questionText: 'What is an array?',
    options: ['A collection of elements', 'A single value', 'A function', 'A variable'],
    correctAnswer: 'A collection of elements',
    hint: 'It stores multiple values.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'array',
    questionText: 'How do you declare an array in JavaScript?',
    options: ['var arr = [];', 'var arr = {};', 'var arr = ();', 'var arr = <>;'],
    correctAnswer: 'var arr = [];',
    hint: 'It uses square brackets.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'array',
    questionText: 'What is the index of the first element in an array?',
    options: ['0', '1', '-1', 'None'],
    correctAnswer: '0',
    hint: 'It starts from zero.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'array',
    questionText: 'How do you access the third element of an array named arr?',
    options: ['arr[2]', 'arr[3]', 'arr[1]', 'arr[0]'],
    correctAnswer: 'arr[2]',
    hint: 'Indexing starts from zero.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'array',
    questionText: 'What is the length of an array arr = [1, 2, 3]?',
    options: ['3', '2', '4', 'None'],
    correctAnswer: '3',
    hint: 'It counts the number of elements.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'array',
    questionText: 'How do you add an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()',
    hint: 'It is a common array method.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'array',
    questionText: 'How do you remove the last element of an array?',
    options: ['pop()', 'push()', 'shift()', 'unshift()'],
    correctAnswer: 'pop()',
    hint: 'It modifies the original array.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'array',
    questionText: 'What is the output of the following code: console.log([1, 2, 3].length)?',
    options: ['3', '2', '4', 'None'],
    correctAnswer: '3',
    hint: 'It counts the number of elements.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'array',
    questionText: 'How do you check if an array includes a specific element?',
    options: ['includes()', 'contains()', 'has()', 'exists()'],
    correctAnswer: 'includes()',
    hint: 'It is a built-in method.',
    level: 'easy',
    marks: 1
  },
  {
    quizId: 'array',
    questionText: 'What is the output of the following code: console.log([].length)?',
    options: ['0', '1', 'undefined', 'None'],
    correctAnswer: '0',
    hint: 'It is an empty array.',
    level: 'easy',
    marks: 1
  },

  // Medium Questions
  {
    quizId: 'array',
    questionText: 'How do you merge two arrays in JavaScript?',
    options: ['concat()', 'merge()', 'combine()', 'append()'],
    correctAnswer: 'concat()',
    hint: 'It is a built-in method.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'array',
    questionText: 'How do you find the index of an element in an array?',
    options: ['indexOf()', 'findIndex()', 'search()', 'locate()'],
    correctAnswer: 'indexOf()',
    hint: 'It returns the position.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'array',
    questionText: 'What is the output of the following code: console.log([1, 2, 3].slice(1, 2))?',
    options: ['[2]', '[1, 2]', '[2, 3]', '[1]'],
    correctAnswer: '[2]',
    hint: 'It extracts a portion.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'array',
    questionText: 'How do you remove the first element of an array?',
    options: ['shift()', 'pop()', 'unshift()', 'push()'],
    correctAnswer: 'shift()',
    hint: 'It modifies the original array.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'array',
    questionText: 'What is the output of the following code: console.log([1, 2, 3].splice(1, 1))?',
    options: ['[2]', '[1, 2]', '[2, 3]', '[1]'],
    correctAnswer: '[2]',
    hint: 'It removes elements.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'array',
    questionText: 'How do you sort an array in ascending order?',
    options: ['sort()', 'order()', 'arrange()', 'sequence()'],
    correctAnswer: 'sort()',
    hint: 'It is a built-in method.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'array',
    questionText: 'What is the output of the following code: console.log([1, 2, 3].reverse())?',
    options: ['[3, 2, 1]', '[1, 2, 3]', '[2, 3, 1]', '[1, 3, 2]'],
    correctAnswer: '[3, 2, 1]',
    hint: 'It reverses the array.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'array',
    questionText: 'How do you iterate over an array in JavaScript?',
    options: ['forEach()', 'map()', 'filter()', 'reduce()'],
    correctAnswer: 'forEach()',
    hint: 'It is a loop method.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'array',
    questionText: 'What is the output of the following code: console.log([1, 2, 3].map(x => x * 2))?',
    options: ['[2, 4, 6]', '[1, 2, 3]', '[3, 6, 9]', '[1, 4, 9]'],
    correctAnswer: '[2, 4, 6]',
    hint: 'It transforms each element.',
    level: 'medium',
    marks: 2
  },
  {
    quizId: 'array',
    questionText: 'How do you filter elements of an array?',
    options: ['filter()', 'map()', 'reduce()', 'forEach()'],
    correctAnswer: 'filter()',
    hint: 'It creates a new array.',
    level: 'medium',
    marks: 2
  },

  // Hard Questions
  {
    quizId: 'array',
    questionText: 'How do you find the maximum value in an array?',
    options: ['Math.max(...arr)', 'arr.max()', 'max(arr)', 'Math.max(arr)'],
    correctAnswer: 'Math.max(...arr)',
    hint: 'It uses the spread operator.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'array',
    questionText: 'How do you flatten a nested array?',
    options: ['flat()', 'flatten()', 'reduce()', 'concat()'],
    correctAnswer: 'flat()',
    hint: 'It is a built-in method.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'array',
    questionText: 'What is the output of the following code: console.log([1, [2, [3]]].flat(2))?',
    options: ['[1, 2, 3]', '[1, [2, 3]]', '[1, 2, [3]]', '[1, [2, [3]]]'],
    correctAnswer: '[1, 2, 3]',
    hint: 'It flattens the array.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'array',
    questionText: 'How do you find the sum of all elements in an array?',
    options: ['reduce()', 'sum()', 'add()', 'accumulate()'],
    correctAnswer: 'reduce()',
    hint: 'It accumulates values.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'array',
    questionText: 'How do you remove duplicates from an array?',
    options: ['new Set(arr)', 'filter()', 'map()', 'reduce()'],
    correctAnswer: 'new Set(arr)',
    hint: 'It uses a Set.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'array',
    questionText: 'How do you shuffle elements of an array?',
    options: ['sort(() => Math.random() - 0.5)', 'shuffle()', 'randomize()', 'mix()'],
    correctAnswer: 'sort(() => Math.random() - 0.5)',
    hint: 'It uses sort.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'array',
    questionText: 'How do you find the intersection of two arrays?',
    options: ['filter()', 'map()', 'reduce()', 'concat()'],
    correctAnswer: 'filter()',
    hint: 'It involves filtering.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'array',
    questionText: 'How do you rotate an array?',
    options: ['slice() and concat()', 'reverse()', 'sort()', 'splice()'],
    correctAnswer: 'slice() and concat()',
    hint: 'It involves slicing.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'array',
    questionText: 'How do you find the kth largest element in an array?',
    options: ['sort() and index', 'filter()', 'map()', 'reduce()'],
    correctAnswer: 'sort() and index',
    hint: 'It involves sorting.',
    level: 'hard',
    marks: 3
  },
  {
    quizId: 'array',
    questionText: 'How do you partition an array into chunks of size n?',
    options: ['slice() in a loop', 'map()', 'filter()', 'reduce()'],
    correctAnswer: 'slice() in a loop',
    hint: 'It involves slicing.',
    level: 'hard',
    marks: 3
  }
];

questions.push(...pythonQuestions);
questions.push(...mysqlQuestions);
questions.push(...mongoDBQuestions);
questions.push(...linkedListQuestions);
questions.push(...arrayQuestions);

module.exports = questions;