class Pipe {
  constructor(x, y, context, image, bool=true) {
    this.context = context;
    this.image = image;
    this.height = 32;
    this.width = 32;
    this.spritePos = [0, 128];
    this.viewportDiff = 0;
    this.x = x;
    this.y = y;
    this.render = bool;
    this.maxRender = 100;
    this.passable = false;
  }

  createDouble(map) {
    let pipePair = new Pipe(this.x + 16, this.y, null, null, false)
    map.pipePieces.push(pipePair);
  }
}

module.exports = Pipe;