// Variables
let eyeWidth = 30;
let eyeHeight = 20;
let pupilWidth = 10;
let pupilHeight = 10;
let toggle = false; // Variable to track toggle state

function setup() {
  createCanvas(340, 340); 
  background(214, 168, 228);
}

function draw() {
  // Dynamic background color
  background(214 - mouseX / 2, 168 - mouseY / 2, 228 - mouseX / 4);

  stroke(120, 81, 169);
  fill(214, 168, 228);
  ellipse(width/2, 198, 150, 195);

  // Eyes
  if (toggle) {
    // Eyes Closed
    fill(120, 81, 169);
    ellipse(148, 170, eyeWidth, 2);  // Left eye background
    ellipse(198, 170, eyeWidth, eyeHeight);  // Right eye background
  } else {
    // Eyes Open
    fill(255);
    noStroke();
    ellipse(148, 170, eyeWidth, eyeHeight);  // Left eye white
    ellipse(198, 170, eyeWidth, eyeHeight);  // Right eye white

    fill(0);
    ellipse(148, 170, pupilWidth, pupilHeight);  // Left pupil
    ellipse(198, 170, pupilWidth, pupilHeight);  // Right pupil
  }

  // Nose
  fill(120, 81, 169);
  triangle(170, 190, 158, 220, 178, 220);

  // Eyebrows
  stroke(120, 81, 169);
  strokeWeight(4);
  noFill();
  // Animated eyebrows
  let browOffset = map(mouseY, 0, height, -5, 5);
  arc(148, 155 + browOffset, 30, 10, PI, 0);  
  arc(198, 155 + browOffset, 30, 10, PI, 0);  

  // Mouth (smile with teeth if smiling)
  if (mouseIsPressed) {
    fill(255);
    noStroke();
    arc(168, 240, 60, 40, 0, PI, CHORD); // Semi-circle smile
  } else {
    // Regular closed mouth
    stroke(120, 81, 169);
    strokeWeight(3);
    noFill();
    arc(168, 240, 60, 40, 0, PI); // Closed mouth
  }

  // Hat
  fill(100, 100, 255);
  triangle(mouseX - 20, 120, mouseX + 20, 120, mouseX, 70);
  rect(mouseX - 25, 120, 50, 10);

  textSize(13.5);
  fill(0);
  textAlign(CENTER);
  text("Click to see me close my eyes.", width/2, 320);
  text("Click again to see me open them.", width/2, 335); // Adjusted y position
}

/* FUNCTIONS */

function mousePressed() {
  // Toggle the value of toggle variable
  toggle = !toggle;
}
