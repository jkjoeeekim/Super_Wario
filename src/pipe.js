class Pipe {
  constructor(x, y, context, image) {
    this.context = context;
    this.image = image;
    this.height = 32;
    this.width = 32;
    this.spritePos = [0, 128];
    this.viewportDiff = 0;
    this.x = x;
    this.y = y;
    this.maxRender = 100;
    this.passable = false;
  }
}

module.exports = Pipe;