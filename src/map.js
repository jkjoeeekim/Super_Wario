const Floor = require('./floor');
const Roof = require('./roof');
const Pipe = require('./pipe');
const ItemBlock = require('./itemBlock');

class Map {
  constructor() {
    this.width = 1500;
    this.height = 20;
    this.currentSecond = 0;
    this.frameCount = 0;
    this.framesPrevSec = 0;
    this.floorPieces = [];
    this.roofPieces = [];
    this.emptyPieces = [];
    this.pipePieces = [];
    this.itemBlockPieces = [];
    this.floorHoles = [160, 176, 560, 576, 800, 816];
    this.roofFills = [240, 272, 288, 864, 880, 896];
    this.itemBlockFills = [256, 912];
    this.pipeFills = [480];
    this.roofHoles = this.generateHoles(this.roofFills, 16);
    this.itemBlockHoles = this.generateHoles(this.itemBlockFills, 16);
    this.pipeHoles = this.generateHoles(this.pipeFills, 32);
  }

  allPieces() {
    return this.floorPieces.concat(this.itemBlockPieces).concat(this.roofPieces).concat(this.pipePieces).concat(this.emptyPieces);
  }

  allRenderPieces() {
    return this.floorPieces.concat(this.itemBlockPieces).concat(this.roofPieces).concat(this.pipePieces)
  }

  draw(tile) {
    if (tile.render) {
      tile.context.drawImage(
        tile.image,
        tile.spritePos[0], tile.spritePos[1],
        tile.width, tile.height,
        tile.x - tile.viewportDiff, tile.y,
        tile.width, tile.height
      );
    }
  }

  fpsCounter(context) {
    if (context == null) return;
    let sec = Math.floor(Date.now() / 1000);

    if (sec != this.currentSecond) {
      this.currentSecond = sec;
      this.framesPrevSec = this.frameCount;
      this.frameCount = 1;
    } else {
      this.frameCount += 1;
    }
    context.fillText("FPS: " + this.framesPrevSec, 10, 10);
  }

  generateTiles(tile, context, image, holes) {
    for (let x = tile.x; x < this.width; x += tile.width) {
      for (let y = tile.y; y < tile.maxRender; y += tile.height) {
        if (holes.includes(x)) {
          break;
        } else {
          let pieceIdx = 0;
          this.emptyPieces.forEach((piece, index) => {
            if (piece.x === x && piece.y === y) pieceIdx = index;
          });
          this.emptyPieces.splice(pieceIdx, 1);
          let newTile = new tile.constructor(x, y, context, image, this);
          if (newTile instanceof Floor) this.floorPieces.push(newTile);
          if (newTile instanceof Roof) this.roofPieces.push(newTile);
          if (newTile instanceof Pipe) {
            newTile.createDouble(this)
            this.pipePieces.push(newTile);
          };
          if (newTile instanceof ItemBlock) this.itemBlockPieces.push(newTile);
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

  generateHoles(fills, width) {
    let holes = [];
    for (let pos = 0; pos < this.width; pos += width) {
      if (!fills.includes(pos)) holes.push(pos);
    }
    return holes;
  }
}

module.exports = Map;