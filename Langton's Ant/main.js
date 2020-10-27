// 1 = "BLACK"
// 0 = "WHITE"


const SIZE = 600;
const RESOLUTION = 51;
const PIXEL_WIDTH = SIZE / RESOLUTION;

let fourmi;
let board = [];
let iteration = 0;

function setup() {
  createCanvas(SIZE, SIZE);
  fourmi = new Fourmi(floor(RESOLUTION / 2), floor(RESOLUTION / 2), "UP");

  for (let i = 0; i < RESOLUTION; i++) {
    board.push([]);
    for (let j = 0; j < RESOLUTION; j++) {
      board[i].push(0);
    }
  }
}

function draw() {
  background(255);
  for (let i = 0; i < RESOLUTION; i++) {
    for (let j = 0; j < RESOLUTION; j++) {
      stroke(200);
      line(i * PIXEL_WIDTH, 0, i * PIXEL_WIDTH, height);
      line(0, j * PIXEL_WIDTH, width, j * PIXEL_WIDTH);
      if (board[i][j] == 1) {
        fill(0);
        square(j * PIXEL_WIDTH, i * PIXEL_WIDTH, PIXEL_WIDTH);
      }
    }
  }

  fourmi.display();
  fourmi.color_of_pixel();
  iteration++;
  
  fill(0);
  textSize(30);
  text(iteration, 10, 40);
}

class Fourmi {
  constructor(x, y, orientation) {
    this.x = x;
    this.y = y;
    this.o = orientation;
  }

  display() {
    fill("limegreen");
    if (this.o == "UP") {
      triangle(this.x * PIXEL_WIDTH, (this.y + 1) * PIXEL_WIDTH,
        (this.x + 1) * PIXEL_WIDTH, (this.y + 1) * PIXEL_WIDTH,
        (this.x + 1 / 2) * PIXEL_WIDTH, this.y * PIXEL_WIDTH);
    }
    if (this.o == "RIGHT") {
      triangle(this.x * PIXEL_WIDTH, this.y * PIXEL_WIDTH,
        this.x * PIXEL_WIDTH, (this.y + 1) * PIXEL_WIDTH,
        (this.x + 1) * PIXEL_WIDTH, (this.y + 1 / 2) * PIXEL_WIDTH);
    }
    if (this.o == "DOWN") {
      triangle(this.x * PIXEL_WIDTH, this.y * PIXEL_WIDTH,
        (this.x + 1) * PIXEL_WIDTH, this.y * PIXEL_WIDTH,
        (this.x + 1 / 2) * PIXEL_WIDTH, (this.y + 1) * PIXEL_WIDTH);
    }
    if (this.o == "LEFT") {
      triangle((this.x + 1) * PIXEL_WIDTH, this.y * PIXEL_WIDTH,
        (this.x + 1) * PIXEL_WIDTH, (this.y + 1) * PIXEL_WIDTH,
        this.x * PIXEL_WIDTH, (this.y + 1 / 2) * PIXEL_WIDTH);
    }
  }

  up() {
    this.y--;
    this.o = "UP";
  }

  right() {
    this.x++;
    this.o = "RIGHT";
  }

  down() {
    this.y++;
    this.o = "DOWN";
  }

  left() {
    this.x--;
    this.o = "LEFT";
  }

  color_of_pixel() {
    if (board[this.y][this.x] == 1) { // BLACK
      board[this.y][this.x] = 0;
      if (this.o == "UP") {
        this.left();
        print("left");
      } else if (this.o == "RIGHT") {
        this.up();
        print("up");
      } else if (this.o == "DOWN") {
        this.right();
        print("right");
      } else if (this.o == "LEFT") {
        this.down();
        print("down");
      }
    } else { // WHITE
      board[this.y][this.x] = 1;
      if (this.o == "UP") {
        this.right();
        print("right");
      } else if (this.o == "RIGHT") {
        this.down();
        print("down");
      } else if (this.o == "DOWN") {
        this.left();
        print("left");
      } else if (this.o == "LEFT") {
        this.up();
        print("up");
      }
    }
  }
}
