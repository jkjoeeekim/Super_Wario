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
    console.log(this.x);
    this.x += direction;
    console.log(this.x);
  }

  moveY(direction, that, steps = 0) {
    console.log('steps: ', steps)
    console.log(this.y);
    let wario = this;
    that.animate();

    if (steps === 6) {
      that.animate();
      return;
    } else if (steps < 3) {
      this.y -= direction;
      return setTimeout(function () {
        wario.moveY(direction, that, steps + 1);
      }, 500);
    } else if (steps < 6 && steps > 2) {
      this.y += direction;
      return setTimeout(function () {
        wario.moveY(direction, that, steps + 1);
      }, 500);
    }

    console.log(this.y);
  }
}

module.exports = Wario;