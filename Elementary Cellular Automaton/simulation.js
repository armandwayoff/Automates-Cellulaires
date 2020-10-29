const DIMENSION = 800;
const RESOLUTION = 50; // whole number
const CELL_WIDTH = DIMENSION / RESOLUTION;

let board = [];
let current_line = 1;

function setup() {
  createCanvas(DIMENSION, DIMENSION / 2);
  for (let i = 0; i < RESOLUTION; i++) {
    board.push([]);
    for (let j = 0; j < RESOLUTION; j++) {
      board[i].push(0);
    }
  }
  // Initialize top cell
  board[RESOLUTION / 2][0] = 1;
}

function draw() {
  background(255);
  for (let i = 0; i < RESOLUTION; i++) {
    for (let j = 0; j < RESOLUTION; j++) {
      if (board[i][j] == 1) {
        fill(0);
        square(i * CELL_WIDTH, j * CELL_WIDTH, CELL_WIDTH);
      }
    }
  }
  new_board(current_line);
  current_line++;
}

function neighbours_color(i, j) {
  let neighbours = [];
  if (board[i - 1][j - 1] == 1) {
    neighbours.push(1);
  } else {
    neighbours.push(0);
  }
  if (board[i][j - 1] == 1) {
    neighbours.push(1);
  } else {
    neighbours.push(0);
  }
  if (board[i + 1][j - 1] == 1) {
    neighbours.push(1);
  } else {
    neighbours.push(0);
  }
  return neighbours;
}

function set_rule(i, j) {
  let neighbours = neighbours_color(i, j);
  
  // Rule 182
  if (are_equal(neighbours, [1, 1, 1])) {
    board[i][j] = 1;
  } else if (are_equal(neighbours, [1, 1, 0])) {
    board[i][j] = 0;
  } else if (are_equal(neighbours, [1, 0, 1])) {
    board[i][j] = 1;
  } else if (are_equal(neighbours, [1, 0, 0])) {
    board[i][j] = 1;
  } else if (are_equal(neighbours, [0, 1, 1])) {
    board[i][j] = 0;
  } else if (are_equal(neighbours, [0, 1, 0])) {
    board[i][j] = 1;
  } else if (are_equal(neighbours, [0, 0, 1])) {
    board[i][j] = 1;
  } else if (are_equal(neighbours, [0, 0, 0])) {
    board[i][j] = 0;
  }
}

function new_board(current_line) {
  for (let i = 1; i < RESOLUTION - 1; i++) {
    set_rule(i, current_line);
  }
}

function are_equal(a1, a2) {
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] != a2[i]) {
      return false;
    }
  }
  return true;
}
