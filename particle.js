class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    for (let i = 0; i < 360; i += 1) {
      this.rays.push(new Ray(this.pos, radians(i)));
    }
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 16);
  }

  look(walls) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = min(d, record);
            closest = pt;
          }
        }
      }
      if (closest) {
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      else {
        line(this.pos.x, this.pos.y, ray.pos.x + ray.dir.x * width, ray.pos.y +  ray.dir.y * width);
      }
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }
}