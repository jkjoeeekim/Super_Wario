class Cloud {
  constructor(x, y, context, image, bool = true, maxRender, spritePosX = 0, spritePosY = 320) {
    this.context = context;
    this.image = image;
    this.height = 16;
    this.width = 16;
    this.spritePos = [spritePosX, spritePosY];
    this.viewportDiff = 0;
    this.x = x;
    this.y = y;
    this.maxRender = maxRender;
    this.render = bool;
    this.passable = true;
  }

  createDouble(map) {
    let cloudPair1 = new Cloud(this.x + 16, this.y, this.context, this.image, true, this.maxRender, 16, 320);
    let cloudPair2 = new Cloud(this.x + 32, this.y, this.context, this.image, true, this.maxRender, 32, 320);
    let cloudPair3 = new Cloud(this.x, this.y + 16, this.context, this.image, true, this.maxRender, 0, 336);
    let cloudPair4 = new Cloud(this.x + 16, this.y + 16, this.context, this.image, true, this.maxRender, 16, 336);
    let cloudPair5 = new Cloud(this.x + 32, this.y + 16, this.context, this.image, true, this.maxRender, 32, 336);
    map.cloudPieces.push(cloudPair1);
    map.cloudPieces.push(cloudPair2);
    map.cloudPieces.push(cloudPair3);
    map.cloudPieces.push(cloudPair4);
    map.cloudPieces.push(cloudPair5);
  }
}

module.exports = Cloud;