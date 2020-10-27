const SIZE = 600;
const DIMENSION = 80;
const CELL_WIDTH = SIZE / DIMENSION;
const SPEED = 1;
const NUM_INIT_CELL = 2000;

let canvas = [];


function number_of_neighbours(matrix, i, j) {
  let count = 0;
  for (let x = -1; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      if (i + x >= 0 && i + x < DIMENSION && j + y >= 0 && j + y < DIMENSION) {
        if (matrix[i + x][j + y] == 1) {
          count++;
        }
      }
    }
  }
  if (matrix[i][j] == 1) {
    return count - 1;
  } else {
    return count;
  }
}

function next_generation(previous_state) {
  let new_canvas = [];
  for (let i = 0; i < DIMENSION; i++) {
    new_canvas.push([]);
    for (let j = 0; j < DIMENSION; j++) {
      new_canvas[i].push(0);
    }
  }
  for (let i = 0; i < DIMENSION; i++) {
    for (let j = 0; j < DIMENSION; j++) {
      let num_neigh = number_of_neighbours(previous_state, i, j);
      if (previous_state[i][j] == 1 && num_neigh < 2) {
        new_canvas[i][j] = 0;
      } else if (previous_state[i][j] == 1 && 2 <= num_neigh && num_neigh <= 3) {
        new_canvas[i][j] = 1;
      } else if (previous_state[i][j] == 1 && num_neigh > 3) {
        new_canvas[i][j] = 0;
      } else if (previous_state[i][j] == 0 && num_neigh == 3) {
        new_canvas[i][j] = 1;
      }
    }
  }
  return new_canvas;
}

function setup() {
  createCanvas(SIZE, SIZE);
  for (let i = 0; i < DIMENSION; i++) {
    canvas.push([]);
    for (let j = 0; j < DIMENSION; j++) {
      canvas[i].push(0);
    }
  }

  // First shape
  for (i = 0; i < NUM_INIT_CELL; i++) {
    canvas[floor(random(DIMENSION))][floor(random(DIMENSION))] = 1;
  }
}

function draw() {
  background(255);
  for (let i = 0; i < DIMENSION; i++) {
    for (let j = 0; j < DIMENSION; j++) {
      stroke(220);
      line(i * CELL_WIDTH, 0, i * CELL_WIDTH, height);
      line(0, j * CELL_WIDTH, width, j * CELL_WIDTH);
      if (canvas[i][j] == 1) {
        fill(0);
        rect(j * CELL_WIDTH, i * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
      }
    }
  }

  if (frameCount % SPEED == 0) {
    newCanvas = next_generation(canvas);
    canvas = newCanvas;
  }
}
