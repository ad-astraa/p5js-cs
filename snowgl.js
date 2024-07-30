let snowflakes = []; // Array to hold snowflake objects

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  
  setGradient(0, 0, width, height, color(0, 153, 204), color(255, 255, 255));

  drawSnowglobe();


  if (frameCount % 5 === 0) {
    snowflakes.push(new Snowflake());
  }

  for (let flake of snowflakes) {
    flake.update();
    flake.display();
  }
}

function drawSnowglobe() {
  // Draw the snow globe base
  fill(150, 75, 0);
  rect(width / 2 - 100, height - 50, 200, 40);
  fill(100, 50, 0);
  rect(width / 2 - 110, height - 40, 220, 10);

  fill(255);
  ellipse(width / 2, height / 2, 300, 300);
  drawGradientInsideGlobe(width / 2, height / 2, 290, color(0, 0, 102), color(0, 51, 153));

  // Masking effect for the globe
  fill(220);
  ellipse(width / 2, height / 2, 290, 290);
}

function drawGradientInsideGlobe(x, y, d, c1, c2) {
  // Draw a gradient inside the globe
  for (let i = y - d / 2; i <= y + d / 2; i++) {
    let inter = map(i, y - d / 2, y + d / 2, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x - sqrt(d * d / 4 - (y - i) * (y - i)), i, x + sqrt(d * d / 4 - (y - i) * (y - i)), i);
  }
}

function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

class Snowflake {
  constructor() {
    // Set initial position and speed for each snowflake
    this.posX = random(width / 2 - 140, width / 2 + 140);
    this.posY = random(-50, 0);
    this.size = random(2, 5);
    this.speed = random(1, 2);
  }

  update() {
    // Update the position of the snowflake
    this.posY += this.speed;

    // Reset position when snowflake reaches the bottom of the globe
    if (this.posY > height / 2 + 140) {
      this.posY = random(-50, 0);
      this.posX = random(width / 2 - 140, width / 2 + 140);
    }
  }

  display() {
    fill(255);
    ellipse(this.posX, this.posY, this.size);
  }
}
