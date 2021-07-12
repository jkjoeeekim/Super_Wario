class Wario {
  constructor(x, y) {
    this.height = 34 / 2;
    this.width = 48 / 2;
    this.x = x;
    this.y = y + 5;
    this.context = null;
    this.image = null;
  }

  draw() {
    this.context.drawImage(this.image, 13, 670, 35, 49, this.x - 10, this.y + 5, this.width, this.height);
  }

  moveX(direction) {
    console.log('old pos', this.x);
    this.x += direction;
    console.log('new pos', this.x);
  }

  jump(direction, that, steps = 0) {
    console.log('steps: ', steps)
    console.log(this.y);
    let wario = this;
    let maxSteps = 36;
    that.animate();

    if (steps === maxSteps) {
      that.animate();
      return;
    } else {
      this.y -= direction;
      return setTimeout(function () {
        wario.jump(direction, that, steps + 1);
      }, 5);
    }

    console.log(this.y);
  }
}

module.exports = Wario;