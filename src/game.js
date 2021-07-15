const Wario = require('./wario');
const Map = require('./map');
const Floor = require('./floor');
const Stair = require('./stair');
const Roof = require('./roof');
const Tile = require('./tile');
const Pipe = require('./pipe');
const ItemBlock = require('./itemBlock');
const Goomba = require('./goomba');
const FlagPole = require('./flagPole');
const FlagPoleTip = require('./flagPoleTip');
const Cloud = require('./cloud');

class Game {
  constructor(context) {
    this.keysDown = {
      'ArrowLeft': false,
      'ArrowRight': false,
      'KeyD': false,
      'KeyA': false
    };
    this.context = context;
    this.map = new Map();
    this.emptyTile = new Tile(-32, -32);

    // wario
    this.character = new Wario(25, 0);

    // goombas
    this.testGoomba = new Goomba(64, 99);
    this.goomba1 = new Goomba(400, 99);
    this.goomba2 = new Goomba(432, 99);
    this.goomba3 = new Goomba(752, 99);
    this.goomba4 = new Goomba(784, 99);
    this.goomba5 = new Goomba(1008, 99);
    this.goomba6 = new Goomba(1040, 99);
    this.map.goombaPieces = [this.goomba1, this.goomba2, this.goomba3, this.goomba4, this.goomba5, this.goomba6];

    // floors, pipes, item blocks, roofs, flag pole, flag pole tip.
    this.flagPole = new FlagPole(32, 48);
    this.flagPoleTip = new FlagPoleTip(16, 32);
    this.pipe = new Pipe(480, 80);
    this.floor = new Floor(0, 112);
    this.itemBlock = new ItemBlock(256, 48);
    this.roof = new Roof(240, 48);

    // clouds
    this.cloud = new Cloud(16, 16, null, null, true, 17);
    this.cloud2 = new Cloud(16, 32, null, null, true, 33);
    // stairs
    this.stair = new Stair(16, 96);
    this.stair2 = new Stair(16, 80);
    this.stair3 = new Stair(16, 64);
    this.stair4 = new Stair(16, 48);
    this.stair5 = new Stair(16, 32);


    this.controlsActive = true;
    this.notRendering = true;
  }

