const Wario = require('./wario');
const Map = require('./map');
const Floor = require('./floor');
const Roof = require('./roof');

class Game {
  constructor(context) {
    this.keysDown = {
      'ArrowLeft': false,
      'ArrowRight': false,
      'ArrowUp': false
    };
    this.context = context;
    this.map = new Map();
    this.character = new Wario(25, 0);
    this.floor = new Floor(0, 112);
    this.roof = new Roof(0, 48);
  }

  bindKeyHandlers() {
    const wario = this.character;
    let that = this;

    document.addEventListener('keypress', function (e) {
      if (e.key === ' ') {
        if (!that.keysDown[e.key]) {
          that.keysDown[e.key] = true;
          wario.jump(2, that);
          setTimeout(function () { that.keysDown[e.key] = false; }, 550);
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        that.keysDown[e.key] = true;
      }
    });

    document.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        that.keysDown[e.key] = false;
      }
    });
  }

  start() {
    let that = this;
    const wario = this.character;
    Object.keys(this.keysDown).forEach((key) => {
      if (this.keysDown[key]) {
        switch (key) {
          case 'ArrowLeft':
            wario.moveX(-1);
            break;
          case 'ArrowRight':
            wario.moveX(1);
            break;
        }
      }
    });

    this.animate();
    this.map.fpsCounter(this.context);
    this.enableGravity(wario);
    requestAnimationFrame(this.start.bind(this));
  }

  animate() {
    this.context.clearRect(0, 0, 800, 600);
    const allPieces = this.map.allPieces();
    allPieces.forEach((tile) => {
      this.map.draw(tile);
    });
    // this.context.clearRect(0, 0, 800, 600);
    // this.map.generateTiles(this.floor)
    this.character.draw();
    // requestAnimationFrame(this.animate(context, image));
  }

  enableGravity(obj) {
    // console.log(obj.x + obj.width)
    // console.log(obj.y + obj.height)
    this.context.fillText(".", obj.x + obj.width, obj.y + obj.height);
    // console.log(this);
    console.log('y', obj.y + obj.height);
    console.log('x', obj.x + obj.width);
    let allFloorPieces = this.map.floorPieces;
    let tiles = this.tilesAtXCoordinate(obj.x, allFloorPieces);
    // console.log('top floor y', tiles[0].y);
    // console.log('top floor x', tiles[0].x);
    console.log(tiles);
    if (tiles.length === 0) {
      console.log('falling')
      obj.y += 1;
    } else if ((obj.y + obj.height) < tiles[0].y) {
      console.log('falling');
      obj.y += 1;
    }
  }

  closestXCoordinate(xOrd) {
    // let newOrd = xOrd;
    for (let i = 0; i < 16; i++) {
      if ((xOrd - i) % 16 === 0) {
        return xOrd - i;
      }
    }
  }

  tilesAtXCoordinate(xOrd, pieces) {
    let ord = this.closestXCoordinate(xOrd);
    console.log(ord);
    let allPieces = pieces;
    // console.log(allfloorPieces);
    // debugger;
    let tiles = [];

    // floorPieces.forEach(tile => console.log(tile))
    // debugger;
    allPieces.forEach(tile => {
      if (tile.x === ord) tiles.push(tile);
    });
    // console.log(tiles);

    return tiles;
  }
}

module.exports = Game;