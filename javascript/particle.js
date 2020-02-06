class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.pov = 50;
    this.rays = [];
    this.speed = 3.5;
    this.size = 20;
  }

  show() {
    push();
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
  }

  inRange(wall) {
    let v1 = p5.Vector.sub(wall.center, wall.a);
    let v2 = p5.Vector.sub(wall.center, wall.b);
    let v3 = p5.Vector.sub(this.pos, wall.a);
    let v4 = p5.Vector.sub(this.pos, wall.b);
    return v1.dot(v3) > 0 && v2.dot(v4) > 0;
  }

  distance(wall) {
    let v5 = p5.Vector.sub(this.pos, wall.center);
    return abs(v5.dot(wall.normal));
  }

  move() {
    let W = keyIsDown(87);
    let A = keyIsDown(65);
    let S = keyIsDown(83); 
    let D = keyIsDown(68);

    

    // Find movement angle for movement vector
    let angle;
    if ((W && !S) || (S && !W)) { // Vertical movement detected
      angle = 90 + 45 * (A && !D) - 45 * (!A && D); // Including horizontal movement
      angle -= angle*2*W;
    }
    else if ((A && !D) || (!A && D)) { // Only horizontal movement detected
      angle = 180 * (A && !D) + 360 * (!A && D);
    }

    // If no movement angle found => No movement => End fuction
    if (!angle) {
      return;
    }

    // Movement vector
    let v = p5.Vector.fromAngle(radians(angle), this.speed);

    // Move player
    this.pos.add(v);

    // Visualize movement vector
    drawArrow(this.pos, p5.Vector.mult(v, 10));

    // Handling collision
    for (let wall of walls) {
      let distance = this.distance(wall);
      if (this.inRange(wall)) {
        while (this.size / 2 - distance > pow(10, -3)) {
          v = p5.Vector.fromAngle(radians(angle), this.size / 2 - distance);
          this.pos.sub(v);
          distance = this.distance(wall);
        }
      }
    }  
    
  }

  lookAt(x, y) {
    this.rays = [];
    let angle = atan2(y - this.pos.y, x - this.pos.x);

    for (let a = -this.pov / 2; a < this.pov / 2; a += 0.1) {
      this.rays.push(new Ray(this.pos, angle + radians(a)));
    }
  }

  look() {
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