  bindKeyHandlers() {
    const wario = this.character;
    let that = this;
    let fncRight = null;
    let fncLeft = null;

    document.addEventListener('keypress', function (e) {
      if (e.key === ' ') {
        if (!that.keysDown[e.key]) {
          if (that.enableGravity(wario)) {
            that.keysDown[e.jump] = true;
            if (!wario.dead && that.controlsActive) {
              wario.jump(2);
            }
            setTimeout(function () { that.keysDown[e.key] = false; }, 515);
          }
        }
      } else if (e.code === 'KeyW') {
        if (!that.keysDown[e.code]) {
          if (that.enableGravity(wario)) {
            that.keysDown[e.jump] = true;
            if (!wario.dead && that.controlsActive) {
              wario.jump(2);
            }
            setTimeout(function () { that.keysDown[e.code] = false; }, 515);
          }
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      // console.log(e.key);
      if (e.key === 'ArrowRight') {
        that.keysDown[e.key] = true;
        if (!wario.movingRight) {
          // console.log('byeeeeee')
          wario.movingRight = true;
          let moveRight = wario.move('right');
          fncRight = moveRight;
        }
      } else if (e.code === 'KeyD') {
        that.keysDown[e.code] = true;
        if (!wario.movingRight) {
          // console.log('byeeeeee')
          wario.movingRight = true;
          let moveRight = wario.move('right');
          fncRight = moveRight;
        }
      } else if (e.key === 'ArrowLeft') {
        that.keysDown[e.key] = true;
        if (!wario.movingLeft) {
          // console.log('helloooo')
          let moveLeft = wario.move('left');
          wario.movingLeft = true;
          fncLeft = moveLeft;
        }
      } else if (e.code === 'KeyA') {
        that.keysDown[e.code] = true;
        if (!wario.movingLeft) {
          // console.log('helloooo')
          let moveLeft = wario.move('left');
          wario.movingLeft = true;
          fncLeft = moveLeft;
        }
      }
    });

    document.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'KeyD') {
        that.keysDown[e.key] = false;
        wario.movingRight = false;
        setTimeout(function () {
          wario.resetSprite();
        }, 80);
        clearInterval(fncRight);
      } else if (e.code === 'KeyD') {
        that.keysDown[e.code] = false;
        wario.movingRight = false;
        setTimeout(function () {
          wario.resetSprite();
        }, 80);
        clearInterval(fncRight);
      } else if (e.key === 'ArrowLeft') {
        that.keysDown[e.key] = false;
        wario.movingLeft = false;
        setTimeout(function () {
          wario.resetSprite();
        }, 80);
        clearInterval(fncLeft);
      } else if (e.code === 'KeyA') {
        that.keysDown[e.code] = false;
        wario.movingLeft = false;
        setTimeout(function () {
          wario.resetSprite();
        }, 80);
        clearInterval(fncLeft);
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

  start(fnc1, fnc2) {
    let that = this;
    const wario = this.character;
    const goomba = this.goomba1;
    if (this.controlsActive) {
      Object.keys(this.keysDown).forEach((key) => {
        if (this.keysDown[key]) {
          switch (key) {
            case 'ArrowLeft':
              if (this.leftGravity(wario)) {
                if (wario.x - 10 < 0) {
                  return;
                } else {
                  wario.moveX(-1);
                  // wario.currentTile(that);
                };
              }
              break;
            case 'KeyA':
              if (this.leftGravity(wario)) {
                if (wario.x - 10 < 0) {
                  return;
                } else {
                  wario.moveX(-1);
                  // wario.currentTile(that);
                };
              }
              break;
            case 'ArrowRight':
              if (this.rightGravity(wario)) {
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
            case 'KeyD':
              if (this.rightGravity(wario)) {
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
      this.enableGravity(wario);
      this.enableGoombaGravity();
    }

    // console.log(wario.points)
    this.animate();
    this.map.topBar(this.context, wario, this);
    // this.map.scoreCounter(this.context, wario);
    // this.toggleGoomba(wario, this.floor, goomba);
    let animationFrame = requestAnimationFrame(this.start.bind(this, fnc1, fnc2));
    if (this.checkDeath(wario)) {
      wario.death(that);
      setTimeout(function () {
        fnc1();
      }, 1500);
    }
    if (!this.controlsActive) {
      setTimeout(function () {
        fnc2(wario, that.map);
      }, 9000);
    }
    if (this.checkDeath(wario)) {
      cancelAnimationFrame(animationFrame);
    };
  }

  checkDeath(wario) {
    // let tiles = wario.currentTiles(this);
    if (wario.y > 98) {
      setTimeout(function () {
        wario.dead = true;
      }, 30);
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
    this.character.draw();
    const allPieces = this.map.allRenderPieces();
    allPieces.forEach((tile) => {
      this.map.draw(tile);
    });
    this.map.goombaPieces.forEach(goomba => {
      goomba.draw(allPieces[0]);
    });
    // console.log(this.noGoZones())
    // this.goomba1.draw(allPieces[0]);
  }

  noGoZones() {
    let allPieces = this.map.allRenderPieces();
    let noGoCoords = [];
    allPieces.forEach(piece => {
      if (!piece.passable) {
        noGoCoords.push(piece);
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
        let fx = frontxCoord[1];
        let frontyCoord = this.closestCoordinate(wario.y);
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
        let bool = false;
        wario.nogoZones.forEach(zone => {
          if (wario.x + tiles[0].viewportDiff - 5 > zone.x && wario.x + tiles[0].viewportDiff < zone.x + 16) {
            bool = false;
          }
        });
        if (wario.nogoZones.includes([bx, by])) {
          bool = false;
        } else if (wario.x - 10 < 0) {
          bool = false;
        } else {
          bool = true;
        }
        return bool;
        break;
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

  rightGravity(wario) {
    let tiles = wario.currentTiles(this);
    let frontxCoord = this.closestCoordinate(wario.x + tiles[0].viewportDiff);
    let fx = frontxCoord[1];
    this.checkGoomba(this, fx);
    let bottomTiles = [tiles[0], tiles[1]];
    let nogoZones = this.noGoZones();
    let tile = this.getClosestTileRight();
    let moveable = true;
    if (tile && nogoZones.includes(tile)) {
      moveable = false;
    }
    let bottomRight = tiles[1];
    // console.log('tile', tile)
    // console.log(wario.x + bottomRight.viewportDiff);
    // console.log(wario.y);
    // console.log(bottomRight);
    // console.log(this.map.flagPoleTipPieces);
    if (!bottomRight.passable && wario.y + 15 > bottomRight.y) {

      moveable = false;
    }
    if (!bottomRight.passable && wario.x + wario.width + bottomRight.viewportDiff > bottomRight.x) {
      if (wario.y + 1 > bottomRight.y) {
        wario.x -= 2;
        moveable = false;
      }
    }

    return moveable;
    // if (bottomTiles[0] instanceof Stair && bottomTiles[1] instanceof Stair && bottomTiles[0].y != bottomTiles[1].y) {
    //   let bool = true;
    //   if (tiles[2] instanceof Stair) {
    //     bool = true;
    //   };
    //   return bool;
    // } else {
    //   return true;
    // }
  }

  rightGravity2(wario) {
    let bubble = wario.bubble(this);
    let moveable = true;

    bubble.rightBubble.forEach(piece => {
      if (!piece.passable && wario.x + piece.viewportDiff + 10 > piece.x) {
        moveable = false;
      }
    });

    let tiles = wario.currentTiles(this);
    let bottomRight = tiles[1];
    console.log(bottomRight);
    if (wario.x < bottomRight.x) {
      moveable = false;
    }

    return moveable;
  }

  leftGravity(wario) {
    let tiles = wario.currentTiles(this);
    let bottomTiles = [tiles[0], tiles[1]];
    let nogoZones = this.noGoZones();
    let tile = this.getClosestTileLeft();
    let moveable = true;
    if (tile && nogoZones.includes(tile)) {
      moveable = false;
    }
    let bottomLeft = tiles[0];
    // console.log('tile', tile)
    // console.log(wario.x + bottomLeft.viewportDiff);
    // console.log(wario.y);
    // console.log(bottomLeft);
    if (!bottomLeft.passable && wario.y + 15 > bottomLeft.y) {
      moveable = false;
    }
    if (!bottomLeft.passable && wario.x + bottomLeft.viewportDiff > bottomLeft.x) {
      if (wario.y > bottomLeft.y) {
        moveable = false;
      }
    }

    return moveable;
    // if (bottomTiles[0] instanceof Stair && bottomTiles[1] instanceof Stair && bottomTiles[0].y != bottomTiles[1].y) {
    //   return true;
    // } else if (tiles[2] instanceof Stair) {
    //   return true;
    // } else {
    //   return true;
    // }
  }

  enableGravity(wario) {
    let tiles = wario.currentTiles(this);
    let bottomTiles = [tiles[0], tiles[1]];
    let goombas = this.map.goombaPieces;
    let that = this;
    let floorCount = 0;
    let pipeCount = 0;
    let stairCount = 0;

    bottomTiles.forEach(tile => {
      if (tile instanceof FlagPole) {
        that.outtro(wario);
      } else if (tile instanceof Floor) {
        return;
      } else if (tile instanceof Pipe) {
        pipeCount += 1;
      } else if (tile instanceof Stair) {
        stairCount += 1;
      } else {
        floorCount += 1;
      }
    });

    tiles.forEach(tile => {
      if (tile instanceof ItemBlock) {
        if (!tile.used) {
          wario.points += 100;
          tile.useBlock();
        }
      }
    });

    // let tile = this.getClosestTileLeft();
    // console.log(tile);
    this.checkDeathGoomba(bottomTiles);
    if (goombas.includes(bottomTiles[0]) || goombas.includes(bottomTiles[1])) {
      // bottomTiles[0].triggerDeath(bottomTiles[0], that);
      return true;
    } else if ((wario.y > bottomTiles[0].y && wario.y < bottomTiles[0].y + 17) && !bottomTiles[0].passable) {
      return false;
    } else if (floorCount < 2 || pipeCount > 0 || stairCount > 0) {
      return true;
    } else if (floorCount < 2 && pipeCount > 0) {
      wario.x -= 3;
      wario.y += 1;
      return true;
    } else {
      wario.y += 1;
      return false;
    };
  }

  enableGoombaGravity() {
    let goombas = this.map.goombaPieces;
    let holes = this.map.floorHoles;
    goombas.forEach(goomba => {
      if (holes.includes(goomba.x)) {
        goomba.fall();
      }
    });
  }

  getClosestTileLeft() {
    let wario = this.character;
    let tiles = this.map.allRenderPieces();
    let closestXcoord = this.closestCoordinate(wario.x + tiles[0].viewportDiff);
    let closestYcoord = this.closestCoordinate(wario.y);
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
    return leftTile;
  }

  getClosestTileRight() {
    let wario = this.character;
    let tiles = this.map.allRenderPieces();
    let closestXcoord = this.closestCoordinate(wario.x + tiles[0].viewportDiff);
    let closestYcoord = this.closestCoordinate(wario.y);
    let rightTile = null;
    tiles.forEach(tile => {
      // console.log('cord', closestXcoord[0])
      // console.log('tile', tile.x)
      if (tile.x === closestXcoord[1]) {
        if (tile.y === closestYcoord[0]) {
          rightTile = tile;
          // wario.x -= 1;
        }
      }
    });
    return rightTile;
  }

  checkDeathByGoomba(tile) {
    let wario = this.character;
    let goombas = this.map.goombaPieces;

    goombas.forEach(goomba => {
      // console.log('hellohello')
      if (goomba.x > (wario.x + tile.viewportDiff - 28)) {
        // console.log('hellohello')
        if (goomba.x < (wario.x + tile.viewportDiff + 19)) {
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
            wario.points += 100;
            setTimeout(function () {
              wario.bouncing = false;
            }, 200);
            setTimeout(function () {
              goomba.triggerDeath(goomba, that);
            }, 200);
            wario.bouncing = true;
            setTimeout(function () {
              wario.jump(2, 10);
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

  outtro(wario) {
    // console.log('hi im done');
    this.controlsActive = false;
    wario.x = 100;
    let that = this;
    let y = wario.y;
    setTimeout(function () {
      wario.initiateEndgame();
    }, 800);
  }
}

module.exports = Game;