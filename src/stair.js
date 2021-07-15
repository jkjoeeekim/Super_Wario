class Stair {
  constructor(x, y, context, image, bool=true) {
    this.context = context;
    this.image = image;
    this.height = 16;
    this.width = 16;
    this.spritePos = [0, 16];
    this.viewportDiff = 0;
    this.x = x;
    this.y = y;
    this.render = bool;
    this.maxRender = 112;
    this.passable = false;
  }
}

module.exports = Stair;