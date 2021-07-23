class Goomba {
  constructor(x, y) {
    this.height = 16;
    this.width = 24;
    this.x = x;
    this.y = y;
    this.viewportDiff = 0;
    this.render = true;
    this.triggered = false;
    this.passable = false;
    this.spritePos = [90, 40];
    // this.spritePos = [500, 30]
    this.context = null;
    this.image = null;
    this.moving = null;
    this.dead = false;
    this.jumpedOn = false;

    let that = this;
    setInterval(function () {
      that.changeSprite();
    }, 300);
  }

  moveX() {
    this.x -= .5;
  }

  triggerMovement(goomba) {
    goomba.triggered = true;
    this.moving = setInterval(function () {
      goomba.moveX();
    }, 1000 / 60);
  }

  triggerDeath(goomba, that) {
    goomba.passable = true;
    goomba.jumpedOn = true;
    // goomba.spritePos[0] = 500;
    goomba.spritePos = [500, 30];
    goomba.dead = true;
    let goombas = that.map.goombaPieces;
    let goombaIdx = goombas.indexOf(goomba);
    setTimeout(function () {
      that.map.goombaPieces.splice(goombaIdx, 1);
    }, 200);
    if (goomba.moving) {
      clearInterval(goomba.moving);
    }
  }

  fall(steps = 0) {
    let maxSteps = 36;
    let that = this;
    if (steps === maxSteps) {
      return;
    } else {
      this.y += 1;
      return setTimeout(function () {
        that.fall(steps + 1);
      }, 15);
    }
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