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

  death(that) {
    this.spritePos[0] = 65;
    this.spritePos[1] = 1300;
    // this.draw();
    that.animate();
    this.audioDeath.play();
  }

  move(dir) {
    let that = this;
    let ani = null;
    if (dir === 'left') {
      this.leftSprites();
      let leftAnimation = setInterval(function () {
        that.leftSprites();
      }, 250);
      ani = leftAnimation;
    } else if (dir === 'right') {
      this.rightSprites();
      let rightAnimation = setInterval(function () {
        that.rightSprites();
      }, 275);
      ani = rightAnimation;
    }
    return ani;
  }

  moveRight() {
    let that = this;
    console.log('yuh');
    this.rightSprites();
    let rightAnimation = setInterval(function () {
      that.rightSprites();
    }, 200);
    // console.log('hi"')
    return rightAnimation;
  }

  moveLeft() {
    let that = this;
    console.log('wtff');
    this.leftSprites();
    let leftAnimation = setInterval(function () {
      that.leftSprites();
    }, 200);
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
    if (this.spritePos[0] === 13 && this.spritePos[1] === 670) {
      this.spritePos[0] = 218;
      this.spritePos[1] = 50;
    } else if (this.spritePos[0] === 218 && this.spritePos[1] === 50) {
      this.spritePos[0] = 250;
      this.spritePos[1] = 50;
    } else if (this.spritePos[0] === 250 && this.spritePos[1] === 50) {
      this.spritePos[0] = 314;
      this.spritePos[1] = 50;
    } else {
      this.spritePos[0] = 107;
      this.spritePos[1] = 882;
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
      this.x - 5, this.y - 2,
      (24), (18)
    );
  }

  moveX(direction, bool) {
    if (bool) {
      this.x += direction;
    } else if (bool === false) {
      this.relativex += direction;
    } else {
      this.x += direction;
      this.relativex += direction;
    }
  }

  jump(direction, steps = 0) {
    let wario = this;
    let maxSteps = 36;
    // if (this.bouncing) {
    //   steps = 36;
    //   this.y -= 10;
    // }
    // that.animate();

    if (steps === maxSteps) {
      // that.animate();
      return;
    } else if (steps === 6) {
      wario.audioJump.play();
      this.y -= direction;
      return setTimeout(function () {
        wario.jump(direction, steps + 1);
      }, 5);
    } else {
      this.y -= direction;
      return setTimeout(function () {
        wario.jump(direction, steps + 1);
      }, 5);
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
      }, 10);
    }
  }

  slideDownPole() {
    let wario = this;
    wario.audioFlagPole.play();
    wario.points += 100;
    if (wario.y === 96) {
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
    if (wario.y === 96) {
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
    wario.audioFlagPole.stop();
    if (wario.x === 170) {
      wario.audioStageClear.play();
      wario.jump(1);
      wario.slide();
    } else {
      wario.x += 1;
      return setTimeout(function () {
        wario.walkToPipe();
      }, 25);
    }
  }

  initiateEndgame() {
    // setInterval(function() {
    //   let pipePieces = game.map.pipePieces;
    //   pipePieces.forEach(piece => {
    //     game.map.draw(piece);
    //   });
    // }, 1)
    this.slideDownPole();
  }
}

module.exports = Wario;