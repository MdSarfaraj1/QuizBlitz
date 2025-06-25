const mongoose = require('mongoose');

const questions = [
  // Easy Questions
  {
    questionText: 'What is the correct syntax to print a message in the console in JavaScript?',
    options: ['console.log("message")', 'print("message")', 'echo("message")', 'System.out.println("message")'],
    correctAnswer: 'console.log("message")',
     
    hint: 'It starts with console.',
    level: 'easy',
  marks:1,
  category: 'JavaScript' },
  {
    questionText: 'Which of the following is a JavaScript data type?',
    options: ['String', 'Number', 'Boolean', 'All of the above'],
    correctAnswer: 'All of the above',
     
    hint: 'JavaScript supports multiple data types.',
    level: 'easy',
  marks:1,
  category: 'JavaScript' },
  {
    questionText: 'How do you declare a variable in JavaScript?',
    options: ['var', 'let', 'const', 'All of the above'],
    correctAnswer: 'All of the above',
     
    hint: 'JavaScript has multiple ways to declare variables.',
    level: 'easy',
  marks:1,
  category: 'JavaScript' },
  {
    questionText: 'Which company developed JavaScript?',
    options: ['Microsoft', 'Netscape', 'Google', 'Sun Microsystems'],
    correctAnswer: 'Netscape',
     
    hint: 'It was developed for web browsers.',
    level: 'easy',
  marks:1,
  category: 'JavaScript' },
  {
    questionText: 'What is the correct way to write a JavaScript array?',
    options: ['var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = ["red", "green", "blue"]', 'var colors = "red", "green", "blue"', 'var colors = {"red", "green", "blue"}'],
    correctAnswer: 'var colors = ["red", "green", "blue"]',
     
    hint: 'Arrays use square brackets.',
    level: 'easy',
  marks:1,
  category: 'JavaScript' },
  {
    questionText: 'How do you call a function named myFunction in JavaScript?',
    options: ['call myFunction()', 'myFunction()', 'call function myFunction()', 'Call.myFunction()'],
    correctAnswer: 'myFunction()',
     
    hint: 'Functions are called using parentheses.',
    level: 'easy',
  marks:1,
  category: 'JavaScript' },
  {
    questionText: 'Which event occurs when the user clicks on an HTML element?',
    options: ['onchange', 'onclick', 'onmouseover', 'onmouseclick'],
    correctAnswer: 'onclick',
     
    hint: 'It starts with "on".',
    level: 'easy',
  marks:1,
  category: 'JavaScript' },
  {
    questionText: 'How do you add a comment in JavaScript?',
    options: ['<!-- This is a comment -->', '// This is a comment', '/* This is a comment */', '** This is a comment **'],
    correctAnswer: '// This is a comment',
     
    hint: 'It starts with two slashes.',
    level: 'easy',
  marks:1,
  category: 'JavaScript' },
  {
    questionText: 'What is the correct way to write a JavaScript object?',
    options: ['var obj = {name: "John", age: 30}', 'var obj = (name: "John", age: 30)', 'var obj = [name: "John", age: 30]', 'var obj = "name: John, age: 30"'],
    correctAnswer: 'var obj = {name: "John", age: 30}',
     
    hint: 'Objects use curly braces.',
    level: 'easy',
  marks:1,
  category: 'JavaScript' },
  {
    questionText: 'What is the output of the following code: console.log(1 + "1")?',
    options: ['2', '11', 'undefined', 'NaN'],
    correctAnswer: '11',
     
    hint: 'It performs string concatenation.',
    level: 'easy',
  marks:1,
  category: 'JavaScript' },

  // Medium Questions
  {
    questionText: 'What is the output of the following code: console.log(typeof null)?',
    options: ['object', 'null', 'undefined', 'string'],
    correctAnswer: 'object',
     
    hint: 'It is a known bug in JavaScript.',
    level: 'medium',
  marks:2,
  category: 'JavaScript' },
  {
    questionText: 'Which method is used to add an element to the end of an array in JavaScript?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()',
     
    hint: 'It is a common array method.',
    level: 'medium',
  marks:2,
  category: 'JavaScript' },
  {
    questionText: 'What is the purpose of the JavaScript isNaN() function?',
    options: ['To check if a value is NaN', 'To check if a value is a number', 'To convert a value to NaN', 'None of the above'],
    correctAnswer: 'To check if a value is NaN',
     
    hint: 'It checks for Not-a-Number.',
    level: 'medium',
  marks:2,
  category: 'JavaScript' },
  {
    questionText: 'What is the output of the following code: console.log([] + []);',
    options: ['""', '[]', 'undefined', 'NaN'],
    correctAnswer: '""',
     
    hint: 'It concatenates two empty arrays.',
    level: 'medium',
  marks:2,
  category: 'JavaScript' },
  {
    questionText: 'Which keyword is used to define a constant in JavaScript?',
    options: ['let', 'var', 'const', 'constant'],
    correctAnswer: 'const',
     
    hint: 'It is a reserved keyword.',
    level: 'medium',
  marks:2,
  category: 'JavaScript' },
  {
    questionText: 'What is the purpose of the JavaScript map() function?',
    options: ['To iterate over an array', 'To transform each element of an array', 'To filter elements of an array', 'To find an element in an array'],
    correctAnswer: 'To transform each element of an array',
     
    hint: 'It creates a new array.',
    level: 'medium',
  marks:2,
  category: 'JavaScript' },
  {
    questionText: 'What is the output of the following code: console.log(typeof NaN);',
    options: ['number', 'NaN', 'undefined', 'string'],
    correctAnswer: 'number',
     
    hint: 'NaN is a special value in JavaScript.',
    level: 'medium',
  marks:2,
  category: 'JavaScript' },
  {
    questionText: 'Which method is used to remove the last element of an array in JavaScript?',
    options: ['pop()', 'push()', 'shift()', 'unshift()'],
    correctAnswer: 'pop()',
     
    hint: 'It modifies the original array.',
    level: 'medium',
  marks:2,
  category: 'JavaScript' },
  {
    questionText: 'What is the output of the following code: console.log(1 == "1");',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 'true',
     
    hint: 'It performs type coercion.',
    level: 'medium',
  marks:2,
  category: 'JavaScript' },
  {
    questionText: 'What is the purpose of the JavaScript reduce() function?',
    options: ['To reduce the size of an array', 'To apply a function to each element and accumulate a result', 'To filter elements of an array', 'To find the maximum value in an array'],
    correctAnswer: 'To apply a function to each element and accumulate a result',
     
    hint: 'It reduces an array to a single value.',
    level: 'medium',
  marks:2,
  category: 'JavaScript' },

  // Hard Questions
  {
    questionText: 'What is the difference between == and === in JavaScript?',
    options: ['== checks value only, === checks value and type', 'Both are the same', '== checks type only, === checks value and type', 'None of the above'],
    correctAnswer: '== checks value only, === checks value and type',
     
    hint: 'One checks type as well.',
    level: 'hard',
  marks:3,
  category: 'JavaScript' },
  {
    questionText: 'What is a closure in JavaScript?',
    options: ['A function having access to its outer scope', 'A function without parameters', 'A function that returns another function', 'None of the above'],
    correctAnswer: 'A function having access to its outer scope',
     
    hint: 'It is related to scope.',
    level: 'hard',
  marks:3,
  category: 'JavaScript' },
  {
    questionText: 'What is the output of the following code: console.log(0.1 + 0.2 === 0.3)?',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 'false',
     
    hint: 'It is due to floating-point precision.',
    level: 'hard',
  marks:3,
  category: 'JavaScript' },
  {
    questionText: 'What is the output of the following code: console.log([] == ![]);',
    options: ['true', 'false', 'undefined', 'NaN'],
    correctAnswer: 'true',
     
    hint: 'It involves type coercion and logical negation.',
    level: 'hard',
  marks:3,
  category: 'JavaScript' },
  {
    questionText: 'What is the purpose of the JavaScript bind() method?',
    options: ['To bind an event to an element', 'To create a new function with a specific this value', 'To call a function immediately', 'To apply a function to an array'],
    correctAnswer: 'To create a new function with a specific this value',
     
    hint: 'It is used to set the this context.',
    level: 'hard',
  marks:3,
  category: 'JavaScript' },
  {
    questionText: 'What is the output of the following code: console.log(typeof function(){});',
    options: ['function', 'object', 'undefined', 'string'],
    correctAnswer: 'function',
     
    hint: 'Functions are first-class objects in JavaScript.',
    level: 'hard',
  marks:3,
  category: 'JavaScript' },
  {
    questionText: 'What is the purpose of the JavaScript Object.freeze() method?',
    options: ['To prevent adding new properties to an object', 'To make an object immutable', 'To delete all properties of an object', 'To clone an object'],
    correctAnswer: 'To make an object immutable',
     
    hint: 'It prevents modification of an object.',
    level: 'hard',
  marks:3,
  category: 'JavaScript' },
  {
    questionText: 'What is the output of the following code: console.log(0.1 + 0.2);',
    options: ['0.3', '0.30000000000000004', 'undefined', 'NaN'],
    correctAnswer: '0.30000000000000004',
     
    hint: 'It is due to floating-point precision.',
    level: 'hard',
  marks:3,
  category: 'JavaScript' },
  {
    questionText: 'What is the purpose of the JavaScript async/await syntax?',
    options: ['To handle asynchronous operations', 'To create promises', 'To define a function', 'To loop through an array'],
    correctAnswer: 'To handle asynchronous operations',
     
    hint: 'It is used with promises.',
    level: 'hard',
  marks:3,
  category: 'JavaScript' },
  {
    questionText: 'What is the output of the following code: console.log(typeof Symbol());',
    options: ['symbol', 'object', 'undefined', 'string'],
    correctAnswer: 'symbol',
     
    hint: 'It is a unique primitive type.',
    level: 'hard',
  marks:3,
  category: 'JavaScript' },

  // Easy Questions - Python
  {
    questionText: 'What is the correct file extension for Python files?',
    options: ['.py', '.python', '.pt', '.pyt'],
    correctAnswer: '.py',
    hint: 'It is a two-letter extension.',
    level: 'easy',
    marks: 1,
    category: 'Python'
  },
  {
    questionText: 'Which keyword is used to define a function in Python?',
    options: ['function', 'def', 'func', 'define'],
    correctAnswer: 'def',
    hint: 'It is a three-letter keyword.',
    level: 'easy',
    marks: 1,
    category: 'Python'
  },
  {
    questionText: 'How do you print a message in Python?',
    options: ['print("message")', 'echo("message")', 'console.log("message")', 'System.out.println("message")'],
    correctAnswer: 'print("message")',
    hint: 'It starts with print.',
    level: 'easy',
    marks: 1,
    category: 'Python'
  },
  {
    questionText: 'Which of the following is a Python data type?',
    options: ['List', 'Dictionary', 'Tuple', 'All of the above'],
    correctAnswer: 'All of the above',
    hint: 'Python supports multiple data types.',
    level: 'easy',
    marks: 1,
    category: 'Python'
  },
  {
    questionText: 'How do you start a comment in Python?',
    options: ['# This is a comment', '// This is a comment', '/* This is a comment */', '<!-- This is a comment -->'],
    correctAnswer: '# This is a comment',
    hint: 'It starts with a hash symbol.',
    level: 'easy',
    marks: 1,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print(2 + 3)?',
    options: ['5', '23', 'undefined', 'NaN'],
    correctAnswer: '5',
    hint: 'It performs addition.',
    level: 'easy',
    marks: 1,
    category: 'Python'
  },
  {
    questionText: 'Which keyword is used to create a loop in Python?',
    options: ['for', 'loop', 'iterate', 'while'],
    correctAnswer: 'for',
    hint: 'It is a three-letter keyword.',
    level: 'easy',
    marks: 1,
    category: 'Python'
  },
  {
    questionText: 'What is the correct way to create a list in Python?',
    options: ['list = [1, 2, 3]', 'list = (1, 2, 3)', 'list = {1, 2, 3}', 'list = "1, 2, 3"'],
    correctAnswer: 'list = [1, 2, 3]',
    hint: 'Lists use square brackets.',
    level: 'easy',
    marks: 1,
    category: 'Python'
  },
  {
    questionText: 'Which function is used to get the length of a list in Python?',
    options: ['length()', 'len()', 'size()', 'count()'],
    correctAnswer: 'len()',
    hint: 'It is a three-letter function.',
    level: 'easy',
    marks: 1,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print("Hello" + " World")?',
    options: ['Hello World', 'HelloWorld', 'undefined', 'NaN'],
    correctAnswer: 'Hello World',
    hint: 'It concatenates strings.',
    level: 'easy',
    marks: 1,
    category: 'Python'
  },

  // Medium Questions - Python
  {
    questionText: 'What is the output of the following code: print(type(5))?',
    options: ['int', 'float', 'str', 'None'],
    correctAnswer: 'int',
    hint: 'It is an integer type.',
    level: 'medium',
    marks: 2,
    category: 'Python'
  },
  {
    questionText: 'Which method is used to add an element to the end of a list in Python?',
    options: ['append()', 'add()', 'insert()', 'push()'],
    correctAnswer: 'append()',
    hint: 'It is a common list method.',
    level: 'medium',
    marks: 2,
    category: 'Python'
  },
  {
    questionText: 'What is the purpose of the Python range() function?',
    options: ['To create a sequence of numbers', 'To iterate over a list', 'To filter elements of a list', 'To find an element in a list'],
    correctAnswer: 'To create a sequence of numbers',
    hint: 'It generates numbers.',
    level: 'medium',
    marks: 2,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print(10 // 3)?',
    options: ['3', '3.33', '4', 'None'],
    correctAnswer: '3',
    hint: 'It performs floor division.',
    level: 'medium',
    marks: 2,
    category: 'Python'
  },
  {
    questionText: 'Which keyword is used to handle exceptions in Python?',
    options: ['try', 'catch', 'except', 'finally'],
    correctAnswer: 'except',
    hint: 'It is used with try.',
    level: 'medium',
    marks: 2,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print("5" * 3)?',
    options: ['555', '15', 'undefined', 'NaN'],
    correctAnswer: '555',
    hint: 'It repeats the string.',
    level: 'medium',
    marks: 2,
    category: 'Python'
  },
  {
    questionText: 'Which method is used to remove an element from a list in Python?',
    options: ['remove()', 'delete()', 'pop()', 'discard()'],
    correctAnswer: 'remove()',
    hint: 'It modifies the original list.',
    level: 'medium',
    marks: 2,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print(2 ** 3)?',
    options: ['8', '6', '9', 'None'],
    correctAnswer: '8',
    hint: 'It performs exponentiation.',
    level: 'medium',
    marks: 2,
    category: 'Python'
  },
  {
    questionText: 'What is the purpose of the Python zip() function?',
    options: ['To combine two lists into tuples', 'To iterate over a list', 'To filter elements of a list', 'To find an element in a list'],
    correctAnswer: 'To combine two lists into tuples',
    hint: 'It pairs elements.',
    level: 'medium',
    marks: 2,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print(len("Hello"))?',
    options: ['5', '6', '4', 'None'],
    correctAnswer: '5',
    hint: 'It counts the characters.',
    level: 'medium',
    marks: 2,
    category: 'Python'
  },

  // Hard Questions - Python
  {
    questionText: 'What is a Python decorator?',
    options: ['A function that modifies another function', 'A function without parameters', 'A function that returns another function', 'None of the above'],
    correctAnswer: 'A function that modifies another function',
    hint: 'It is related to functions.',
    level: 'hard',
    marks: 3,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print(0.1 + 0.2 == 0.3)?',
    options: ['True', 'False', 'undefined', 'NaN'],
    correctAnswer: 'False',
    hint: 'It is due to floating-point precision.',
    level: 'hard',
    marks: 3,
    category: 'Python'
  },
  {
    questionText: 'What is the purpose of the Python @staticmethod decorator?',
    options: ['To define a static method', 'To define a class method', 'To define an instance method', 'None of the above'],
    correctAnswer: 'To define a static method',
    hint: 'It is used in classes.',
    level: 'hard',
    marks: 3,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print(type(lambda x: x))?',
    options: ['function', 'lambda', 'None', 'str'],
    correctAnswer: 'function',
    hint: 'Lambdas are functions.',
    level: 'hard',
    marks: 3,
    category: 'Python'
  },
  {
    questionText: 'What is the purpose of the Python with statement?',
    options: ['To manage resources', 'To handle exceptions', 'To define a function', 'To loop through an array'],
    correctAnswer: 'To manage resources',
    hint: 'It is used with files.',
    level: 'hard',
    marks: 3,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print({1, 2, 3} & {2, 3, 4})?',
    options: ['{2, 3}', '{1, 2, 3, 4}', '{1}', 'None'],
    correctAnswer: '{2, 3}',
    hint: 'It performs set intersection.',
    level: 'hard',
    marks: 3,
    category: 'Python'
  },
  {
    questionText: 'What is the purpose of the Python super() function?',
    options: ['To call a parent class method', 'To define a static method', 'To define a class method', 'None of the above'],
    correctAnswer: 'To call a parent class method',
    hint: 'It is used in inheritance.',
    level: 'hard',
    marks: 3,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print(sorted([3, 1, 2]))?',
    options: ['[1, 2, 3]', '[3, 2, 1]', '[2, 1, 3]', 'None'],
    correctAnswer: '[1, 2, 3]',
    hint: 'It sorts the list.',
    level: 'hard',
    marks: 3,
    category: 'Python'
  },
  {
    questionText: 'What is the purpose of the Python __init__ method?',
    options: ['To initialize an object', 'To define a static method', 'To define a class method', 'None of the above'],
    correctAnswer: 'To initialize an object',
    hint: 'It is a constructor.',
    level: 'hard',
    marks: 3,
    category: 'Python'
  },
  {
    questionText: 'What is the output of the following code: print({x: x**2 for x in range(3)})?',
    options: ['{0: 0, 1: 1, 2: 4}', '{1: 1, 2: 4}', '{0: 0, 1: 1}', 'None'],
    correctAnswer: '{0: 0, 1: 1, 2: 4}',
    hint: 'It creates a dictionary.',
    level: 'hard',
    marks: 3,
    category: 'Python'
  },
  {
    questionText: 'What does SQL stand for?',
    options: ['Structured Query Language', 'Simple Query Language', 'Structured Question Language', 'Simple Question Language'],
    correctAnswer: 'Structured Query Language',
    hint: 'It is used to interact with databases.',
    level: 'easy',
    marks: 1,
    category: 'MySQL'
  },
  {
    questionText: 'Which command is used to retrieve data from a database?',
    options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    correctAnswer: 'SELECT',
    hint: 'It is used to fetch data.',
    level: 'easy',
    marks: 1,
    category: 'MySQL'
  },
  {
    questionText: 'Which keyword is used to sort the result-set in SQL?',
    options: ['ORDER BY', 'SORT BY', 'GROUP BY', 'FILTER BY'],
    correctAnswer: 'ORDER BY',
    hint: 'It orders the rows.',
    level: 'easy',
    marks: 1,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL statement is used to insert new data in a database?',
    options: ['INSERT INTO', 'ADD NEW', 'INSERT NEW', 'ADD INTO'],
    correctAnswer: 'INSERT INTO',
    hint: 'It starts with INSERT.',
    level: 'easy',
    marks: 1,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL statement is used to update data in a database?',
    options: ['UPDATE', 'MODIFY', 'CHANGE', 'ALTER'],
    correctAnswer: 'UPDATE',
    hint: 'It modifies existing data.',
    level: 'easy',
    marks: 1,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL statement is used to delete data from a database?',
    options: ['DELETE', 'REMOVE', 'DROP', 'CLEAR'],
    correctAnswer: 'DELETE',
    hint: 'It removes rows.',
    level: 'easy',
    marks: 1,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL function is used to count the number of rows in a table?',
    options: ['COUNT()', 'SUM()', 'TOTAL()', 'ROWS()'],
    correctAnswer: 'COUNT()',
    hint: 'It starts with COUNT.',
    level: 'easy',
    marks: 1,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL clause is used to filter records?',
    options: ['WHERE', 'FILTER', 'HAVING', 'GROUP BY'],
    correctAnswer: 'WHERE',
    hint: 'It specifies conditions.',
    level: 'easy',
    marks: 1,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL statement is used to create a new table?',
    options: ['CREATE TABLE', 'NEW TABLE', 'ADD TABLE', 'MAKE TABLE'],
    correctAnswer: 'CREATE TABLE',
    hint: 'It starts with CREATE.',
    level: 'easy',
    marks: 1,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL keyword is used to retrieve unique values?',
    options: ['DISTINCT', 'UNIQUE', 'FILTER', 'SEPARATE'],
    correctAnswer: 'DISTINCT',
    hint: 'It removes duplicates.',
    level: 'easy',
    marks: 1,
    category: 'MySQL'
  },

  // Medium Questions - MySQL
  {
    questionText: 'What is the default port for MySQL?',
    options: ['3306', '1433', '1521', '5432'],
    correctAnswer: '3306',
    hint: 'It is a four-digit number.',
    level: 'medium',
    marks: 2,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL clause is used to group rows that have the same values?',
    options: ['GROUP BY', 'ORDER BY', 'HAVING', 'FILTER'],
    correctAnswer: 'GROUP BY',
    hint: 'It groups rows.',
    level: 'medium',
    marks: 2,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL statement is used to create a database?',
    options: ['CREATE DATABASE', 'NEW DATABASE', 'ADD DATABASE', 'MAKE DATABASE'],
    correctAnswer: 'CREATE DATABASE',
    hint: 'It starts with CREATE.',
    level: 'medium',
    marks: 2,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL function is used to calculate the sum of a column?',
    options: ['SUM()', 'COUNT()', 'TOTAL()', 'ADD()'],
    correctAnswer: 'SUM()',
    hint: 'It starts with SUM.',
    level: 'medium',
    marks: 2,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL keyword is used to specify a condition for aggregate functions?',
    options: ['HAVING', 'WHERE', 'FILTER', 'GROUP BY'],
    correctAnswer: 'HAVING',
    hint: 'It is used with GROUP BY.',
    level: 'medium',
    marks: 2,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL command is used to remove a table from a database?',
    options: ['DROP TABLE', 'DELETE TABLE', 'REMOVE TABLE', 'CLEAR TABLE'],
    correctAnswer: 'DROP TABLE',
    hint: 'It starts with DROP.',
    level: 'medium',
    marks: 2,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL statement is used to modify the structure of a table?',
    options: ['ALTER TABLE', 'MODIFY TABLE', 'CHANGE TABLE', 'UPDATE TABLE'],
    correctAnswer: 'ALTER TABLE',
    hint: 'It starts with ALTER.',
    level: 'medium',
    marks: 2,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL keyword is used to combine rows from two or more tables?',
    options: ['JOIN', 'MERGE', 'UNION', 'COMBINE'],
    correctAnswer: 'JOIN',
    hint: 'It is used to combine tables.',
    level: 'medium',
    marks: 2,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL function is used to find the maximum value in a column?',
    options: ['MAX()', 'MIN()', 'GREATEST()', 'HIGHEST()'],
    correctAnswer: 'MAX()',
    hint: 'It starts with MAX.',
    level: 'medium',
    marks: 2,
    category: 'MySQL'
  },
  {
    questionText: 'Which SQL function is used to find the minimum value in a column?',
    options: ['MIN()', 'MAX()', 'LEAST()', 'LOWEST()'],
    correctAnswer: 'MIN()',
    hint: 'It starts with MIN.',
    level: 'medium',
    marks: 2,
    category: 'MySQL'
  },

  // Hard Questions - MySQL
  {
    questionText: 'What is a foreign key in MySQL?',
    options: ['A key that links two tables', 'A key that uniquely identifies a row', 'A key that is used for indexing', 'None of the above'],
    correctAnswer: 'A key that links two tables',
    hint: 'It is used for relationships.',
    level: 'hard',
    marks: 3,
    category: 'MySQL'
  },
  {
    questionText: 'What is the purpose of the MySQL AUTO_INCREMENT attribute?',
    options: ['To automatically generate unique values', 'To increment a column by 1', 'To create a primary key', 'None of the above'],
    correctAnswer: 'To automatically generate unique values',
    hint: 'It is used for primary keys.',
    level: 'hard',
    marks: 3,
    category: 'MySQL'
  },
  {
    questionText: 'What is the purpose of the MySQL PRIMARY KEY constraint?',
    options: ['To uniquely identify each row', 'To link two tables', 'To create an index', 'None of the above'],
    correctAnswer: 'To uniquely identify each row',
    hint: 'It ensures uniqueness.',
    level: 'hard',
    marks: 3,
    category: 'MySQL'
  },
  {
    questionText: 'What is the purpose of the MySQL UNIQUE constraint?',
    options: ['To ensure all values in a column are unique', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To ensure all values in a column are unique',
    hint: 'It prevents duplicates.',
    level: 'hard',
    marks: 3,
    category: 'MySQL'
  },
  {
    questionText: 'What is the purpose of the MySQL INDEX?',
    options: ['To speed up queries', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To speed up queries',
    hint: 'It improves performance.',
    level: 'hard',
    marks: 3,
    category: 'MySQL'
  },
  {
    questionText: 'What is the purpose of the MySQL TRIGGER?',
    options: ['To automatically execute a statement', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To automatically execute a statement',
    hint: 'It is triggered by events.',
    level: 'hard',
    marks: 3,
    category: 'MySQL'
  },
  {
    questionText: 'What is the purpose of the MySQL VIEW?',
    options: ['To create a virtual table', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To create a virtual table',
    hint: 'It is a stored query.',
    level: 'hard',
    marks: 3,
    category: 'MySQL'
  },
  {
    questionText: 'What is the purpose of the MySQL TRANSACTION?',
    options: ['To ensure data integrity', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To ensure data integrity',
    hint: 'It is used for atomic operations.',
    level: 'hard',
    marks: 3,
    category: 'MySQL'
  },
  {
    questionText: 'What is the purpose of the MySQL FOREIGN KEY constraint?',
    options: ['To link two tables', 'To create a primary key', 'To ensure uniqueness', 'None of the above'],
    correctAnswer: 'To link two tables',
    hint: 'It is used for relationships.',
    level: 'hard',
    marks: 3,
    category: 'MySQL'
  },
  {
    questionText: 'What is the purpose of the MySQL CASCADE option?',
    options: ['To automatically update or delete related rows', 'To create a primary key', 'To link two tables', 'None of the above'],
    correctAnswer: 'To automatically update or delete related rows',
    hint: 'It is used with foreign keys.',
    level: 'hard',
    marks: 3,
    category: 'MySQL'
  },
  {
    questionText: 'What is MongoDB?',
    options: ['A NoSQL database', 'A relational database', 'A programming language', 'A web server'],
    correctAnswer: 'A NoSQL database',
    hint: 'It is a type of database.',
    level: 'easy',
    marks: 1,
    category: 'MongoDB'
  },
  {
    questionText: 'Which command is used to show all databases in MongoDB?',
    options: ['show dbs', 'list databases', 'show databases', 'list dbs'],
    correctAnswer: 'show dbs',
    hint: 'It starts with show.',
    level: 'easy',
    marks: 1,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the default port for MongoDB?',
    options: ['27017', '3306', '5432', '8080'],
    correctAnswer: '27017',
    hint: 'It is a five-digit number.',
    level: 'easy',
    marks: 1,
    category: 'MongoDB'
  },
  {
    questionText: 'Which data format does MongoDB use to store data?',
    options: ['JSON', 'XML', 'CSV', 'YAML'],
    correctAnswer: 'JSON',
    hint: 'It is a lightweight data format.',
    level: 'easy',
    marks: 1,
    category: 'MongoDB'
  },
  {
    questionText: 'Which command is used to insert a document into a collection?',
    options: ['insert()', 'add()', 'push()', 'append()'],
    correctAnswer: 'insert()',
    hint: 'It starts with insert.',
    level: 'easy',
    marks: 1,
    category: 'MongoDB'
  },
  {
    questionText: 'Which command is used to delete a document in MongoDB?',
    options: ['deleteOne()', 'remove()', 'delete()', 'drop()'],
    correctAnswer: 'deleteOne()',
    hint: 'It starts with delete.',
    level: 'easy',
    marks: 1,
    category: 'MongoDB'
  },
  {
    questionText: 'Which command is used to update a document in MongoDB?',
    options: ['updateOne()', 'modify()', 'change()', 'edit()'],
    correctAnswer: 'updateOne()',
    hint: 'It starts with update.',
    level: 'easy',
    marks: 1,
    category: 'MongoDB'
  },
  {
    questionText: 'What is a collection in MongoDB?',
    options: ['A group of documents', 'A single document', 'A database', 'A table'],
    correctAnswer: 'A group of documents',
    hint: 'It is similar to a table in relational databases.',
    level: 'easy',
    marks: 1,
    category: 'MongoDB'
  },
  {
    questionText: 'Which command is used to drop a collection in MongoDB?',
    options: ['drop()', 'delete()', 'remove()', 'clear()'],
    correctAnswer: 'drop()',
    hint: 'It starts with drop.',
    level: 'easy',
    marks: 1,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the shell command to connect to a MongoDB instance?',
    options: ['mongo', 'connect', 'mongodb', 'start'],
    correctAnswer: 'mongo',
    hint: 'It is a short command.',
    level: 'easy',
    marks: 1,
    category: 'MongoDB'
  },

  // Medium Questions - MongoDB
  {
    questionText: 'What is the purpose of the MongoDB find() method?',
    options: ['To retrieve documents', 'To insert documents', 'To update documents', 'To delete documents'],
    correctAnswer: 'To retrieve documents',
    hint: 'It is used to query data.',
    level: 'medium',
    marks: 2,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB aggregate() method?',
    options: ['To perform aggregation operations', 'To retrieve documents', 'To update documents', 'To delete documents'],
    correctAnswer: 'To perform aggregation operations',
    hint: 'It is used for data processing.',
    level: 'medium',
    marks: 2,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $match stage in aggregation?',
    options: ['To filter documents', 'To group documents', 'To sort documents', 'To project fields'],
    correctAnswer: 'To filter documents',
    hint: 'It is similar to a WHERE clause.',
    level: 'medium',
    marks: 2,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $group stage in aggregation?',
    options: ['To group documents', 'To filter documents', 'To sort documents', 'To project fields'],
    correctAnswer: 'To group documents',
    hint: 'It is used for grouping data.',
    level: 'medium',
    marks: 2,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $project stage in aggregation?',
    options: ['To project fields', 'To filter documents', 'To group documents', 'To sort documents'],
    correctAnswer: 'To project fields',
    hint: 'It is used to include or exclude fields.',
    level: 'medium',
    marks: 2,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $sort stage in aggregation?',
    options: ['To sort documents', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To sort documents',
    hint: 'It is used to order data.',
    level: 'medium',
    marks: 2,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $lookup stage in aggregation?',
    options: ['To perform a join operation', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To perform a join operation',
    hint: 'It is used to join collections.',
    level: 'medium',
    marks: 2,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $unwind stage in aggregation?',
    options: ['To deconstruct arrays', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To deconstruct arrays',
    hint: 'It is used to flatten arrays.',
    level: 'medium',
    marks: 2,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $limit stage in aggregation?',
    options: ['To limit the number of documents', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To limit the number of documents',
    hint: 'It is used to restrict results.',
    level: 'medium',
    marks: 2,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $skip stage in aggregation?',
    options: ['To skip a number of documents', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To skip a number of documents',
    hint: 'It is used to offset results.',
    level: 'medium',
    marks: 2,
    category: 'MongoDB'
  },

  // Hard Questions - MongoDB
  {
    questionText: 'What is a replica set in MongoDB?',
    options: ['A group of MongoDB servers', 'A single MongoDB server', 'A collection of documents', 'A database'],
    correctAnswer: 'A group of MongoDB servers',
    hint: 'It is used for high availability.',
    level: 'hard',
    marks: 3,
    category: 'MongoDB'
  },
  {
    questionText: 'What is sharding in MongoDB?',
    options: ['A method of distributing data', 'A method of indexing data', 'A method of querying data', 'A method of updating data'],
    correctAnswer: 'A method of distributing data',
    hint: 'It is used for horizontal scaling.',
    level: 'hard',
    marks: 3,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB oplog?',
    options: ['To track changes to the database', 'To store documents', 'To index data', 'To query data'],
    correctAnswer: 'To track changes to the database',
    hint: 'It is used in replication.',
    level: 'hard',
    marks: 3,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $geoNear stage in aggregation?',
    options: ['To perform geospatial queries', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To perform geospatial queries',
    hint: 'It is used for location-based queries.',
    level: 'hard',
    marks: 3,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $text index?',
    options: ['To perform text searches', 'To index data', 'To query data', 'To update data'],
    correctAnswer: 'To perform text searches',
    hint: 'It is used for full-text search.',
    level: 'hard',
    marks: 3,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $graphLookup stage in aggregation?',
    options: ['To perform graph traversal', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To perform graph traversal',
    hint: 'It is used for hierarchical data.',
    level: 'hard',
    marks: 3,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $bucket stage in aggregation?',
    options: ['To group documents into buckets', 'To filter documents', 'To sort documents', 'To project fields'],
    correctAnswer: 'To group documents into buckets',
    hint: 'It is used for data binning.',
    level: 'hard',
    marks: 3,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $facet stage in aggregation?',
    options: ['To perform multiple aggregations', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To perform multiple aggregations',
    hint: 'It is used for multi-faceted analysis.',
    level: 'hard',
    marks: 3,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $merge stage in aggregation?',
    options: ['To merge results into a collection', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To merge results into a collection',
    hint: 'It is used to write results.',
    level: 'hard',
    marks: 3,
    category: 'MongoDB'
  },
  {
    questionText: 'What is the purpose of the MongoDB $out stage in aggregation?',
    options: ['To write results to a collection', 'To filter documents', 'To group documents', 'To project fields'],
    correctAnswer: 'To write results to a collection',
    hint: 'It is used to output data.',
    level: 'hard',
    marks: 3,
    category: 'MongoDB'
  },
  {
    questionText: 'What is a linked list?',
    options: ['A linear data structure', 'A type of array', 'A database', 'A sorting algorithm'],
    correctAnswer: 'A linear data structure',
    hint: 'It consists of nodes connected by pointers.',
    level: 'easy',
    marks: 1,
    category: 'LinkedList'
  },
  {
    questionText: 'What is the first node of a linked list called?',
    options: ['Head', 'Tail', 'Root', 'Start'],
    correctAnswer: 'Head',
    hint: 'It is the starting point.',
    level: 'easy',
    marks: 1,
    category: 'LinkedList'
  },
  {
    questionText: 'What is the last node of a linked list called?',
    options: ['Tail', 'Head', 'End', 'Root'],
    correctAnswer: 'Tail',
    hint: 'It points to null.',
    level: 'easy',
    marks: 1,
    category: 'LinkedList'
  },
  {
    questionText: 'What does each node in a linked list contain?',
    options: ['Data and a pointer', 'Only data', 'Only a pointer', 'Data and an index'],
    correctAnswer: 'Data and a pointer',
    hint: 'It stores data and a reference.',
    level: 'easy',
    marks: 1,
    category: 'LinkedList'
  },
  {
    questionText: 'What is a singly linked list?',
    options: ['A list where each node points to the next node', 'A list where each node points to the previous node', 'A list with two pointers', 'A circular list'],
    correctAnswer: 'A list where each node points to the next node',
    hint: 'It has one direction.',
    level: 'easy',
    marks: 1,
    category: 'LinkedList'
  },
  {
    questionText: 'What is a doubly linked list?',
    options: ['A list where each node points to both the next and previous nodes', 'A list with only one pointer', 'A circular list', 'A list with no pointers'],
    correctAnswer: 'A list where each node points to both the next and previous nodes',
    hint: 'It has two directions.',
    level: 'easy',
    marks: 1,
    category: 'LinkedList'
  },
  {
    questionText: 'What is the time complexity of inserting a node at the beginning of a linked list?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(1)',
    hint: 'It is a constant time operation.',
    level: 'easy',
    marks: 1,
    category: 'LinkedList'
  },
  {
    questionText: 'What is the time complexity of searching for an element in a linked list?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(n)',
    hint: 'It requires traversal.',
    level: 'easy',
    marks: 1,
    category: 'LinkedList'
  },
  {
    questionText: 'What is a circular linked list?',
    options: ['A list where the last node points to the first node', 'A list with no end', 'A list with two pointers', 'A doubly linked list'],
    correctAnswer: 'A list where the last node points to the first node',
    hint: 'It forms a loop.',
    level: 'easy',
    marks: 1,
    category: 'LinkedList'
  },
  {
    questionText: 'What is the advantage of a linked list over an array?',
    options: ['Dynamic size', 'Faster access', 'Less memory', 'None of the above'],
    correctAnswer: 'Dynamic size',
    hint: 'It can grow or shrink.',
    level: 'easy',
    marks: 1,
    category: 'LinkedList'
  },

  // Medium Questions - Linked List
  {
    questionText: 'How do you reverse a linked list?',
    options: ['By changing the direction of pointers', 'By swapping data', 'By creating a new list', 'By sorting the list'],
    correctAnswer: 'By changing the direction of pointers',
    hint: 'It involves pointer manipulation.',
    level: 'medium',
    marks: 2,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you detect a cycle in a linked list?',
    options: ['Using two pointers', 'By counting nodes', 'By checking null pointers', 'By sorting the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'medium',
    marks: 2,
    category: 'LinkedList'
  },
  {
    questionText: 'What is the time complexity of deleting a node in a linked list?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(1)',
    hint: 'It depends on the position.',
    level: 'medium',
    marks: 2,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you merge two sorted linked lists?',
    options: ['By comparing nodes', 'By concatenating lists', 'By sorting the lists', 'By reversing one list'],
    correctAnswer: 'By comparing nodes',
    hint: 'It involves traversal.',
    level: 'medium',
    marks: 2,
    category: 'LinkedList'
  },
  {
    questionText: 'What is the space complexity of a linked list?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(n)',
    hint: 'It depends on the number of nodes.',
    level: 'medium',
    marks: 2,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you find the middle element of a linked list?',
    options: ['Using two pointers', 'By counting nodes', 'By sorting the list', 'By reversing the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'medium',
    marks: 2,
    category: 'LinkedList'
  },
  {
    questionText: 'What is the time complexity of appending a node to the end of a singly linked list?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(n)',
    hint: 'It requires traversal.',
    level: 'medium',
    marks: 2,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you remove duplicates from a linked list?',
    options: ['Using a hash set', 'By sorting the list', 'By reversing the list', 'By counting nodes'],
    correctAnswer: 'Using a hash set',
    hint: 'It involves storing visited nodes.',
    level: 'medium',
    marks: 2,
    category: 'LinkedList'
  },
  {
    questionText: 'What is the time complexity of searching for an element in a doubly linked list?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
    correctAnswer: 'O(n)',
    hint: 'It requires traversal.',
    level: 'medium',
    marks: 2,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you split a linked list into two halves?',
    options: ['Using two pointers', 'By counting nodes', 'By sorting the list', 'By reversing the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'medium',
    marks: 2,
    category: 'LinkedList'
  },

  // Hard Questions - Linked List
  {
    questionText: 'How do you detect and remove a cycle in a linked list?',
    options: ['Using two pointers', 'By counting nodes', 'By checking null pointers', 'By sorting the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'hard',
    marks: 3,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you flatten a linked list?',
    options: ['By merging sublists', 'By sorting the list', 'By reversing the list', 'By concatenating lists'],
    correctAnswer: 'By merging sublists',
    hint: 'It involves recursion.',
    level: 'hard',
    marks: 3,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you rotate a linked list?',
    options: ['By changing pointers', 'By sorting the list', 'By reversing the list', 'By concatenating lists'],
    correctAnswer: 'By changing pointers',
    hint: 'It involves pointer manipulation.',
    level: 'hard',
    marks: 3,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you find the intersection point of two linked lists?',
    options: ['Using two pointers', 'By counting nodes', 'By sorting the lists', 'By reversing one list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves traversal.',
    level: 'hard',
    marks: 3,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you clone a linked list with random pointers?',
    options: ['Using a hash map', 'By sorting the list', 'By reversing the list', 'By concatenating lists'],
    correctAnswer: 'Using a hash map',
    hint: 'It involves storing references.',
    level: 'hard',
    marks: 3,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you reverse a doubly linked list?',
    options: ['By swapping pointers', 'By sorting the list', 'By reversing the list', 'By concatenating lists'],
    correctAnswer: 'By swapping pointers',
    hint: 'It involves pointer manipulation.',
    level: 'hard',
    marks: 3,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you find the kth node from the end of a linked list?',
    options: ['Using two pointers', 'By counting nodes', 'By sorting the list', 'By reversing the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'hard',
    marks: 3,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you check if two linked lists are identical?',
    options: ['By comparing nodes', 'By sorting the lists', 'By reversing one list', 'By concatenating lists'],
    correctAnswer: 'By comparing nodes',
    hint: 'It involves traversal.',
    level: 'hard',
    marks: 3,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you find the length of a cycle in a linked list?',
    options: ['Using two pointers', 'By counting nodes', 'By checking null pointers', 'By sorting the list'],
    correctAnswer: 'Using two pointers',
    hint: 'It involves a slow and fast pointer.',
    level: 'hard',
    marks: 3,
    category: 'LinkedList'
  },
  {
    questionText: 'How do you sort a linked list?',
    options: ['Using merge sort', 'By swapping nodes', 'By reversing the list', 'By concatenating lists'],
    correctAnswer: 'Using merge sort',
    hint: 'It is a divide-and-conquer algorithm.',
    level: 'hard',
    marks: 3,
    category: 'LinkedList'
  },
  {
    questionText: 'What is an array?',
    options: ['A collection of elements', 'A single value', 'A function', 'A variable'],
    correctAnswer: 'A collection of elements',
    hint: 'It stores multiple values.',
    level: 'easy',
    marks: 1,
    category: 'Array'
  },
  {
    questionText: 'How do you declare an array in JavaScript?',
    options: ['var arr = [];', 'var arr = {};', 'var arr = ();', 'var arr = <>;'],
    correctAnswer: 'var arr = [];',
    hint: 'It uses square brackets.',
    level: 'easy',
    marks: 1,
    category: 'Array'
  },
  {
    questionText: 'What is the index of the first element in an array?',
    options: ['0', '1', '-1', 'None'],
    correctAnswer: '0',
    hint: 'It starts from zero.',
    level: 'easy',
    marks: 1,
    category: 'Array'
  },
  {
    questionText: 'How do you access the third element of an array named arr?',
    options: ['arr[2]', 'arr[3]', 'arr[1]', 'arr[0]'],
    correctAnswer: 'arr[2]',
    hint: 'Indexing starts from zero.',
    level: 'easy',
    marks: 1,
    category: 'Array'
  },
  {
    questionText: 'What is the length of an array arr = [1, 2, 3]?',
    options: ['3', '2', '4', 'None'],
    correctAnswer: '3',
    hint: 'It counts the number of elements.',
    level: 'easy',
    marks: 1,
    category: 'Array'
  },
  {
    questionText: 'How do you add an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()',
    hint: 'It is a common array method.',
    level: 'easy',
    marks: 1,
    category: 'Array'
  },
  {
    questionText: 'How do you remove the last element of an array?',
    options: ['pop()', 'push()', 'shift()', 'unshift()'],
    correctAnswer: 'pop()',
    hint: 'It modifies the original array.',
    level: 'easy',
    marks: 1,
    category: 'Array'
  },
  {
    questionText: 'What is the output of the following code: console.log([1, 2, 3].length)?',
    options: ['3', '2', '4', 'None'],
    correctAnswer: '3',
    hint: 'It counts the number of elements.',
    level: 'easy',
    marks: 1,
    category: 'Array'
  },
  {
    questionText: 'How do you check if an array includes a specific element?',
    options: ['includes()', 'contains()', 'has()', 'exists()'],
    correctAnswer: 'includes()',
    hint: 'It is a built-in method.',
    level: 'easy',
    marks: 1,
    category: 'Array'
  },
  {
    questionText: 'What is the output of the following code: console.log([].length)?',
    options: ['0', '1', 'undefined', 'None'],
    correctAnswer: '0',
    hint: 'It is an empty array.',
    level: 'easy',
    marks: 1,
    category: 'Array'
  },

  // Medium Questions - Array
  {
    questionText: 'How do you merge two arrays in JavaScript?',
    options: ['concat()', 'merge()', 'combine()', 'append()'],
    correctAnswer: 'concat()',
    hint: 'It is a built-in method.',
    level: 'medium',
    marks: 2,
    category: 'Array'
  },
  {
    questionText: 'How do you find the index of an element in an array?',
    options: ['indexOf()', 'findIndex()', 'search()', 'locate()'],
    correctAnswer: 'indexOf()',
    hint: 'It returns the position.',
    level: 'medium',
    marks: 2,
    category: 'Array'
  },
  {
    questionText: 'What is the output of the following code: console.log([1, 2, 3].slice(1, 2))?',
    options: ['[2]', '[1, 2]', '[2, 3]', '[1]'],
    correctAnswer: '[2]',
    hint: 'It extracts a portion.',
    level: 'medium',
    marks: 2,
    category: 'Array'
  },
  {
    questionText: 'How do you remove the first element of an array?',
    options: ['shift()', 'pop()', 'unshift()', 'push()'],
    correctAnswer: 'shift()',
    hint: 'It modifies the original array.',
    level: 'medium',
    marks: 2,
    category: 'Array'
  },
  {
    questionText: 'What is the output of the following code: console.log([1, 2, 3].splice(1, 1))?',
    options: ['[2]', '[1, 2]', '[2, 3]', '[1]'],
    correctAnswer: '[2]',
    hint: 'It removes elements.',
    level: 'medium',
    marks: 2,
    category: 'Array'
  },
  {
    questionText: 'How do you sort an array in ascending order?',
    options: ['sort()', 'order()', 'arrange()', 'sequence()'],
    correctAnswer: 'sort()',
    hint: 'It is a built-in method.',
    level: 'medium',
    marks: 2,
    category: 'Array'
  },
  {
    questionText: 'What is the output of the following code: console.log([1, 2, 3].reverse())?',
    options: ['[3, 2, 1]', '[1, 2, 3]', '[2, 3, 1]', '[1, 3, 2]'],
    correctAnswer: '[3, 2, 1]',
    hint: 'It reverses the array.',
    level: 'medium',
    marks: 2,
    category: 'Array'
  },
  {
    questionText: 'How do you iterate over an array in JavaScript?',
    options: ['forEach()', 'map()', 'filter()', 'reduce()'],
    correctAnswer: 'forEach()',
    hint: 'It is a loop method.',
    level: 'medium',
    marks: 2,
    category: 'Array'
  },
  {
    questionText: 'What is the output of the following code: console.log([1, 2, 3].map(x => x * 2))?',
    options: ['[2, 4, 6]', '[1, 2, 3]', '[3, 6, 9]', '[1, 4, 9]'],
    correctAnswer: '[2, 4, 6]',
    hint: 'It transforms each element.',
    level: 'medium',
    marks: 2,
    category: 'Array'
  },
  {
    questionText: 'How do you filter elements of an array?',
    options: ['filter()', 'map()', 'reduce()', 'forEach()'],
    correctAnswer: 'filter()',
    hint: 'It creates a new array.',
    level: 'medium',
    marks: 2,
    category: 'Array'
  },

  // Hard Questions - Array
  {
    questionText: 'How do you find the maximum value in an array?',
    options: ['Math.max(...arr)', 'arr.max()', 'max(arr)', 'Math.max(arr)'],
    correctAnswer: 'Math.max(...arr)',
    hint: 'It uses the spread operator.',
    level: 'hard',
    marks: 3,
    category: 'Array'
  },
  {
    questionText: 'How do you flatten a nested array?',
    options: ['flat()', 'flatten()', 'reduce()', 'concat()'],
    correctAnswer: 'flat()',
    hint: 'It is a built-in method.',
    level: 'hard',
    marks: 3,
    category: 'Array'
  },
  {
    questionText: 'What is the output of the following code: console.log([1, [2, [3]]].flat(2))?',
    options: ['[1, 2, 3]', '[1, [2, 3]]', '[1, 2, [3]]', '[1, [2, [3]]]'],
    correctAnswer: '[1, 2, 3]',
    hint: 'It flattens the array.',
    level: 'hard',
    marks: 3,
    category: 'Array'
  },
  {
    questionText: 'How do you find the sum of all elements in an array?',
    options: ['reduce()', 'sum()', 'add()', 'accumulate()'],
    correctAnswer: 'reduce()',
    hint: 'It accumulates values.',
    level: 'hard',
    marks: 3,
    category: 'Array'
  },
  {
    questionText: 'How do you remove duplicates from an array?',
    options: ['new Set(arr)', 'filter()', 'map()', 'reduce()'],
    correctAnswer: 'new Set(arr)',
    hint: 'It uses a Set.',
    level: 'hard',
    marks: 3,
    category: 'Array'
  },
  {
    questionText: 'How do you shuffle elements of an array?',
    options: ['sort(() => Math.random() - 0.5)', 'shuffle()', 'randomize()', 'mix()'],
    correctAnswer: 'sort(() => Math.random() - 0.5)',
    hint: 'It uses sort.',
    level: 'hard',
    marks: 3,
    category: 'Array'
  },
  {
    questionText: 'How do you find the intersection of two arrays?',
    options: ['filter()', 'map()', 'reduce()', 'concat()'],
    correctAnswer: 'filter()',
    hint: 'It involves filtering.',
    level: 'hard',
    marks: 3,
    category: 'Array'
  },
  {
    questionText: 'How do you rotate an array?',
    options: ['slice() and concat()', 'reverse()', 'sort()', 'splice()'],
    correctAnswer: 'slice() and concat()',
    hint: 'It involves slicing.',
    level: 'hard',
    marks: 3,
    category: 'Array'
  },
  {
    questionText: 'How do you find the kth largest element in an array?',
    options: ['sort() and index', 'filter()', 'map()', 'reduce()'],
    correctAnswer: 'sort() and index',
    hint: 'It involves sorting.',
    level: 'hard',
    marks: 3,
    category: 'Array'
  },
  {
    questionText: 'How do you partition an array into chunks of size n?',
    options: ['slice() in a loop', 'map()', 'filter()', 'reduce()'],
    correctAnswer: 'slice() in a loop',
    hint: 'It involves slicing.',
    level: 'hard',
    marks: 3,
    category: 'Array'
  },
  {
    questionText: 'What is the time complexity of searching an element in a well-balanced Binary Search Tree (BST)?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 'O(log n)',
    hint: 'Think about how the search space is halved in a balanced tree.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Trees']
  },
  {
    questionText: 'Which data structure is best suited for implementing a \'undo\' feature in a text editor?',
    options: ['Queue', 'Stack', 'Linked List', 'Hash Table'],
    correctAnswer: 'Stack',
    hint: 'Think about LIFO (Last-In, First-Out) principle.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms', 'Stack']
  },
  {
    questionText: 'What is the primary advantage of a Doubly Linked List over a Singly Linked List?',
    options: ['Less memory usage', 'Faster insertion at the beginning', 'Ability to traverse in both directions', 'Simpler implementation'],
    correctAnswer: 'Ability to traverse in both directions',
    hint: 'Consider the pointers each node holds.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms', 'Linked List']
  },
  {
    questionText: 'In a Max Heap, where is the largest element always located?',
    options: ['At the root', 'At the last leaf node', 'Anywhere in the tree', 'At the leftmost node'],
    correctAnswer: 'At the root',
    hint: 'Heaps maintain a specific ordering property for their parent and child nodes.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms', 'Heap', 'Trees']
  },
  {
    questionText: 'Which sorting algorithm has an average time complexity of O(n log n) and is a comparison sort?',
    options: ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort'],
    correctAnswer: 'Merge Sort',
    hint: 'This algorithm divides the array into halves, sorts them, and then merges them.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Sorting']
  },
  {
    questionText: 'What is a \'collision\' in the context of Hash Tables?',
    options: ['When two different keys map to different indices', 'When two different keys map to the same index', 'When a key is not found', 'When the hash table is empty'],
    correctAnswer: 'When two different keys map to the same index',
    hint: 'It\'s what happens when the hash function produces the same output for distinct inputs.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Hash Table']
  },
  {
    questionText: 'Which traversal algorithm for a graph uses a queue?',
    options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Dijkstra\'s Algorithm', 'A* Search'],
    correctAnswer: 'Breadth-First Search (BFS)',
    hint: 'Think about exploring all neighbors at the current level before moving to the next level.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Graph', 'Queue']
  },
  {
    questionText: 'What is the worst-case time complexity of Quick Sort?',
    options: ['O(n log n)', 'O(n^2)', 'O(log n)', 'O(n)'],
    correctAnswer: 'O(n^2)',
    hint: 'Consider what happens if the pivot selection is always the smallest or largest element.',
    level: 'hard',
    marks: 3,
    category: ['Data Structures and Algorithms', 'Sorting']
  },
  {
    questionText: 'What is the purpose of a \'pointer\' in data structures?',
    options: ['To store data directly', 'To allocate memory', 'To store the memory address of another variable', 'To define a new data type'],
    correctAnswer: 'To store the memory address of another variable',
    hint: 'Pointers \'point\' to locations in memory.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms']
  },
  {
    questionText: 'An algorithm has a time complexity of O(n!). What does this indicate?',
    options: ['It scales linearly with input size.', 'It scales logarithmically with input size.', 'It scales factorially with input size, making it very inefficient for large inputs.', 'It has constant time performance.'],
    correctAnswer: 'It scales factorially with input size',
    hint: 'n! grows extremely rapidly.',
    level: 'hard',
    marks: 3,
    category: ['Data Structures and Algorithms', 'Algorithms']
  },
  {
    questionText: 'Which data structure allows access to elements only from one end (insertion) and removal from the other end (deletion)?',
    options: ['Stack', 'Queue', 'Array', 'Tree'],
    correctAnswer: 'Queue',
    hint: 'Think about a waiting line.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms', 'Queue']
  },
  {
    questionText: 'What is the primary difference between a complete binary tree and a full binary tree?',
    options: [
      'A complete binary tree has all levels completely filled, while a full binary tree does not.',
      'A full binary tree has every node with either zero or two children, while a complete binary tree fills levels from left to right.',
      'There is no difference, they are the same.',
      'A complete binary tree is always a full binary tree.'
    ],
    correctAnswer: 'A full binary tree has every node with either zero or two children, while a complete binary tree fills levels from left to right.',
    hint: 'Focus on the child count for full, and level-by-level filling for complete.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Trees']
  },
  {
    questionText: 'What is the average time complexity for inserting an element into a Hash Table with good hash function and proper collision resolution?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 'O(1)',
    hint: 'Ideally, it should be a constant-time operation.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Hash Table']
  },
  {
    questionText: 'Which algorithm is used to find the shortest path in an unweighted graph?',
    options: ['Dijkstra\'s Algorithm', 'Bellman-Ford Algorithm', 'Breadth-First Search (BFS)', 'Floyd-Warshall Algorithm'],
    correctAnswer: 'Breadth-First Search (BFS)',
    hint: 'BFS explores layer by layer, naturally finding the shortest path in terms of edges.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Graph', 'Algorithms']
  },
  {
    questionText: 'What is the maximum number of children a node can have in a binary tree?',
    options: ['One', 'Two', 'Any number', 'Three'],
    correctAnswer: 'Two',
    hint: 'The term "binary" implies two.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms', 'Trees']
  },
  {
    questionText: 'Which sorting algorithm repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order?',
    options: ['Selection Sort', 'Insertion Sort', 'Bubble Sort', 'Merge Sort'],
    correctAnswer: 'Bubble Sort',
    hint: 'Elements "bubble" up to their correct positions.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms', 'Sorting']
  },
  {
    questionText: 'What is the main drawback of using an array to implement a queue?',
    options: [
      'Fixed size, leading to overflow or underflow issues.',
      'Slow access to elements.',
      'Requires dynamic memory allocation.',
      'Cannot store heterogeneous data types.'
    ],
    correctAnswer: 'Fixed size, leading to overflow or underflow issues.',
    hint: 'Arrays have a predefined capacity.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Queue', 'Arrays']
  },
  {
    questionText: 'In an Adjacency List representation of a graph, what does each list represent?',
    options: [
      'The vertices in the graph.',
      'The edges originating from a specific vertex.',
      'The weights of the edges.',
      'The shortest paths between vertices.'
    ],
    correctAnswer: 'The edges originating from a specific vertex.',
    hint: 'Each vertex has its own list of connected vertices.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Graph']
  },
  {
    questionText: 'Which algorithm finds the minimum spanning tree (MST) of a connected, undirected graph?',
    options: ['Dijkstra\'s Algorithm', 'Prim\'s Algorithm', 'Topological Sort', 'Kruskal\'s Algorithm'],
    correctAnswer: 'Prim\'s Algorithm',
    hint: 'Consider algorithms that build the MST by progressively adding the cheapest edge.',
    level: 'hard',
    marks: 3,
    category: ['Data Structures and Algorithms', 'Graph', 'Algorithms']
  },
  {
    questionText: 'What is tail recursion?',
    options: [
      'A recursive function that calls itself multiple times.',
      'A recursive function where the recursive call is the last operation in the function.',
      'A recursive function that does not have a base case.',
      'A non-recursive function that simulates recursion.'
    ],
    correctAnswer: 'A recursive function where the recursive call is the last operation in the function.',
    hint: 'It allows for potential compiler optimizations to iterative code.',
    level: 'hard',
    marks: 3,
    category: ['Data Structures and Algorithms', 'Algorithms', 'Recursion']
  },
  {
    questionText: 'What is the space complexity of an in-place sorting algorithm?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 'O(1)',
    hint: 'In-place algorithms modify the input directly without significant extra space.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Sorting', 'Algorithms']
  },
  {
    questionText: 'Which searching algorithm requires the data to be sorted?',
    options: ['Linear Search', 'Binary Search', 'Hash Table Search', 'Depth-First Search'],
    correctAnswer: 'Binary Search',
    hint: 'It works by repeatedly dividing the search interval in half.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms', 'Searching', 'Algorithms']
  },
  {
    questionText: 'What is a B-tree primarily used for?',
    options: [
      'Representing social networks',
      'Implementing undo/redo functionality',
      'Storing data on disk in databases and file systems',
      'Efficiently finding the shortest path in a graph'
    ],
    correctAnswer: 'Storing data on disk in databases and file systems',
    hint: 'They are optimized for disk access, common in database indexing.',
    level: 'hard',
    marks: 3,
    category: ['Data Structures and Algorithms', 'Trees', 'Databases']
  },
  {
    questionText: 'Which principle does a Stack follow?',
    options: ['FIFO (First-In, First-Out)', 'LIFO (Last-In, First-Out)', 'LILO (Last-In, Last-Out)', 'FILO (First-In, Last-Out)'],
    correctAnswer: 'LIFO (Last-In, First-Out)',
    hint: 'Think of a stack of plates.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms', 'Stack']
  },
  {
    questionText: 'What is the purpose of a hash function in a Hash Table?',
    options: [
      'To sort the elements in the table.',
      'To convert a key into an index in the array.',
      'To resolve collisions.',
      'To traverse the table elements.'
    ],
    correctAnswer: 'To convert a key into an index in the array.',
    hint: 'It maps keys to array positions.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Hash Table']
  },
  {
    questionText: 'What is dynamic programming primarily used for?',
    options: [
      'Solving problems by dividing them into independent subproblems.',
      'Solving optimization problems by breaking them down into overlapping subproblems and storing results.',
      'Graph traversal.',
      'Sorting large datasets.'
    ],
    correctAnswer: 'Solving optimization problems by breaking them down into overlapping subproblems and storing results.',
    hint: 'It involves memoization or tabulation to avoid recomputing.',
    level: 'hard',
    marks: 3,
    category: ['Data Structures and Algorithms', 'Algorithms', 'Dynamic Programming']
  },
  {
    questionText: 'Which of these is NOT a common method for handling collisions in a Hash Table?',
    options: ['Separate Chaining', 'Open Addressing', 'Quadratic Probing', 'Binary Search'],
    correctAnswer: 'Binary Search',
    hint: 'Binary Search is a searching algorithm, not a collision resolution technique.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Hash Table']
  },
  {
    questionText: "What is the definition of a 'root' in a tree data structure?",
    options: [
      'A node with no children.',
      'The topmost node with no parent.',
      'A node that has exactly one child.',
      'Any leaf node.'
    ],
    correctAnswer: 'The topmost node with no parent.',
    hint: 'It is the starting point of the tree.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms', 'Trees']
  },
  {
    questionText: 'Which data structure is suitable for implementing an adjacency matrix representation of a graph?',
    options: ['Linked List', 'Array (2D)', 'Stack', 'Queue'],
    correctAnswer: 'Array (2D)',
    hint: 'Matrices are typically represented using 2D arrays.',
    level: 'easy',
    marks: 1,
    category: ['Data Structures and Algorithms', 'Graph', 'Arrays']
  },
  {
    questionText: 'What is the key idea behind the Greedy approach to algorithm design?',
    options: [
      'Solving a problem by finding the global optimal solution through exhaustive search.',
      'Making the locally optimal choice at each stage with the hope of finding a global optimum.',
      'Breaking down a problem into smaller, independent subproblems.',
      'Storing results of subproblems to avoid recomputation.'
    ],
    correctAnswer: 'Making the locally optimal choice at each stage with the hope of finding a global optimum.',
    hint: 'It often works for optimization problems, but not always guarantees the best overall solution.',
    level: 'medium',
    marks: 2,
    category: ['Data Structures and Algorithms', 'Algorithms']
  },
  {
    "questionText": "What is the main difference between a Mutex and Semaphore in process synchronization?",
    "options": [
      "Mutex allows multiple threads, Semaphore allows only one",
      "Mutex allows only one thread, Semaphore can allow multiple threads",
      "Mutex is faster than Semaphore",
      "Mutex works only between processes, Semaphore works only between threads"
    ],
    "correctAnswer": "Mutex allows only one thread, Semaphore can allow multiple threads",
    "hint": "Think about the number of resources each mechanism can control.",
    "level": "medium",
    "marks": 2,
    "category": ["Operating Systems", "Process Synchronization", "Concurrency"]
  },
  {
    "questionText": "Which condition is NOT necessary for a deadlock to occur?",
    "options": [
      "Mutual Exclusion",
      "Hold and Wait",
      "Process Priority",
      "Circular Wait"
    ],
    "correctAnswer": "Process Priority",
    "hint": "Deadlock requires four conditions, and process priority is not one of them.",
    "level": "medium",
    "marks": 2,
    "category": ["Operating Systems", "Deadlock", "Process Management"]
  },
  {
    "questionText": "What is the main advantage of the Round Robin scheduling algorithm?",
    "options": [
      "It has the shortest average waiting time",
      "It provides fair CPU time distribution",
      "It minimizes context switches",
      "It prioritizes I/O bound processes"
    ],
    "correctAnswer": "It provides fair CPU time distribution",
    "hint": "Think about how time quantum affects process execution.",
    "level": "medium",
    "marks": 2,
    "category": ["Operating Systems", "CPU Scheduling", "Process Management"]
  },
  {
    "questionText": "In virtual memory management, what causes thrashing?",
    "options": [
      "Too much RAM available",
      "Too many page faults occurring",
      "Too few running processes",
      "Too much cache memory"
    ],
    "correctAnswer": "Too many page faults occurring",
    "hint": "Consider what happens when a system spends more time paging than executing.",
    "level": "medium",
    "marks": 2,
    "category": ["Operating Systems", "Memory Management", "Virtual Memory"]
  },
  {
    "questionText": "What is the primary purpose of journaling in a file system?",
    "options": [
      "To increase file access speed",
      "To maintain system logs",
      "To recover from system crashes",
      "To compress file data"
    ],
    "correctAnswer": "To recover from system crashes",
    "hint": "Think about maintaining file system consistency after unexpected shutdowns.",
    "level": "medium",
    "marks": 2,
    "category": ["Operating Systems", "File Systems", "Data Recovery"]
  },
  {
    "questionText": "Which page replacement algorithm is most likely to suffer from Belady's Anomaly?",
    "options": [
      "LRU (Least Recently Used)",
      "FIFO (First In First Out)",
      "Optimal",
      "Clock Algorithm"
    ],
    "correctAnswer": "FIFO (First In First Out)",
    "hint": "Consider which algorithm might perform worse with more frames.",
    "level": "medium",
    "marks": 2,
    "category": ["Operating Systems", "Memory Management", "Page Replacement"]
  },
  {
    "questionText": "What is the main advantage of the C-SCAN disk scheduling algorithm over SCAN?",
    "options": [
      "Lower seek time",
      "More uniform wait times",
      "Less head movement",
      "Better throughput"
    ],
    "correctAnswer": "More uniform wait times",
    "hint": "Think about how the head movement pattern affects request service time.",
    "level": "medium",
    "marks": 2,
    "category": ["Operating Systems", "Disk Scheduling", "I/O Management"]
  },
  {
    "questionText": "Which IPC mechanism is typically faster once established?",
    "options": [
      "Message Passing",
      "Shared Memory",
      "Pipes",
      "Signals"
    ],
    "correctAnswer": "Shared Memory",
    "hint": "Consider which mechanism requires less kernel intervention during data transfer.",
    "level": "medium",
    "marks": 2,
    "category": ["Operating Systems", "Inter-Process Communication", "Process Management"]
  },
  {
    "questionText": "What is the main difference between internal and external fragmentation?",
    "options": [
      "Internal occurs in RAM, external in disk",
      "Internal is wasted space within allocated blocks, external is wasted space between blocks",
      "Internal affects large files, external affects small files",
      "Internal is temporary, external is permanent"
    ],
    "correctAnswer": "Internal is wasted space within allocated blocks, external is wasted space between blocks",
    "hint": "Think about where the unused space exists relative to allocated memory blocks.",
    "level": "medium",
    "marks": 2,
    "category": ["Operating Systems", "Memory Management", "Fragmentation"]
  },
  {
    "questionText": "Which scheduling algorithm is most likely to cause starvation?",
    "options": [
      "Round Robin",
      "First Come First Served",
      "Priority Scheduling",
      "Shortest Job First"
    ],
    "correctAnswer": "Priority Scheduling",
    "hint": "Consider what happens to low-priority processes when high-priority processes keep arriving.",
    "level": "medium",
    "marks": 2,
    "category": ["Operating Systems", "CPU Scheduling", "Process Management"]
  },
  {
    "questionText": "In TCP's congestion control mechanism, how does the Multiplicative Decrease aspect of AIMD affect the congestion window size when packet loss is detected through triple duplicate ACKs versus when it's detected through a timeout?",
    "options": [
      "Both cases reduce cwnd to 1 MSS",
      "Triple duplicate ACKs reduce cwnd by half, timeout reduces to 1 MSS",
      "Timeout reduces cwnd by half, triple duplicate ACKs reduce to 1 MSS",
      "Both cases reduce cwnd by 75%"
    ],
    "correctAnswer": "Triple duplicate ACKs reduce cwnd by half, timeout reduces to 1 MSS",
    "hint": "TCP treats different types of packet loss differently - timeout indicates more severe congestion than duplicate ACKs.",
    "level": "hard",
    "marks": 3,
    "category": ["Computer Networks", "TCP", "Congestion Control"]
  },
  {
    "questionText": "A network uses VLSM (Variable Length Subnet Masking) with base network 192.168.0.0/24. If you need to create four subnets with 60, 28, 12, and 8 hosts respectively, what would be the subnet mask for the subnet requiring 28 hosts?",
    "options": [
      "255.255.255.224 (/27)",
      "255.255.255.192 (/26)",
      "255.255.255.240 (/28)",
      "255.255.255.248 (/29)"
    ],
    "correctAnswer": "255.255.255.224 (/27)",
    "hint": "Calculate 2^n-2 >= required hosts, where n is the number of host bits. Consider the next power of 2 above 28.",
    "level": "hard",
    "marks": 3,
    "category": ["Computer Networks", "Subnetting", "IP Addressing"]
  },
  {
    "questionText": "In BGP (Border Gateway Protocol), what is the significance and potential security implications of AS_PATH prepending?",
    "options": [
      "It only affects inbound traffic and has no security implications",
      "It artificially makes routes appear longer to influence path selection and can be exploited for traffic hijacking",
      "It speeds up route convergence and improves security",
      "It only works within a single autonomous system"
    ],
    "correctAnswer": "It artificially makes routes appear longer to influence path selection and can be exploited for traffic hijacking",
    "hint": "Consider how manipulating path length affects BGP's decision process and potential malicious uses.",
    "level": "hard",
    "marks": 3,
    "category": ["Computer Networks", "BGP", "Network Security"]
  },
  {
    "questionText": "In the context of IPsec's ESP (Encapsulating Security Payload) in tunnel mode, if an attacker performs a replay attack, how does the receiving end detect and prevent it using the sequence number field?",
    "options": [
      "By checking if the sequence number is even or odd",
      "By maintaining a sliding window of received sequence numbers and using anti-replay bitmask",
      "By comparing sequence numbers with a fixed threshold",
      "By encrypting the sequence numbers with a different key"
    ],
    "correctAnswer": "By maintaining a sliding window of received sequence numbers and using anti-replay bitmask",
    "hint": "Think about how a system can track previously received packets while allowing for out-of-order delivery.",
    "level": "hard",
    "marks": 3,
    "category": ["Computer Networks", "Network Security", "IPsec"]
  },
  {
    "questionText": "When implementing Weighted Fair Queuing (WFQ), what happens to a packet's finish number calculation if it arrives when the current round number is 1000, has a length of 100 bytes, and its flow has a weight of 0.25?",
    "options": [
      "Finish number = 1000 + (100 × 0.25)",
      "Finish number = 1000 + (100 ÷ 0.25)",
      "Finish number = 1000 × (100 × 0.25)",
      "Finish number = 1000 × (100 ÷ 0.25)"
    ],
    "correctAnswer": "Finish number = 1000 + (100 ÷ 0.25)",
    "hint": "Consider how packet length and flow weight affect service time in WFQ scheduling.",
    "level": "hard",
    "marks": 3,
    "category": ["Computer Networks", "QoS", "Network Scheduling"]
  },
  {
    "questionText": "In a QUIC (Quick UDP Internet Connections) implementation, how does the protocol handle head-of-line blocking differently from TCP when multiple streams are being transmitted?",
    "options": [
      "QUIC doesn't support multiple streams",
      "QUIC uses the same method as TCP for all streams",
      "QUIC allows independent delivery of streams, with loss in one stream not affecting others",
      "QUIC combines all streams into a single connection"
    ],
    "correctAnswer": "QUIC allows independent delivery of streams, with loss in one stream not affecting others",
    "hint": "Think about how QUIC's stream multiplexing differs from TCP's byte-stream abstraction.",
    "level": "hard",
    "marks": 3,
    "category": ["Computer Networks", "Transport Layer", "QUIC Protocol"]
  },
  {
    "questionText": "In the context of SDN (Software Defined Networking), what security vulnerability might arise if an attacker manipulates the flow table memory of an OpenFlow switch through a buffer overflow attack?",
    "options": [
      "Only affects switch performance, no security impact",
      "Can redirect or modify traffic flows, potentially creating man-in-the-middle scenarios",
      "Only impacts the control plane communication",
      "Can only cause denial of service"
    ],
    "correctAnswer": "Can redirect or modify traffic flows, potentially creating man-in-the-middle scenarios",
    "hint": "Consider the role of flow tables in SDN and the implications of unauthorized modifications.",
    "level": "hard",
    "marks": 3,
    "category": ["Computer Networks", "SDN", "Network Security"]
  },
  {
    "questionText": "When implementing MPLS Traffic Engineering, what happens to the Label Distribution Protocol (LDP) sessions if the Interior Gateway Protocol (IGP) is temporarily down but the physical links are still up?",
    "options": [
      "LDP sessions remain active indefinitely",
      "LDP sessions immediately terminate",
      "LDP sessions persist for a holdtime period, then terminate if IGP isn't restored",
      "LDP automatically switches to a backup IGP"
    ],
    "correctAnswer": "LDP sessions persist for a holdtime period, then terminate if IGP isn't restored",
    "hint": "Consider the relationship between LDP and IGP, and how LDP handles IGP failures.",
    "level": "hard",
    "marks": 3,
    "category": ["Computer Networks", "MPLS", "Network Protocols"]
  },
  {
    "questionText": "In a complex IPv6 network using DHCPv6 and SLAAC simultaneously, how does a client determine whether to use DHCPv6 for DNS server configuration if both M and O flags are set in the Router Advertisement message?",
    "options": [
      "Always uses DHCPv6 when either flag is set",
      "Uses SLAAC for address and DHCPv6 for DNS if O flag is set, regardless of M flag",
      "Only uses DHCPv6 if both flags are set",
      "Ignores both flags and uses SLAAC exclusively"
    ],
    "correctAnswer": "Uses SLAAC for address and DHCPv6 for DNS if O flag is set, regardless of M flag",
    "hint": "Consider the specific purposes of M (Managed) and O (Other) flags in RA messages.",
    "level": "hard",
    "marks": 3,
    "category": ["Computer Networks", "IPv6", "Network Configuration"]
  },
  {
    "questionText": "In a network using PIM-SM (Protocol Independent Multicast - Sparse Mode), what happens to the multicast routing when the RP (Rendezvous Point) fails and there are multiple Anycast RP addresses configured using MSDP (Multicast Source Discovery Protocol)?",
    "options": [
      "All multicast traffic immediately stops",
      "Traffic continues through alternate RPs after MSDP state synchronization",
      "Network must wait for PIM-SM to restart completely",
      "Only new multicast groups are affected"
    ],
    "correctAnswer": "Traffic continues through alternate RPs after MSDP state synchronization",
    "hint": "Think about how Anycast RP with MSDP provides redundancy in PIM-SM networks.",
    "level": "hard",
    "marks": 3,
    "category": ["Computer Networks", "Multicast", "Network Protocols"]
  },
  {
    "questionText": "In a Deep Q-Network (DQN) implementation, how does the Double DQN architecture solve the overestimation bias problem of standard Q-learning?",
    "options": [
      "By using two identical networks that train simultaneously",
      "By using a target network for action selection and a separate network for value estimation",
      "By averaging the Q-values of multiple networks",
      "By implementing a discount factor in the Q-value calculation"
    ],
    "correctAnswer": "By using a target network for action selection and a separate network for value estimation",
    "hint": "Consider how separating action selection from value estimation reduces the impact of overoptimistic value estimates.",
    "level": "hard",
    "marks": 3,
    "category": ["Artificial Intelligence", "Reinforcement Learning", "Deep Learning"]
  },
  {
    "questionText": "In a transformer architecture implementing self-attention, what mathematical problem arises with very long sequences, and how does the Reformer architecture address this?",
    "options": [
      "Memory usage scales linearly, solved by using smaller batch sizes",
      "Memory usage scales quadratically, solved by using LSH attention and reversible layers",
      "Memory usage scales exponentially, solved by using sparse attention",
      "Memory usage is constant, no solution needed"
    ],
    "correctAnswer": "Memory usage scales quadratically, solved by using LSH attention and reversible layers",
    "hint": "Think about the attention matrix size in relation to sequence length and how locality-sensitive hashing can help.",
    "level": "hard",
    "marks": 3,
    "category": ["Artificial Intelligence", "Natural Language Processing", "Transformers"]
  },
  {
    "questionText": "When implementing a variational autoencoder (VAE), what is the significance of the reparameterization trick, and how does it enable backpropagation through a stochastic node?",
    "options": [
      "It removes the need for stochastic sampling completely",
      "It separates the deterministic and stochastic components, allowing gradients to flow through the deterministic part",
      "It replaces the encoder with a deterministic function",
      "It eliminates the need for the KL divergence term"
    ],
    "correctAnswer": "It separates the deterministic and stochastic components, allowing gradients to flow through the deterministic part",
    "hint": "Consider how sampling from a distribution can be reformulated as a deterministic function of random noise.",
    "level": "hard",
    "marks": 3,
    "category": ["Artificial Intelligence", "Deep Learning", "Generative Models"]
  },
  {
    "questionText": "In a Monte Carlo Tree Search implementation for AlphaGo-style algorithms, how does the PUCT (Predictor + UCT) formula balance exploration versus exploitation?",
    "options": [
      "By using only the prior probability from the neural network",
      "By combining visit count statistics with neural network predictions using a weighted sum",
      "By randomly selecting between exploration and exploitation",
      "By always choosing the most visited node"
    ],
    "correctAnswer": "By combining visit count statistics with neural network predictions using a weighted sum",
    "hint": "Think about how PUCT incorporates both the neural network's prior probability and the traditional UCT formula.",
    "level": "hard",
    "marks": 3,
    "category": ["Artificial Intelligence", "Game Theory", "Search Algorithms"]
  },
  {
    "questionText": "When implementing adversarial training for robust neural networks, what is the significance of the Projected Gradient Descent (PGD) attack compared to Fast Gradient Sign Method (FGSM)?",
    "options": [
      "PGD is faster but less effective",
      "PGD performs multiple iterations of FGSM with random restarts, finding stronger adversarial examples",
      "PGD only works on classification tasks",
      "PGD requires less memory than FGSM"
    ],
    "correctAnswer": "PGD performs multiple iterations of FGSM with random restarts, finding stronger adversarial examples",
    "hint": "Consider how iterative optimization with constraints differs from a single-step perturbation.",
    "level": "hard",
    "marks": 3,
    "category": ["Artificial Intelligence", "Adversarial Machine Learning", "Neural Networks"]
  },
  {
    "questionText": "In a graph neural network using message passing, how does the over-smoothing problem manifest as the network depth increases, and what architectural solution does JKNet provide?",
    "options": [
      "Over-smoothing never occurs in GNNs",
      "Node features become too similar, solved by dense connections between all layers",
      "Node features become too similar, solved by selectively aggregating features from different depths",
      "Node features become random, solved by adding skip connections"
    ],
    "correctAnswer": "Node features become too similar, solved by selectively aggregating features from different depths",
    "hint": "Think about how repeated aggregation affects node representations and how maintaining information from different layers helps.",
    "level": "hard",
    "marks": 3,
    "category": ["Artificial Intelligence", "Graph Neural Networks", "Deep Learning"]
  },
  {
    "questionText": "When implementing meta-learning using Model-Agnostic Meta-Learning (MAML), what distinguishes the inner loop optimization from the outer loop optimization?",
    "options": [
      "Inner loop uses SGD, outer loop uses Adam",
      "Inner loop adapts to specific tasks, outer loop optimizes for quick adaptation",
      "Inner loop trains on validation data, outer loop trains on training data",
      "Inner loop uses higher learning rate, outer loop uses lower learning rate"
    ],
    "correctAnswer": "Inner loop adapts to specific tasks, outer loop optimizes for quick adaptation",
    "hint": "Consider the different objectives of task-specific adaptation versus meta-optimization.",
    "level": "hard",
    "marks": 3,
    "category": ["Artificial Intelligence", "Meta-Learning", "Optimization"]
  },
  {
    "questionText": "In a Normalizing Flow model, what is the significance of the bijective transformation requirement, and how does it relate to the change of variables formula?",
    "options": [
      "It ensures the model is reversible but doesn't affect probability computation",
      "It allows exact likelihood computation through the determinant of the Jacobian",
      "It only affects the training speed",
      "It ensures the model converges to a normal distribution"
    ],
    "correctAnswer": "It allows exact likelihood computation through the determinant of the Jacobian",
    "hint": "Think about how probability density changes under invertible transformations.",
    "level": "hard",
    "marks": 3,
    "category": ["Artificial Intelligence", "Generative Models", "Probability Theory"]
  },
  {
    "questionText": "When implementing attention mechanisms in a neural network, how does Sparse Attention differ from Full Attention in terms of computational complexity and information flow?",
    "options": [
      "Sparse attention only reduces memory usage but not computation time",
      "Sparse attention reduces complexity from O(n²) to O(n√n) by attending to selected tokens",
      "Sparse attention increases computational complexity but improves accuracy",
      "Sparse attention and full attention have the same complexity"
    ],
    "correctAnswer": "Sparse attention reduces complexity from O(n²) to O(n√n) by attending to selected tokens",
    "hint": "Consider how limiting attention to a subset of tokens affects the computational requirements.",
    "level": "hard",
    "marks": 3,
    "category": ["Artificial Intelligence", "Deep Learning", "Attention Mechanisms"]
  },
  {
    "questionText": "In a Hierarchical Reinforcement Learning implementation, how does the Option-Critic architecture learn both the options and their policies simultaneously?",
    "options": [
      "By treating options as independent agents",
      "By learning option policies and termination conditions through end-to-end training",
      "By manually defining options and learning only their policies",
      "By using separate networks for options and policies"
    ],
    "correctAnswer": "By learning option policies and termination conditions through end-to-end training",
    "hint": "Think about how policy gradients can be applied to both option selection and option policies.",
    "level": "hard",
    "marks": 3,
    "category": ["Artificial Intelligence", "Reinforcement Learning", "Hierarchical Learning"]
  },
  {
    "questionText": "In the context of web security headers, what is the primary purpose of the Content-Security-Policy (CSP) header's 'nonce' attribute?",
    "options": [
      "To encrypt inline scripts",
      "To allow specific inline scripts while maintaining a strict CSP",
      "To prevent all inline scripts from executing",
      "To validate external scripts only"
    ],
    "correctAnswer": "To allow specific inline scripts while maintaining a strict CSP",
    "hint": "Think about how nonce provides a way to whitelist trusted inline scripts in a page.",
    "level": "medium",
    "marks": 2,
    "category": ["Cybersecurity", "Web Security", "Security Headers"]
  },
  {
    "questionText": "How does a Pass-the-Hash attack differ from traditional password theft, and why can't it be prevented by regular password changes?",
    "options": [
      "It only works on encrypted passwords",
      "It uses the password hash directly for authentication without needing the original password",
      "It only affects administrator accounts",
      "It requires physical access to the system"
    ],
    "correctAnswer": "It uses the password hash directly for authentication without needing the original password",
    "hint": "Consider how Windows authentication can use password hashes stored in memory.",
    "level": "medium",
    "marks": 2,
    "category": ["Cybersecurity", "Network Security", "Authentication"]
  },
  {
    "questionText": "In the context of SQL injection prevention, what security vulnerability might still exist when using parameterized queries if the table or column names are constructed from user input?",
    "options": [
      "None, parameterized queries prevent all SQL injection",
      "Only numeric values can be injected",
      "Table and column names cannot be parameterized, allowing for potential injection",
      "Only affects stored procedures"
    ],
    "correctAnswer": "Table and column names cannot be parameterized, allowing for potential injection",
    "hint": "Consider which parts of an SQL query can be parameterized and which cannot.",
    "level": "medium",
    "marks": 2,
    "category": ["Cybersecurity", "Application Security", "SQL Injection"]
  },
  {
    "questionText": "What is the primary security concern with using CBC mode encryption without authentication, and how does an attack exploit this?",
    "options": [
      "It's too slow for practical use",
      "It allows bit-flipping attacks that can modify the plaintext in predictable ways",
      "It only encrypts fixed-size blocks",
      "It requires more processing power"
    ],
    "correctAnswer": "It allows bit-flipping attacks that can modify the plaintext in predictable ways",
    "hint": "Think about how changes in the ciphertext affect the decrypted plaintext in CBC mode.",
    "level": "medium",
    "marks": 2,
    "category": ["Cybersecurity", "Cryptography", "Encryption Modes"]
  },
  {
    "questionText": "In a properly implemented OAuth 2.0 flow, what security issue can arise if the state parameter is not properly validated?",
    "options": [
      "Token expiration",
      "Cross-Site Request Forgery (CSRF) attacks",
      "Man-in-the-middle attacks",
      "Password brute force attempts"
    ],
    "correctAnswer": "Cross-Site Request Forgery (CSRF) attacks",
    "hint": "Consider how the state parameter helps maintain session state and prevent request forgery.",
    "level": "medium",
    "marks": 2,
    "category": ["Cybersecurity", "Authentication", "OAuth"]
  },
  {
    "questionText": "When implementing certificate pinning in a mobile application, what security trade-off exists between pinning the leaf certificate versus pinning the intermediate or root certificate?",
    "options": [
      "There is no difference in security",
      "Leaf pinning is more secure but requires more frequent updates, intermediate/root pinning is more flexible but less secure",
      "Root pinning is always more secure",
      "Leaf pinning only works on Android"
    ],
    "correctAnswer": "Leaf pinning is more secure but requires more frequent updates, intermediate/root pinning is more flexible but less secure",
    "hint": "Consider the balance between security and maintenance when certificates expire or need to be rotated.",
    "level": "medium",
    "marks": 2,
    "category": ["Cybersecurity", "Mobile Security", "Certificate Pinning"]
  },
  {
    "questionText": "In the context of XSS protection, how does the httpOnly flag on cookies help mitigate attacks, and what type of XSS attack does it NOT protect against?",
    "options": [
      "It prevents all XSS attacks",
      "It prevents cookie theft via JavaScript but doesn't protect against other XSS payloads",
      "It only protects against reflected XSS",
      "It only works in modern browsers"
    ],
    "correctAnswer": "It prevents cookie theft via JavaScript but doesn't protect against other XSS payloads",
    "hint": "Think about what httpOnly prevents JavaScript from doing and what other XSS capabilities exist.",
    "level": "medium",
    "marks": 2,
    "category": ["Cybersecurity", "Web Security", "XSS"]
  },
  {
    "questionText": "What security vulnerability can arise from improper implementation of user session timeout in a web application?",
    "options": [
      "Only affects mobile users",
      "Session fixation attacks become possible",
      "Sessions might remain valid after logout, allowing session hijacking",
      "Only impacts remembered passwords"
    ],
    "correctAnswer": "Sessions might remain valid after logout, allowing session hijacking",
    "hint": "Consider what happens to active sessions when timeout logic isn't properly implemented.",
    "level": "medium",
    "marks": 2,
    "category": ["Cybersecurity", "Web Security", "Session Management"]
  },
  {
    "questionText": "In the context of secure password storage, what is the purpose of using a work factor in password hashing algorithms like bcrypt?",
    "options": [
      "To make passwords longer",
      "To make hash computation deliberately slower, protecting against brute force attacks",
      "To reduce database size",
      "To ensure compatibility across platforms"
    ],
    "correctAnswer": "To make hash computation deliberately slower, protecting against brute force attacks",
    "hint": "Think about how computational cost affects both legitimate users and attackers.",
    "level": "medium",
    "marks": 2,
    "category": ["Cybersecurity", "Authentication", "Password Security"]
  },
  {
    "questionText": "When implementing API security, what vulnerability might exist if JWT tokens are accepted without validating the 'alg' header?",
    "options": [
      "Tokens will expire faster",
      "Attacker can force 'none' algorithm or switch to a weaker algorithm",
      "Only affects refresh tokens",
      "Tokens become larger in size"
    ],
    "correctAnswer": "Attacker can force 'none' algorithm or switch to a weaker algorithm",
    "hint": "Consider how the algorithm header affects token verification process.",
    "level": "medium",
    "marks": 2,
    "category": ["Cybersecurity", "API Security", "JWT"]
  }

]

module.exports = questions;