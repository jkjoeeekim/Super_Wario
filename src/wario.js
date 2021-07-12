class Wario {
  constructor(x, y) {
    this.height = 34 / 2;
    this.width = 48 / 2;
    this.x = x;
    this.y = y;
    this.context = null;
    this.image = null;
  }

  draw() {
    this.context.drawImage(this.image, 13, 670, 35, 49, this.x, this.y, this.width, this.height);
  }

  moveX(direction) {
    console.log('old pos', this.x);
    this.x += direction;
    console.log('new pos', this.x);
  }

  moveY(direction, that, steps = 0) {
    console.log('steps: ', steps)
    console.log(this.y);
    let wario = this;
    let maxSteps = 24;
    that.animate();

    if (steps === maxSteps) {
      that.animate();
      return;
    } else if (steps < maxSteps / 2) {
      this.y -= direction;
      return setTimeout(function () {
        wario.moveY(direction, that, steps + 1);
      }, 20);
    } else if (steps < maxSteps && steps >= maxSteps / 2) {
      this.y += direction;
      return setTimeout(function () {
        wario.moveY(direction, that, steps + 1);
      }, 20);
    }

    console.log(this.y);
  }
}

module.exports = Wario;