class Wario {
  constructor(x, y, restricted) {
    this.height = 18;
    this.width = 18;
    this.x = x;
    this.y = y;
    this.points = 0;
    this.spritePos = [13, 670];
    // this.spritePos = [65, 1300];
    this.context = null;
    this.bouncing = false;
    this.movingRight = false;
    this.movingLeft = false;
    this.dead = false;
    this.nogoZones = restricted;
    this.image = null;
    this.controlsActive = true;

    this.muted = false;
    // audio clips
    this.audioCoin = null;
    this.audioStomp = null;
    this.audioJump = null;
    this.audioStageClear = null;
    this.audioDeath = null;
    this.audioFlagPole = null;
    this.audioBG = null;
  }

  resetSprite() {
    this.spritePos[0] = 13;
    this.spritePos[1] = 670;
  }

  toggleMute() {
    if (this.muted) {
      this.audioBG.play();
      this.muted = false;
    } else {
      this.audioBG.stop();
      this.audioStageClear.stop();
      this.audioFlagPole.stop();
      this.audioDeath.stop();
      this.audioJump.stop();
      this.audioCoin.stop();
      this.audioStomp.stop();
      this.muted = true;
    }
  }

  death(that) {
    let wario = this;
    this.spritePos[0] = 65;
    this.spritePos[1] = 1300;
    // this.draw();
    that.animate();
    if (!wario.muted) {
      this.audioDeath.play();
    }
  }

  move(dir) {
    let that = this;
    if (!that.controlsActive) return;
    let ani = null;
    if (dir === 'left') {
      this.leftSprites();
      let leftAnimation = setInterval(function () {
        that.leftSprites();
      }, 180);
      ani = leftAnimation;
    } else if (dir === 'right') {
      this.rightSprites();
      let rightAnimation = setInterval(function () {
        that.rightSprites();
      }, 180);
      ani = rightAnimation;
    }
    return ani;
  }

  moveRight() {
    let that = this;
    this.rightSprites();
    let rightAnimation = setInterval(function () {
      that.rightSprites();
    }, 180);
    // console.log('hi"')
    return rightAnimation;
  }

  moveLeft() {
    let that = this;
    this.leftSprites();
    let leftAnimation = setInterval(function () {
      that.leftSprites();
    }, 180);
    return leftAnimation;
  }

  rightSprites() {
    // console.log('hi');
    if (this.spritePos[0] === 107 && this.spritePos[1] === 882) {
      this.spritePos[0] = 7;
      this.spritePos[1] = 880;
    } else if (this.spritePos[0] === 7 && this.spritePos[1] === 880) {
      this.spritePos[0] = 36;
      this.spritePos[1] = 882;
    } else if (this.spritePos[0] === 107 && this.spritePos[1] === 882) {
      this.spritePos[0] = 7;
      this.spritePos[1] = 880;
    } else {
      this.spritePos[0] = 107;
      this.spritePos[1] = 882;
    }
  }

  leftSprites() {
    // console.log('hihihi');
    if (this.spritePos[0] === 314 && this.spritePos[1] === 50) {
      this.spritePos[0] = 218;
      this.spritePos[1] = 50;
    } else if (this.spritePos[0] === 218 && this.spritePos[1] === 50) {
      this.spritePos[0] = 250;
      this.spritePos[1] = 50;
    } else if (this.spritePos[0] === 250 && this.spritePos[1] === 50) {
      this.spritePos[0] = 314;
      this.spritePos[1] = 50;
    } else {
      this.spritePos[0] = 314;
      this.spritePos[1] = 50;
    }
  }

  moveLeft() {

  }

  bubble(game) {
    let currentTiles = this.currentTiles(game);
    let allPieces = game.map.allPieces();
    let floorTiles = {
      leftBubble: [currentTiles[0], currentTiles[2]],
      rightBubble: [currentTiles[1], currentTiles[3]]
    };
    let bubble = {
      leftBubble: [],
      rightBubble: []
    };
    floorTiles['leftBubble'].forEach(tile => {
      allPieces.forEach(piece => {
        if (!piece || !tile) {
          return;
        } else if (piece.x - 32 === tile.x && piece.y === tile.y) {
          bubble['rightBubble'].push(piece);
        } else if (piece.x + 16 === tile.x && piece.y === tile.y) {
          bubble['leftBubble'].push(piece);
        }
      });
    });
    return bubble;
  }

