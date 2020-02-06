let walls = [];
let particle;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // for (let i = 0; i < 5; i++) {
  //   let x1 = random(width);
  //   let x2 = random(width);
  //   let y1 = random(height);
  //   let y2 = random(height);
  //   walls[i] = new Boundary(x1, y1, x2, y2);
  // }

  particle = new Particle();
}

function draw() {
  background(0);
  stroke(255);

  particle.move();
  particle.show();
  particle.lookAt(mouseX, mouseY);
  particle.look();

  // Show walls
  for (let wall of walls) {
    wall.show();
  }
}

let p1;

function mousePressed() {
  p1 = createVector(mouseX, mouseY);
}

function mouseReleased() {
  p2 = createVector(mouseX, mouseY);
  walls.push(new Boundary(p1.x, p1.y, p2.x, p2.y));
}

function drawArrow(base, vec) {
  push();
  strokeWeight(3);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 3;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}