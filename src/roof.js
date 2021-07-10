class Roof {
  constructor(x, y, context, image) {
    this.context = context;
    this.image = image;
    this.height = 16;
    this.width = 16;
    this.spritePos = [16, 0];
    this.x = x;
    this.y = y;
    this.maxRender = 51;
    this.passable = false;
  }
}

module.exports = Roof;