let score = 0;
let timer = 30;
let currentProblem;
let difficulty = 'easy';
let isGameOver = false;
let showHint = false;
let hint = '';
let answerInput;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  frameRate(1); // Update timer every second
  generateProblem();

  // Create an input field for the answer
  answerInput = createInput('');
  answerInput.position(150, height / 2 + 30);
  answerInput.size(100);
  answerInput.input(handleInput);
}

function draw() {
  background(240);
  displayUI();
  if (timer <= 0 || isGameOver) {
    gameOver();
  } else {
    timer--;
  }
}

function generateProblem() {
  let num1, num2, operation;
  if (difficulty === 'easy') {
    num1 = floor(random(1, 10));
    num2 = floor(random(1, 10));
  } else if (difficulty === 'medium') {
    num1 = floor(random(10, 50));
    num2 = floor(random(10, 50));
  } else if (difficulty === 'hard') {
    num1 = floor(random(50, 100));
    num2 = floor(random(50, 100));
  }

  let operations = ['+', '-', '*', '/'];
  operation = random(operations);

  if (operation === '/' && num2 === 0) {
    num2 = 1; // Avoid division by zero
  }

  currentProblem = { num1, num2, operation };

  if (operation === '/') {
    hint = `Hint: Consider integer division!`;
  } else {
    hint = '';
  }
}

function displayUI() {
  fill(0);
  textSize(18);
  text(`Score: ${score}`, width / 2, 20);
  text(`Time: ${timer}`, width / 2, 50);
  textSize(24);
  text(`${currentProblem.num1} ${currentProblem.operation} ${currentProblem.num2} = ?`, width / 2, height / 2 - 20);
  textSize(16);
  if (showHint) {
    text(hint, width / 2, height / 2 + 20);
  }
}

function handleInput() {
  if (isGameOver) {
    return;
  }

  let answer = parseFloat(answerInput.value());
  let correctAnswer;
  if (currentProblem.operation === '+') {
    correctAnswer = currentProblem.num1 + currentProblem.num2;
  } else if (currentProblem.operation === '-') {
    correctAnswer = currentProblem.num1 - currentProblem.num2;
  } else if (currentProblem.operation === '*') {
    correctAnswer = currentProblem.num1 * currentProblem.num2;
  } else if (currentProblem.operation === '/') {
    correctAnswer = floor(currentProblem.num1 / currentProblem.num2);
  }

  if (answer === correctAnswer) {
    score++;
    generateProblem();
    timer = 30; // Reset timer
    answerInput.value(''); // Clear the input field
  } else {
    isGameOver = true;
  }
}

function gameOver() {
  background(240);
  textSize(32);
  fill('red');
  text('Game Over!', width / 2, height / 2 - 40);
  textSize(24);
  text(`Final Score: ${score}`, width / 2, height / 2);
  textSize(16);
  text('Press R to restart', width / 2, height / 2 + 40);

  if (key === 'R' || key === 'r') {
    restartGame();
  }
}

function restartGame() {
  score = 0;
  timer = 30;
  isGameOver = false;
  showHint = false;
  generateProblem();
  answerInput.value(''); // Clear the input field
  answerInput.show(); // Show the input field again
}
