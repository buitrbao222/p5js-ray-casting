let walls = [];
let particle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] =  new Boundary(x1, y1, x2, y2);
  }

  particle = new Particle();
}

function move(speed) {
  // W
  if (keyIsDown(87)) {
    particle.pos.y -= speed;
  }

  // A
  if (keyIsDown(65)) {
    particle.pos.x -= speed;
  }

  // S
  if (keyIsDown(83)) {
    particle.pos.y += speed;
  }

  // D
  if (keyIsDown(68)) {
    particle.pos.x += speed;
  }
}

let speed = 3.5;

function draw() {
  background(0);
  stroke(255);

  move(speed); 
  
  particle.show();
  particle.lookAt(mouseX, mouseY);
  particle.look(walls);

  // Show walls
  for (let wall of walls) {
    wall.show();
  }

}