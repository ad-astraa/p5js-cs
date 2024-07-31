let eyeWidth = 30;
let eyeHeight = 20;
let pupilWidth = 10;
let pupilHeight = 10;
let toggle = false; 

function setup() {
  createCanvas(340, 340); 
  background(214, 168, 228);
}

function draw() {
  background(214 - mouseX / 2, 168 - mouseY / 2, 228 - mouseX / 4);

  stroke(120, 81, 169);
  fill(214, 168, 228);
  ellipse(width/2, 198, 150, 195);

  // Eyes
  if (toggle) {
    // Eyes Closed
    fill(120, 81, 169);
    ellipse(148, 170, eyeWidth, 2);  // Left 
    ellipse(198, 170, eyeWidth, eyeHeight);  // Right 
  } else {
    // Eyes Open
    fill(255);
    noStroke();
    ellipse(148, 170, eyeWidth, eyeHeight);  // Left 
    ellipse(198, 170, eyeWidth, eyeHeight);  // Right 

    fill(0);
    ellipse(148, 170, pupilWidth, pupilHeight);  // Left 
    ellipse(198, 170, pupilWidth, pupilHeight);  // Right 
  }

  // Nose
  fill(120, 81, 169);
  triangle(170, 190, 158, 220, 178, 220);

  // Eyebrows
  stroke(120, 81, 169);
  strokeWeight(4);
  noFill();
  let browOffset = map(mouseY, 0, height, -5, 5);
  arc(148, 155 + browOffset, 30, 10, PI, 0);  
  arc(198, 155 + browOffset, 30, 10, PI, 0);  

  // Mouth (smile with teeth if smiling)
  if (mouseIsPressed) {
    fill(255);
    noStroke();
    arc(168, 240, 60, 40, 0, PI, CHORD); 
  } else {
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
  text("Click again to see me open them.", width/2, 335); 
}

function mousePressed() {
  toggle = !toggle;
}
