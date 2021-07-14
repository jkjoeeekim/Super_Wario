const Wario = require('./wario');
const Map = require('./map');
const Floor = require('./floor');
const Roof = require('./roof');
const Tile = require('./tile');
const Pipe = require('./pipe');
const ItemBlock = require('./itemBlock');
const Goomba = require('./goomba');

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
    this.testGoomba = new Goomba(64, 99);
    this.goomba1 = new Goomba(400, 99);
    this.goomba2 = new Goomba(432, 99);
    this.goomba3 = new Goomba(752, 99);
    this.goomba4 = new Goomba(784, 99);
    this.goomba5 = new Goomba(1008, 99);
    this.goomba6 = new Goomba(1040, 99);
    this.map.goombaPieces = [this.testGoomba, this.goomba1, this.goomba2, this.goomba3, this.goomba4, this.goomba5, this.goomba6];
    // this.map.goombaPieces = this.goombas;
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
            if (!wario.dead) {
              wario.jump(2, that);
            }
            setTimeout(function () { that.keysDown[e.key] = false; }, 515);
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

  // toggleGoomba(wario, tile, goomba) {
  //   if (wario.x + tile.viewportDiff > goomba.x - 200) {
  //     goomba.triggerMovement();
  //   }
  // }

  // give all units a value of viewportDiff which keeps track of x-axis difference.
  moveBack(tile, num, wario, goomba) {
    tile.viewportDiff += num;
    wario.viewportDiff += num;
    goomba.viewportDiff += num;
  }

  start(fnc) {
    let that = this;
    const wario = this.character;
    const goomba = this.goomba1;
    Object.keys(this.keysDown).forEach((key) => {
      if (this.keysDown[key]) {
        switch (key) {
          case 'ArrowLeft':
            if (this.canMove(wario, 'backward')) {
              wario.moveX(-1);
              // wario.currentTile(that);
            };
            break;
          case 'ArrowRight':
            if (this.canMove(wario, 'forward')) {
              if (wario.x + 5 > 100) {
                if (this.notRendering) {
                  this.notRendering = false;
                  let allPieces = that.map.allPieces();
                  allPieces.forEach(piece => {
                    that.moveBack(piece, 1, wario, goomba);
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
    // this.toggleGoomba(wario, this.floor, goomba);
    let animationFrame = requestAnimationFrame(this.start.bind(this, fnc));
    if (this.checkDeath(wario)) {
      setTimeout(function () {
        fnc();
      }, 1500);
    }
    if (this.checkDeath(wario)) {
      cancelAnimationFrame(animationFrame);
    };
  }

  checkDeath(wario) {
    // let tiles = wario.currentTiles(this);
    if (wario.y > 106) {
      wario.dead = true;
    }
    return wario.dead;
    // tiles.splice(0, 2)
    // let anyGoombas = false;
    // tiles.forEach(tile => {
    //   if (tile ) {

    //   }
    // })
  }

  checkGoomba(game, fx) {
    this.map.goombaPieces.forEach((goomba, index) => {
      if (goomba.x - 208 === fx && !goomba.triggered) {
        goomba.triggerMovement(goomba);
        // this.map.goombaPieces.splice(index, 1);
      }
    });
  }

  animate() {
    this.context.clearRect(0, 0, 800, 600);
    const allPieces = this.map.allRenderPieces();
    allPieces.forEach((tile) => {
      this.map.draw(tile);
    });
    this.map.goombaPieces.forEach(goomba => {
      goomba.draw(allPieces[0]);
    });
    // this.goomba1.draw(allPieces[0]);
    this.character.draw();
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

  canMove(wario, direction) {
    let allFloorPieces = this.map.floorPieces;
    let tiles = wario.currentTiles(this);
    tiles.slice(2);
    let bubble = wario.bubble(this);
    let rightBubble = bubble['rightBubble'];
    let leftBubble = bubble['leftBubble'];
    switch (direction) {
      case 'forward':
        let frontxCoord = this.closestCoordinate(wario.x + tiles[0].viewportDiff);
        let frontyCoord = this.closestCoordinate(wario.y);
        let fx = frontxCoord[1];
        let fy = frontyCoord[1];
        // console.log(fx)
        this.checkGoomba(this, fx);
        if (wario.nogoZones.includes([fx, fy])) {
          return false;
        } else {
          return true;
        }
      case 'backward':
        let backxCoord = this.closestCoordinate(wario.x + tiles[0].viewportDiff);
        let backyCoord = this.closestCoordinate(wario.y);
        let bx = backxCoord[0];
        let by = backyCoord[0];
        if (wario.nogoZones.includes([bx, by])) {
          return false;
        } else if (wario.x - 10 < 0) {
          return false;
        } else {
          return true;
        }
    }
    return false;
  }

  canMove2(wario, direction) {
    let tiles = wario.currentTiles(this);
    let closestXCoords = this.closestCoordinate(wario.x + tiles[0].viewportDiff);
    let closestYCoords = this.closestCoordinate(wario.y);
    let bubble = wario.bubble(this);
    // console.log(tiles)

    switch (direction) {
      case 'forward':
        // let forward = true;
        // let nogoCoords = this.noGoZones();
        // console.log(nogoCoords);
        // nogoCoords.forEach(coord => {
        //   if (wario.x + tiles[0].viewportDiff > coord[0] && wario.x + tiles[0].viewportDiff < coord[0] + 16 && wario.y < coord[1] && wario.y > coord[1] - 16) {
        //     // console.log(wario.x)
        //     forward = false;
        //   }
        // });
        // return forward
        let forward = 0;
        bubble['leftBubble'].forEach(tile => {
          if (tiles[0] instanceof Pipe && tiles[1] instanceof Pipe && tiles[2] instanceof Pipe) {
            wario.x -= 20;
            forward -= 200;
          }
          if (tile.passable) {
            forward += 51;
          }
          if (tiles[2] instanceof Pipe) {
            forward -= 100;
          }
          if (wario.y < tiles[0].y && wario.y < tiles[1].y) {
            forward += 50;
          }
        });
        return forward > 0;
        break;
      case 'backward':
        let backward = 0;
        bubble['rightBubble'].forEach(tile => {
          if (tiles[0] instanceof Pipe && tiles[1] instanceof Pipe && tiles[2] instanceof Pipe) {
            wario.x += 20;
            backward -= 200;
          }
          if (tile.passable) {
            backward += 51;
          }
          if (tiles[2] instanceof Pipe) {
            backward -= 100;
          }
          if (wario.y < tiles[0].y && wario.y < tiles[1].y) {
            backward += 50;
          }
          if (wario.x - 5 < 0) {
            backward = -10;
          } else if (tile.passable) {
            backward += 1;
          }
        });
        return backward > 0;
        break;
    }
  }

  enableGravity(obj) {
    let tiles = obj.currentTiles(this);
    let bottomTiles = [tiles[0], tiles[1]];
    let goombas = this.map.goombaPieces;
    let that = this;
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
    this.getClosestTileLeft();
    this.checkDeathGoomba(bottomTiles);
    if (goombas.includes(bottomTiles[0]) || goombas.includes(bottomTiles[1])) {
      // bottomTiles[0].triggerDeath(bottomTiles[0], that);
      return true;
    } else if (floorCount < 2 || pipeCount > 0) {
      return true;
    } else if (floorCount < 2 && pipeCount > 0) {
      obj.x -= 3;
      obj.y += 1;
      return true;
    } else {
      obj.y += 1;
      return false;
    };
  }

  getClosestTileLeft() {
    let wario = this.character;
    let closestXcoord = this.closestCoordinate(wario.x);
    let closestYcoord = this.closestCoordinate(wario.y);
    let tiles = this.map.allRenderPieces();
    let leftTile = null;
    tiles.forEach(tile => {
      // console.log('cord', closestXcoord[0])
      // console.log('tile', tile.x)
      if (tile.x === closestXcoord[0]) {
        if (tile.y === closestYcoord[0]) {
          leftTile = tile;
        }
      }
    });
    // console.log(leftTile)
    return leftTile;
  }

  checkDeathByGoomba(tile) {
    let wario = this.character;
    let goombas = this.map.goombaPieces;

    goombas.forEach(goomba => {
      // console.log('hellohello')
      if (goomba.x > (wario.x + tile.viewportDiff - 28)) {
        // console.log('hellohello')
        if (goomba.x < (wario.x + tile.viewportDiff + 16)) {
          // console.log('hellohello')
          if (goomba.y < wario.y + 10) {
            if (!goomba.dead) {
              wario.dead = true;
            }
          }
        }
      }
    });
  }

  checkDeathGoomba(bottomTiles) {
    let bottomLeft = bottomTiles[0];
    let bottomRight = bottomTiles[1];
    let wario = this.character;
    let that = this;
    this.map.goombaPieces.forEach(goomba => {
      if (goomba.x >= (bottomLeft.x - 16) && goomba.x <= (bottomRight.x + 16)) {
        this.checkDeathByGoomba(bottomLeft);
        if (goomba.y > wario.y + 5 && goomba.y < wario.y + 15) {
          goomba.dead = true;
          if (!goomba.jumpedOn && !wario.dead) {
            goomba.jumpedOn = true;
            wario.bouncing = true;
            setTimeout(function () {
              wario.bouncing = false;
            }, 200);
            setTimeout(function () {
              goomba.triggerDeath(goomba, that);
            }, 200);
            wario.bouncing = true;
            setTimeout(function () {
              wario.jump(2, that, 10);
            }, 25);
          }
        }
      }
    });
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