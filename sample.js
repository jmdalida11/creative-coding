const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

let velX = 2;
let velY = 2;

const boxSize = CANVAS_WIDTH / 5;
let timer = 0;
const tiles = [];
let circle = null;
let renderSorting = null;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  renderSorting = new RenderSorting();

  for (let i = 0; i < 9; i++) {
    const tile = new Tile(
      (i % 3) * boxSize + (CANVAS_WIDTH / 2 - (boxSize * 3) / 2),
      Math.floor(i / 3) * boxSize + (CANVAS_HEIGHT / 2 - (boxSize * 3) / 2),
      boxSize,
      boxSize
    );
    tile.setColor(random(255), random(255), random(255));
    tiles.push(tile);
    renderSorting.addItem(1, tile);
  }

  circle = new Circle(0, 0, 100);
  renderSorting.addItem(0, circle);
}

function draw() {
  background(220);
  handleInput();
  update();
  renderSorting.render();
}

function update() {
  timer += random(10);

  circle.x += velX;
  circle.y += velY;

  for (const tile of tiles) {
    if (timer > 100) {
      tile.setColor(random(255), random(255), random(255));
    }
  }

  if (timer > 100) {
    timer = 0;
  }

  if (circle.x > CANVAS_WIDTH) {
    velX = -2;
  }
  if (circle.x < 0) {
    velX = 2;
  }
  if (circle.y > CANVAS_HEIGHT) {
    velY = -2;
  }
  if (circle.y < 0) {
    velY = 2;
  }
}

function handleInput() {
  if (mouseIsPressed) {
    circle.setPos(mouseX, mouseY);
    renderSorting.toggleSorting();
  }
}

class RenderSorting {
  constructor() {
    this.items = new Map();
    this.isReverseSorting = false;
    this.sorting = (a, b) => a - b;
  }

  addItem(key, item) {
    if (this.items.has(key)) {
      this.items.get(key).push(item);
    } else {
      this.items.set(key, [item]);
    }
  }

  toggleSorting() {
    this.isReverseSorting = !this.isReverseSorting;
    if (this.isReverseSorting) {
      this.sorting = (a, b) => b - a;
    } else {
      this.sorting = (a, b) => a - b;
    }
  }

  render() {
    for (const key of this.items.keys().toArray().sort(this.sorting)) {
      for (const item of this.items.get(key)) {
        item.render();
      }
    }
  }
}

class Circle {
  constructor(x, y, r) {
    this.setPos(x, y);
    this.r = r;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  render() {
    fill(255, 0, 0);
    stroke(0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

class Tile {
  constructor(x, y, w, h) {
    this.setPos(x, y);
    this.w = w;
    this.h = h;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  setColor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  render() {
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h);
  }
}
