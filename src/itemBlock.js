class ItemBlock {
  constructor(x, y, context, image, bool=true) {
    this.context = context;
    this.image = image;
    this.height = 16;
    this.width = 16;
    this.spritePos = [384, 0];
    this.viewportDiff = 0;
    this.x = x;
    this.y = y;
    this.render = bool;
    this.maxRender = 51;
    this.passable = false;
    this.triggered = false;
    let that = this;
    setInterval(function() {
      that.changeSprite();
    }, 600)
  }

  changeSprite() {
    let currentSprite = this.spritePos[0];
    switch (currentSprite) {
      case 400:
        this.spritePos[0] = 384;
        break;
      case 384:
        this.spritePos[0] = 400;
        break;
    }
  }
}

module.exports = ItemBlock;