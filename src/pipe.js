class Pipe {
  constructor(x, y, context, image, bool = true) {
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
    let pipePair1 = new Pipe(this.x + 16, this.y, null, null, false);
    let pipePair2 = new Pipe(this.x, this.y + 16, null, null, false);
    let pipePair3 = new Pipe(this.x + 16, this.y + 16, null, null, false);
    map.pipePieces.push(pipePair1);
    map.pipePieces.push(pipePair2);
    map.pipePieces.push(pipePair3);
  }
}

module.exports = Pipe;