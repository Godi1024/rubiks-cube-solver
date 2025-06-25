class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r'),
    };
  }

  rotateFaceClockwise(faceKey) {
    const oldFace = this.faces[faceKey].slice();
    const newFace = [];

    newFace[0] = oldFace[6];
    newFace[1] = oldFace[3];
    newFace[2] = oldFace[0];
    newFace[3] = oldFace[7];
    newFace[4] = oldFace[4];
    newFace[5] = oldFace[1];
    newFace[6] = oldFace[8];
    newFace[7] = oldFace[5];
    newFace[8] = oldFace[2];

    this.faces[faceKey] = newFace;
  }

  displayCube() {
    let result = "Cube state:\n";
    for (let face in this.faces) {
      result += `${face}: ${this.faces[face].join(' ')}\n`;
    }
    return result;
  }

  rotateU() {
    this.rotateFaceClockwise('U');
    const { F, R, B, L } = this.faces;
    const temp = F.slice(0, 3);

    F[0] = R[0]; F[1] = R[1]; F[2] = R[2];
    R[0] = B[0]; R[1] = B[1]; R[2] = B[2];
    B[0] = L[0]; B[1] = L[1]; B[2] = L[2];
    L[0] = temp[0]; L[1] = temp[1]; L[2] = temp[2];
  }

  rotateD() {
    this.rotateFaceClockwise('D');
    const { F, R, B, L } = this.faces;
    const temp = F.slice(6, 9);

    F[6] = L[6]; F[7] = L[7]; F[8] = L[8];
    L[6] = B[6]; L[7] = B[7]; L[8] = B[8];
    B[6] = R[6]; B[7] = R[7]; B[8] = R[8];
    R[6] = temp[0]; R[7] = temp[1]; R[8] = temp[2];
  }

  rotateF() {
    this.rotateFaceClockwise('F');
    const { U, R, D, L } = this.faces;
    const temp = [U[6], U[7], U[8]];

    U[6] = L[8]; U[7] = L[5]; U[8] = L[2];
    L[8] = D[2]; L[5] = D[1]; L[2] = D[0];
    D[2] = R[0]; D[1] = R[3]; D[0] = R[6];
    R[0] = temp[0]; R[3] = temp[1]; R[6] = temp[2];
  }

  rotateB() {
    this.rotateFaceClockwise('B');
    const { U, R, D, L } = this.faces;
    const temp = [U[0], U[1], U[2]];

    U[0] = R[2]; U[1] = R[5]; U[2] = R[8];
    R[2] = D[8]; R[5] = D[7]; R[8] = D[6];
    D[6] = L[0]; D[7] = L[3]; D[8] = L[6];
    L[0] = temp[2]; L[3] = temp[1]; L[6] = temp[0];
  }

  rotateL() {
    this.rotateFaceClockwise('L');
    const { U, F, D, B } = this.faces;
    const temp = [U[0], U[3], U[6]];

    U[0] = B[8]; U[3] = B[5]; U[6] = B[2];
    B[8] = D[0]; B[5] = D[3]; B[2] = D[6];
    D[0] = F[0]; D[3] = F[3]; D[6] = F[6];
    F[0] = temp[0]; F[3] = temp[1]; F[6] = temp[2];
  }

  rotateR() {
    this.rotateFaceClockwise('R');
    const { U, F, D, B } = this.faces;
    const temp = [U[2], U[5], U[8]];

    U[2] = F[2]; U[5] = F[5]; U[8] = F[8];
    F[2] = D[2]; F[5] = D[5]; F[8] = D[8];
    D[2] = B[6]; D[5] = B[3]; D[8] = B[0];
    B[6] = temp[0]; B[3] = temp[1]; B[0] = temp[2];
  }
}

// Global cube instance
let cube = new Cube();
let moveHistory = [];

// Normal move
function makeMove(moveName) {
  cube[moveName]();
  moveHistory.push(moveName);
  document.getElementById("moves").innerText = moveHistory.join(" ");
  displayCube();
}

// Prime move (3x same move)
function applyPrime(moveName) {
  for (let i = 0; i < 3; i++) {
    cube[moveName]();
  }
  moveHistory.push(moveName + "'");
  document.getElementById("moves").innerText = moveHistory.join(" ");
  displayCube();
}

// Display cube
function displayCube() {
  const output = cube.displayCube();
  document.getElementById("cubeOutput").innerText = output;
}

// Scramble (5 random moves)
function scramble() {
  const moves = ['rotateU', 'rotateD', 'rotateL', 'rotateR', 'rotateF', 'rotateB'];
  moveHistory = [];
  let lastMove = "";

  for (let i = 0; i < 5; i++) {
    let move;
    do {
      move = moves[Math.floor(Math.random() * moves.length)];
    } while (move === lastMove);

    cube[move]();
    moveHistory.push(move);
    lastMove = move;
  }

  document.getElementById("moves").innerText = moveHistory.join(" ");
  displayCube();
}

// Solve: Reverse all moves using applyPrime
function solve() {
  const reversed = [...moveHistory].reverse();
  reversed.forEach(move => {
    const base = move.replace("'", ""); // remove prime
    applyPrime(base);
  });
}
