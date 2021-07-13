const Wario = require('./wario');
const Map = require('./map');
const Floor = require('./floor');
const Roof = require('./roof');
const Tile = require('./tile');
const Pipe = require('./pipe');
const ItemBlock = require('./itemBlock');

class Game {
  constructor(context) {
    this.keysDown = {
      'ArrowLeft': false,
      'ArrowRight': false,
      'ArrowUp': false
    };
    this.context = context;
    this.map = new Map();
    this.emptyTile = new Tile(-16, 0);
    this.character = new Wario(25, 0);
    this.pipe = new Pipe(480, 80);
    this.floor = new Floor(0, 112);
    this.itemBlock = new ItemBlock(0, 48);
    this.roof = new Roof(240, 48);
    this.notRendering = true;
  }

  bindKeyHandlers() {
    const wario = this.character;
    let that = this;

    document.addEventListener('keypress', function (e) {
      if (e.key === ' ') {
        if (!that.keysDown[e.key]) {
          if (that.enableGravity(wario)) {
            that.keysDown[e.key] = true;
            wario.jump(2, that);
            setTimeout(function () { that.keysDown[e.key] = false; }, 550);
          }
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

  moveBack(tile, num, wario) {
    tile.viewportDiff += num;
    wario.viewportDiff += num;
    // wario.relativex += num;
    // wario.moveX(1, false);
  }

  start(fnc) {
    let that = this;
    const wario = this.character;
    Object.keys(this.keysDown).forEach((key) => {
      if (this.keysDown[key]) {
        switch (key) {
          case 'ArrowLeft':
            if (this.canMove2(wario, 'backward')) {
              wario.moveX(-1);
              // wario.currentTile(that);
            };
            break;
          case 'ArrowRight':
            if (this.canMove2(wario, 'forward')) {
              if (wario.x + 5 > 100) {
                if (this.notRendering) {
                  this.notRendering = false;
                  let allPieces = that.map.allPieces();
                  allPieces.forEach(piece => {
                    that.moveBack(piece, 1, wario);
                  });
                  setTimeout(function () {
                    that.notRendering = true;
                  }, 6);
                };
              } else {
                wario.moveX(1, true);
              }
            };
            break;
        }
      }
    });

    this.animate();
    this.map.fpsCounter(this.context);
    this.enableGravity(wario);
    let animationFrame = requestAnimationFrame(this.start.bind(this, fnc));
    if (this.checkDeath(wario)) {
      setTimeout(function() {
        fnc();
      }, 1500)
    }
    if (this.checkDeath(wario)) {
      cancelAnimationFrame(animationFrame);
    };
  }

  checkDeath(wario) {
    if (wario.y > 111) {
      return true;
    } else {
      return false;
    }
  }

  animate() {
    this.context.clearRect(0, 0, 800, 600);
    const allPieces = this.map.allPieces();
    allPieces.forEach((tile) => {
      if (tile instanceof Tile) {
        return;
      } else {
        this.map.draw(tile);
      }
    });
    // this.context.clearRect(0, 0, 800, 600);
    // this.map.generateTiles(this.floor)
    this.character.draw();
    // requestAnimationFrame(this.animate(context, image));
  }

  noGoZones() {
    let allPieces = this.map.allPieces();
    let noGoCoords = [];
    allPieces.forEach(piece => {
      if (!piece.passable) {
        noGoCoords.push([piece.x, piece.y]);
      }
    });
    return noGoCoords;
  }

  canMove2(wario, direction) {
    let tiles = wario.currentTiles(this);
    let closestXCoords = this.closestCoordinate(wario.x + tiles[0].viewportDiff);
    let closestYCoords = this.closestCoordinate(wario.y);
    let bubble = wario.bubble(this);

    switch (direction) {
      case 'forward':
        let forward = 0;
        bubble['rightBubble'].forEach(tile => {
          if (tile.passable) {
            forward += 1;
          }
        })
        return forward > 0;
        break;
      case 'backward':
        let backward = 0;
        bubble['leftBubble'].forEach(tile => {
        if (wario.x - 16 < 0) {
          backward = -10;
        } else if (tile.passable) {
            backward += 1;
          }
        })
        return backward > 0;
        break;
    }
  }

  canMove(wario, direction) {
    let allFloorPieces = this.map.floorPieces;
    let tiles = wario.currentTiles(this);
    tiles.slice(2);
    let bubble = wario.bubble(this);
    let rightBubble = bubble['rightBubble'];
    let leftBubble = bubble['leftBubble'];
    switch (direction) {
      case 'forward':
        let forwardMoves = 0;
        rightBubble.forEach(tile => {
          if (tile instanceof Floor) {
            forwardMoves += 1;
          }
        });
        console.log(rightBubble);
        tiles.forEach(tile => {
          if (tile instanceof Pipe) {
            forwardMoves += 1;
          }
        });
        return forwardMoves < 3;
      case 'backward':
        let backwardMoves = 0;
        leftBubble.forEach(tile => {
          if (tile instanceof Floor) {
            backwardMoves += 1;
          }
        });
        return backwardMoves < 2;
    }
    return false;
  }

  enableGravity(obj) {
    let tiles = obj.currentTiles(this);
    let bottomTiles = [tiles[0], tiles[1]];
    let floorCount = 0;
    let pipeCount = 0;

    bottomTiles.forEach(tile => {
      if (tile instanceof Floor) {
        return;
      } else if (tile instanceof Pipe) {
        pipeCount += 1;
      } else {
        floorCount += 1;
      }
    });

    if (floorCount < 2 || pipeCount > 0) {
      return true;
    } else {
      obj.y += 1;
      return false;
    };
  }

  closestCoordinate(ord, width = 16) {
    for (let i = 0; i < width; i++) {
      let newOrd = ord - i;
      if (newOrd % width === 0) {
        return [newOrd, newOrd + width];
      }
    }
  }

  tilesAtXCoordinate(ord) {
    let closestOrd = this.closestCoordinate(ord);
    let allPieces = this.map.floorPieces;
    let leftTiles = [];
    let rightTiles = [];

    allPieces.forEach(tile => {
      if (tile.x === closestOrd[0]) leftTiles.push(tile);
      if (tile.x === closestOrd[1]) rightTiles.push(tile);
    });

    return [leftTiles, rightTiles];
  }
}

module.exports = Game;