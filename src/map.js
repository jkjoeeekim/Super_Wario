const Floor = require('./floor');
const Stair = require('./stair');
const Roof = require('./roof');
const Pipe = require('./pipe');
const Cloud = require('./cloud');
const ItemBlock = require('./itemBlock');
const FlagPole = require('./flagPole');
const FlagPoleTip = require('./flagPoleTip');

class Map {
  constructor() {
    this.width = 1500;
    this.height = 20;
    this.ingameSecond = 0;
    this.currentSecond = 0;
    this.frameCount = 0;
    this.framesPrevSec = 0;
    this.floorPieces = [];
    this.stairPieces = [];
    this.roofPieces = [];
    this.emptyPieces = [];
    this.pipePieces = [];
    this.cloudPieces = [];
    this.itemBlockPieces = [];
    this.flagPolePieces = [];
    this.flagPoleTipPieces = [];
    this.goombaPieces = [];
    this.floorHoles = [160, 176, 560, 576, 800, 816];
    this.roofFills = [240, 272, 288, 864, 880, 896];
    this.itemBlockFills = [256, 912];
    this.pipeFills = [480, 1376];
    this.cloudFills = [64, 352, 640, 928, 1216];
    this.cloud2Fills = [208, 496, 784, 1072, 1360];
    this.stairFills = [1152];
    this.stair2Fills = [1168];
    this.stair3Fills = [1184];
    this.stair4Fills = [1200];
    // this.stair5Fills = [112, 1216];
    this.flagPoleFills = [1296];
    this.flagPoleTipFills = [1296];
    this.stairHoles = this.generateHoles(this.stairFills, 16);
    this.stair2Holes = this.generateHoles(this.stair2Fills, 16);
    this.stair3Holes = this.generateHoles(this.stair3Fills, 16);
    this.stair4Holes = this.generateHoles(this.stair4Fills, 16);
    // this.stair5Holes = this.generateHoles(this.stair5Fills, 16);
    this.roofHoles = this.generateHoles(this.roofFills, 16);
    this.itemBlockHoles = this.generateHoles(this.itemBlockFills, 16);
    this.pipeHoles = this.generateHoles(this.pipeFills, 32);
    this.cloudHoles = this.generateHoles(this.cloudFills, 16);
    this.cloud2Holes = this.generateHoles(this.cloud2Fills, 16);
    this.flagPoleHoles = this.generateHoles(this.flagPoleFills, 16);
    this.flagPoleTipHoles = this.generateHoles(this.flagPoleTipFills, 16);
  }

  allPieces() {
    return this.floorPieces.concat(this.flagPolePieces).concat(this.cloudPieces).concat(this.flagPoleTipPieces).concat(this.stairPieces).concat(this.itemBlockPieces).concat(this.roofPieces).concat(this.pipePieces).concat(this.goombaPieces).concat(this.emptyPieces);
  }

  allRenderPieces() {
    return this.floorPieces.concat(this.stairPieces).concat(this.cloudPieces).concat(this.flagPolePieces).concat(this.flagPoleTipPieces).concat(this.itemBlockPieces).concat(this.roofPieces).concat(this.pipePieces);
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

  topBar(context, wario, that) {
    if (context == null) return;
    let sec = Math.floor(Date.now() / 1000);

    if (sec != this.currentSecond) {
      this.currentSecond = sec;
      this.framesPrevSec = this.frameCount;
      this.frameCount = 1;
      if (wario.controlsActive) {
        this.ingameSecond += 1;
      }
    } else {
      this.frameCount += 1;
    }
    context.fillText("SCORE: " + wario.points, 120, 10);
    context.fillText("TIME: " + this.ingameSecond, 250, 10);
    context.fillText("FPS: " + this.framesPrevSec, 5, 10);
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
          if (newTile instanceof Stair) this.stairPieces.push(newTile);
          if (newTile instanceof FlagPole) this.flagPolePieces.push(newTile);
          if (newTile instanceof FlagPoleTip) this.flagPoleTipPieces.push(newTile);
          if (newTile instanceof Cloud) {
            newTile.createDouble(this);
            this.cloudPieces.push(newTile);
          };
          if (newTile instanceof Pipe) {
            newTile.createDouble(this);
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