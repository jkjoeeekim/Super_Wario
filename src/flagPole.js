class FlagPole {
  constructor(x, y, context, image, bool=true) {
    this.context = context;
    this.image = image;
    this.height = 16;
    this.width = 16;
    this.spritePos = [256, 144];
    this.viewportDiff = 0;
    this.x = x;
    this.y = y;
    this.render = bool;
    this.maxRender = 112;
    this.passable = false;
  }
}

module.exports = FlagPole;