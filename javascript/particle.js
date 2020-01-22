class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.pov = 50;
    this.rays = [];
  }

  show() {
    ellipse(this.pos.x, this.pos.y, 16);
  }

  lookAt(x, y) {
    this.rays = [];
    let angle = atan2(y - this.pos.y, x - this.pos.x);

    for (let a = -this.pov / 2; a < this.pov / 2; a += 0.5) {
      this.rays.push(new Ray(this.pos, angle + radians(a)));
    }
  }

  look(walls) {
    push();

    beginShape();
    noStroke();
    fill('rgba(255,255,255,0.1)');

    vertex(this.pos.x, this.pos.y);

    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record && d <= ray.range) {
            record = d;
            closest = pt;
          }
        }
      }

      if (closest) {
        ray.end = closest;
      }

      vertex(ray.end.x, ray.end.y);
    }
    
    endShape(CLOSE);

    pop();
  }
}