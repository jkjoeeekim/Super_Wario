class Floor {
  constructor(x, y, context, image) {
    this.context = context;
    this.image = image;
    this.height = 16;
    this.width = 16;
    this.spritePos = [0, 0];
    this.viewportDiff = 0;
    this.x = x;
    this.y = y;
    this.maxRender = 153;
    this.passable = false;
  }
}

module.exports = Floor;