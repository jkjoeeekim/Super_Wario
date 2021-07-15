class Wario {
  constructor(x, y, restricted) {
    this.height = 34 / 2;
    this.width = 48 / 2;
    this.x = x;
    this.y = y;
    this.points = 0;
    this.context = null;
    this.bouncing = false;
    this.dead = false;
    this.nogoZones = restricted;
    this.image = null;
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
    this.context.drawImage(this.image, 13, 670, 35, 49, this.x - 8, this.y + 4, this.width, this.height);
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
    } else {
      this.y -= direction;
      return setTimeout(function () {
        wario.jump(direction, steps + 1);
      }, 5);
    }
  }

  slide(steps = 0) {
    let wario = this;
    let maxSteps = 33;

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
    wario.points += 100;
    if (wario.y === 96) {
      wario.walkToPipe();
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
    if (wario.x === 170) {
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