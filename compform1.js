let elements = [
  { name: 'Hydrogen', symbol: 'H', color: [255, 200, 200] },
  { name: 'Oxygen', symbol: 'O', color: [200, 255, 200] },
  { name: 'Carbon', symbol: 'C', color: [200, 200, 255] },
  { name: 'Nitrogen', symbol: 'N', color: [255, 255, 200] },
  { name: 'Sulfur', symbol: 'S', color: [255, 200, 255] }
];

let compounds = [
  { reactants: ['H', 'O'], product: 'H2O', name: 'Water', structure: 'H-O-H' },
  { reactants: ['C', 'O'], product: 'CO2', name: 'Carbon Dioxide', structure: 'O=C=O' },
  { reactants: ['N', 'H'], product: 'NH3', name: 'Ammonia', structure: 'H-N-H\n    |\n    H' },
  { reactants: ['S', 'O'], product: 'SO2', name: 'Sulfur Dioxide', structure: 'O=S=O' }
];

let selectedElements = [];
let message = '';
let success = false;
let score = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);
  displayElements();
  displayMessage();
  displayScoreboard();
}

function displayElements() {
  let x = 50;
  let y = 50;
  let boxWidth = 70;
  let boxHeight = 70;
  let gap = 20;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    fill(element.color);
    stroke(0);
    strokeWeight(2);
    rect(x, y, boxWidth, boxHeight, 10);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text(element.symbol, x + boxWidth / 2, y + boxHeight / 2 - 10);
    textSize(12);
    text(element.name, x + boxWidth / 2, y + boxHeight / 2 + 20);
    y += boxHeight + gap;
  }
}

function mousePressed() {
  let x = 50;
  let y = 50;
  let boxWidth = 70;
  let boxHeight = 70;
  let gap = 20;

  for (let i = 0; i < elements.length; i++) {
    if (mouseX > x && mouseX < x + boxWidth && mouseY > y && mouseY < y + boxHeight) {
      selectedElements.push(elements[i].symbol);
      if (selectedElements.length === 2) {
        checkCompound(selectedElements[0], selectedElements[1]);
        selectedElements = [];
      }
      return;
    }
    y += boxHeight + gap;
  }
}

function checkCompound(el1, el2) {
  for (let compound of compounds) {
    if ((compound.reactants.includes(el1) && compound.reactants.includes(el2)) || 
        (compound.reactants.includes(el2) && compound.reactants.includes(el1))) {
      message = `Success! You formed ${compound.name} (${compound.product}).`;
      success = true;
      score++;
      displayStructure(compound.structure);
      return;
    }
  }
  message = 'No compound formed. Try different elements!';
  success = false;
}

function displayMessage() {
  fill(success ? 'green' : 'red');
  textSize(18);
  textAlign(CENTER);
  text(message, width / 2, 320); // Adjust the y position to the bottom of the canvas
}

function displayScoreboard() {
  fill(0);
  textSize(16);
  textAlign(RIGHT);
  text(`Score: ${score}`, width - 20, 30);
}

function displayStructure(structure) {
  textSize(20);
  textAlign(CENTER);
  fill(0);
  text(structure, 300, 150); // Display structure in the right side area
}
