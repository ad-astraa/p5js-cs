let atoms = [];
let bonds = [];
let palette = [];
let selectedAtom = null;
let moleculeName = "";
let currentChallengeIndex = 0;
let currentBondType = 1; // 1: Single, 2: Double, 3: Triple

let challenges = [
  {name: "Water (H2O)", formula: "H2O", required: {'H': 2, 'O': 1}},
  {name: "Methane (CH4)", formula: "CH4", required: {'C': 1, 'H': 4}},
  {name: "Ethanol (C2H6O)", formula: "C2H6O", required: {'C': 2, 'H': 6, 'O': 1}},
];

function setup() {
  createCanvas(400, 400);

  // Create UI buttons for bond type selection
  let singleBondButton = createButton('Single Bond');
  singleBondButton.position(10, height - 110);
  singleBondButton.mousePressed(() => currentBondType = 1);

  let doubleBondButton = createButton('Double Bond');
  doubleBondButton.position(10, height - 80);
  doubleBondButton.mousePressed(() => currentBondType = 2);

  let tripleBondButton = createButton('Triple Bond');
  tripleBondButton.position(10, height - 50);
  tripleBondButton.mousePressed(() => currentBondType = 3);

  palette.push(new Atom('C', 50, 50, color(100, 100, 100))); // Carbon
  palette.push(new Atom('H', 50, 100, color(200, 200, 200))); // Hydrogen
  palette.push(new Atom('O', 50, 150, color(255, 0, 0))); // Oxygen
  palette.push(new Atom('N', 50, 200, color(0, 0, 255))); // Nitrogen
  palette.push(new Atom('S', 50, 250, color(255, 255, 0))); // Sulfur
}

function draw() {
  background(240);
  displayPalette();
  displayAtomsAndBonds();
  formBonds();
  checkMolecule();
  displayMoleculeInfo();
  displayChallenge();
  displayBondType();
}

function displayPalette() {
  for (let atom of palette) {
    atom.display();
  }
}

function displayAtomsAndBonds() {
  for (let bond of bonds) {
    bond.display();
  }
  for (let atom of atoms) {
    atom.display();
  }
}

function mousePressed() {
  for (let atom of palette) {
    if (atom.isMouseOver()) {
      selectedAtom = new Atom(atom.type, mouseX, mouseY, atom.color);
      break;
    }
  }
  if (!selectedAtom) {
    for (let atom of atoms) {
      if (atom.isMouseOver()) {
        selectedAtom = atom;
        break;
      }
    }
  }
}

function mouseDragged() {
  if (selectedAtom) {
    selectedAtom.x = mouseX;
    selectedAtom.y = mouseY;
  }
}

function mouseReleased() {
  if (selectedAtom && !palette.includes(selectedAtom)) {
    atoms.push(selectedAtom);
    selectedAtom = null;
    formBonds();
  }
}

function formBonds() {
  bonds = [];
  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      let d = dist(atoms[i].x, atoms[i].y, atoms[j].x, atoms[j].y);
      if (d < 100) {
        let existingBond = bonds.find(bond => 
          (bond.atom1 === atoms[i] && bond.atom2 === atoms[j]) || 
          (bond.atom1 === atoms[j] && bond.atom2 === atoms[i])
        );
        if (!existingBond) {
          bonds.push(new Bond(atoms[i], atoms[j], currentBondType));
        }
      }
    }
  }
}

function checkMolecule() {
  let elementCounts = {};
  for (let atom of atoms) {
    if (!elementCounts[atom.type]) elementCounts[atom.type] = 0;
    elementCounts[atom.type]++;
  }

  let challenge = challenges[currentChallengeIndex];
  let isMatch = true;
  for (let element in challenge.required) {
    if (elementCounts[element] !== challenge.required[element]) {
      isMatch = false;
      break;
    }
  }

  if (isMatch) {
    moleculeName = `Correct! ${challenge.name}`;
    setTimeout(() => {
      currentChallengeIndex = (currentChallengeIndex + 1) % challenges.length;
      atoms = [];
      bonds = [];
      moleculeName = "";
    }, 2000);
  } else {
    moleculeName = "";
  }
}

function displayMoleculeInfo() {
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text(moleculeName, width / 2, height - 30);
}

function displayChallenge() {
  fill(0);
  textSize(16);
  textAlign(LEFT);
  let challenge = challenges[currentChallengeIndex];
  text(`Challenge: Create ${challenge.name}`, 10, height - 100);
  text(`Formula: ${challenge.formula}`, 10, height - 80);
}

function displayBondType() {
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text(`Current Bond Type: ${currentBondType === 1 ? 'Single' : currentBondType === 2 ? 'Double' : 'Triple'}`, 10, height - 20);
}

class Atom {
  constructor(type, x, y, color) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, 30, 30);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.type, this.x, this.y);
  }

  isMouseOver() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    return d < 15;
  }
}

class Bond {
  constructor(atom1, atom2, type) {
    this.atom1 = atom1;
    this.atom2 = atom2;
    this.type = type; // 1: single, 2: double, 3: triple
  }

  display() {
    stroke(0);
    strokeWeight(this.type); // Adjust thickness based on bond type
    line(this.atom1.x, this.atom1.y, this.atom2.x, this.atom2.y);
  }
}
