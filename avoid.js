let player;
let obstacles = [];
let obstacleSpeed = 3;
let playerSize = 20;
let score = 0;
let gameOverFlag = false;

function setup() {
  createCanvas(400, 400);
  player = new Player();
  obstacles.push(new Obstacle());
}

function draw() {
  background(0);
  player.display();
  player.move();

  // Add new obstacles
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
  }

  // Update and display obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].move();
    obstacles[i].display();

    // Check for collision with player
    if (obstacles[i].hits(player)) {
      gameOver();
    }

    // Remove off-screen obstacles
    if (obstacles[i].offScreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  displayScore();

  if (gameOverFlag) {
    noLoop();
    textAlign(CENTER);
    textSize(32);
    fill(255);
    text("Game Over! Score: " + score, width / 2, height / 2);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.setDir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    player.setDir(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    player.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    player.setDir(1, 0);
  }
}

function keyReleased() {
  player.setDir(0, 0);
}

function gameOver() {
  gameOverFlag = true;
}

function displayScore() {
  textSize(24);
  fill(255);
  text("Score: " + score, 10, 25);
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.xdir = 0;
    this.ydir = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  move() {
    this.x += this.xdir * 5;
    this.y += this.ydir * 5;

    // Constrain player to canvas
    this.x = constrain(this.x, 0, width - playerSize);
    this.y = constrain(this.y, 0, height - playerSize);
  }

  display() {
    fill(50, 150, 255);
    ellipse(this.x, this.y, playerSize, playerSize);
  }
}

class Obstacle {
  constructor() {
    this.x = random(width);
    this.y = random(-100, -10);
    this.size = random(20, 50);
    this.speed = obstacleSpeed;
  }

  move() {
    this.y += this.speed;
  }

  display() {
    fill(255, 50, 50);
    rect(this.x, this.y, this.size, this.size);
  }

  hits(player) {
    let d = dist(this.x + this.size / 2, this.y + this.size / 2, player.x, player.y);
    return d < (this.size / 2 + playerSize / 2);
  }

  offScreen() {
    return this.y > height;
  }
}
