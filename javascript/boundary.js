class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
    // this.length = dist(this.a.x, this.a.y, this.b.x, this.b.y);
    let dx = this.b.x - this.a.x;
    let dy = this.b.y - this.a.y;
    this.normal = createVector(-dy, dx).normalize();
    this.center = p5.Vector.add(this.a, this.b).div(2);
  }

  show() {
    push();
    strokeWeight(4);
    // Wall
    line(this.a.x, this.a.y, this.b.x, this.b.y);

    // Normal vector
    // drawArrow(this.center, p5.Vector.mult(this.normal, 20));
    pop();
  }
}