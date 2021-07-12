const Floor = require('./floor');
const Roof = require('./roof');

class Map {
  constructor() {
    this.width = 1000;
    this.height = 20;
    this.currentSecond = 0;
    this.frameCount = 0;
    this.floorPieces = [];
    this.roofPieces = [];
    this.floorHoles = [160, 176];
    this.roofFills = [240, 256, 272, 288];
    this.roofHoles = this.generateRoofHoles();
  }

  allPieces() {
    return this.floorPieces.concat(this.roofPieces);
  }

  draw(tile) {
    tile.context.drawImage(tile.image,
      tile.spritePos[0], tile.spritePos[1],
      16, 16,
      tile.x, tile.y,
      tile.width, tile.height
    );
  }

  fpsCounter(context) {
    if (context == null) return;
    let sec = Math.floor(Date.now() / 1000);
    console.log(sec)
    console.log(this.currentSecond)
    let framesPrevSec;

    if (sec != this.currentSecond) {
      this.currentSecond = sec;
      framesPrevSec = this.frameCount;
      console.log(framesPrevSec)
      this.frameCount = 1;
    } else {
      this.frameCount += 1;
    }

    // context.fillStyle = "#ff0000";
    context.fillText("FPS: " + framesPrevSec, 10, 10)
    // window.requestAnimationFrame(this.fpsCounter(context));
  }

  generateTiles(tile, context, image, holes) {
    for (let x = tile.x; x < this.width; x += tile.width) {
      for (let y = tile.y; y < tile.maxRender; y += tile.height) {
        if (holes.includes(x)) {
          break;
        } else {
          let newTile = new tile.constructor(x, y, context, image);
          if (newTile instanceof Floor) this.floorPieces.push(newTile);
          if (newTile instanceof Roof) this.roofPieces.push(newTile);
          this.draw(newTile);
        };
      }
    }
  }

  generateRoofHoles() {
    let holes = [];
    for (let pos = 0; pos < this.width; pos += 16) {
      if (!this.roofFills.includes(pos)) holes.push(pos);
    }
    return holes;
  }
}

module.exports = Map;