  currentTiles(game, bool) {
    let allTiles = game.map.allPieces();
    let currentTiles = [];
    let closestYOrd = game.closestCoordinate(this.y);
    let closestXOrd = game.closestCoordinate(this.x + allTiles[0].viewportDiff);
    allTiles.forEach(tile => {
      if ((tile.y === closestYOrd[0] || tile.y === closestYOrd[1]) && (tile.x === closestXOrd[0] || tile.x === closestXOrd[1])) currentTiles.push(tile);
    });
    // console.log(currentTiles);
    return currentTiles;
  }

  draw() {
    this.context.drawImage(
      this.image,
      this.spritePos[0], this.spritePos[1],
      (this.width * 2), (this.height * 2),
      this.x - 5, this.y - 3,
      (24), (18)
    );
  }

  moveX(direction, bool) {
    if (!this.controlsActive) return;
    if (bool) {
      this.x += direction;
    } else if (bool === false) {
      this.relativex += direction;
    } else {
      this.x += direction;
      this.relativex += direction;
    }
  }

  jump(steps = 0, bool) {
    let wario = this;
    let maxSteps = 53;
    if (!bool && !this.muted) {
      wario.audioJump.play();
    }

    if (steps >= maxSteps) {
      return;
    } else if (steps < 19) {
      this.y -= 2;
      return setTimeout(function () {
        wario.jump(steps + 1, true);
      }, 1000 / 540);
    } else if (steps >= 19 && steps < 35) {
      this.y -= 1;
      return setTimeout(function () {
        wario.jump(steps + 1, true);
      }, 1000 / 240);
    } else if (steps >= 32 && steps <= 42) {
      this.y -= 2;
      return setTimeout(function () {
        wario.jump(steps + 1, true);
      }, 1000 / 60);
    } else if (steps > 42 && steps <= 52) {
      this.y -= 1;
      return setTimeout(function () {
        wario.jump(steps + 1, true);
      }, 1000 / 60);
    }
  }

  slide(steps = 0) {
    let wario = this;
    let maxSteps = 31;

    if (steps === maxSteps) {
      wario.slideDownPipe();
    } else {
      if (steps > 27) {
        wario.y += 1;
      }
      this.x += 1;
      return setTimeout(function () {
        wario.slide(steps + 1);
      }, 1000 / 60);
    }
  }

  slideDownPole() {
    let wario = this;
    if (!wario.muted) {
      wario.audioFlagPole.play();
    }
    wario.points += 100;
    if (wario.y === 97) {
      setTimeout(function () {
        wario.walkToPipe();
      }, 500);
    } else {
      wario.y += 1;
      return setTimeout(function () {
        wario.slideDownPole();
      }, 50);
    }
  }

  slideDownPipe() {
    let wario = this;
    wario.x = 100;
    if (wario.y - 2 === 96) {
      return;
    } else {
      wario.y += 1;
      return setTimeout(function () {
        wario.slideDownPipe();
      }, 50);
    }
  }

  walkToPipe() {
    let wario = this;
    if (!wario.muted) {
      wario.audioFlagPole.stop();
    }
    if (wario.x === 168) {
      if (!wario.muted) {
        wario.audioStageClear.play();
      }
      wario.jumpToPipe();
    } else {
      wario.x += 1;
      return setTimeout(function () {
        wario.walkToPipe();
      }, 25);
    }
  }

  jumpToPipe(steps = 0) {
    let wario = this;
    let maxSteps = 40;

    if (steps >= maxSteps) {
      return;
    } else if (steps < 7) {
      this.y -= 2;
      return setTimeout(function () {
        wario.jumpToPipe(steps + 1);
      }, 1000 / 30);
    } else if (steps >= 7 && steps < 18) {
      this.y -= 2;
      this.x += 1;
      return setTimeout(function () {
        wario.jumpToPipe(steps + 1);
      }, 1000 / 30);
    } else if (steps >= 18 && steps < 28) {
      this.x += 2;
      return setTimeout(function () {
        wario.jumpToPipe(steps + 1);
      }, 1000 / 30);
    } else if (steps === 30) {
      this.y += 2;
      return setTimeout(function () {
        wario.jumpToPipe(steps + 1);
      }, 450);
    } else {
      this.y += 2;
      return setTimeout(function () {
        wario.jumpToPipe(steps + 1);
      }, 45);
    }
  }

  initiateEndgame() {
    // setInterval(function() {
    //   let pipePieces = game.map.pipePieces;
    //   pipePieces.forEach(piece => {
    //     game.map.draw(piece);
    //   });
    // }, 1)
    this.controlsActive = false;
    this.slideDownPole();
  }
}

module.exports = Wario;