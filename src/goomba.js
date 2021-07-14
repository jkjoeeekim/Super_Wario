class Goomba {
  constructor(x, y) {
    this.height = 16;
    this.width = 24;
    this.x = x;
    this.y = y;
    this.viewportDiff = 0;
    this.render = true;
    this.triggered = false;
    // this.spritePos = [290, 40]
    this.spritePos = [90, 40]
    this.context = null;
    this.image = null;

    let that = this;
    setInterval(function() {
      that.changeSprite();
    }, 500)
  }

  moveX() {
    this.x -= .5;
  }

  triggerMovement(goomba) {
    goomba.triggered = true;
    setInterval(function () {
      goomba.moveX();
    }, 1000 / 60);
  }

  changeSprite() {
    switch (this.spritePos[0]) {
      case 90:
        this.spritePos[0] = 290;
        break;
      case 290:
        this.spritePos[0] = 90;
        break;
    }
  }

  draw(tile) {
    this.context.drawImage(
      this.image,
      this.spritePos[0], this.spritePos[1],
      225, 200,
      this.x - tile.viewportDiff, this.y,
      this.width, this.height
    );
  }
}

module.exports = Goomba;