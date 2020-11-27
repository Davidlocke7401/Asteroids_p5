class Projectile {
  constructor(posX, posY, angle) {
    this.pos = createVector(posX, posY);
    this.vel = p5.Vector.fromAngle(radians(angle+90), -10);
    this.damping = 1;
    this.bounce = this.damping - 1;
    this.r = 5;
    this.col = 0;
    this.touched = false;
  }

  spring(t) {
    this.diff = createVector(this.pos.x, this.pos.y);
    this.diff.sub(t);
    this.diff.limit(this.damping);
    return (this.diff);
  }

  update() {

    this.pos.add(this.vel);


    return this;
  }

  display() {
    let len = 33;
    push();
    blendMode(ADD);
    colorMode(HSB, 255, 255, 255, 255);
    for (let i = 0; i < 10; i++) {
      stroke(this.col % 255, 200, 255, 255 / i);
      strokeWeight(i * 4);
      ellipse(this.pos.x, this.pos.y, this.r);
    }
    pop();

    return this;
  }

  bounds() {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;

    if (this.pos.y >= height - (this.r * 0.5)) {
      this.isBounce = true;
      this.vel.y *= -1;
      this.pos.y = height - (this.r * 0.5);
    }
    
    return this;
  }

  render() {
    return this.update().display().bounds();
  }
}
