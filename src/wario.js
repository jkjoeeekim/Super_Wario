class Wario {
  constructor(x, y) {
    this.height = 34 / 2;
    this.width = 48 / 2;
    this.x = x;
    this.y = y;
    this.context = null;
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
        // console.log(piece);
        // console.log(tile);
        if (!piece || !tile) {
          return;
        } else if (piece.x - 32 === tile.x && piece.y === tile.y) {
          bubble['rightBubble'].push(piece);
        } else if (piece.x + 16 === tile.x && piece.y === tile.y) {
          bubble['leftBubble'].push(piece);
        }
      });
    });
    console.log('bubble', bubble);
    return bubble;
  }

  currentTiles(game, bool) {
    let allTiles = game.map.allPieces();
    let currentTiles = [];
    let closestYOrd = game.closestCoordinate(this.y);
    let closestXOrd = game.closestCoordinate(this.x + allTiles[0].viewportDiff);
    // console.log(this.x);
    // console.log(this.y);
    // console.log(closestYOrd);
    // console.log(closestXOrd);
    allTiles.forEach(tile => {
      if ((tile.y === closestYOrd[0] || tile.y === closestYOrd[1]) && (tile.x === closestXOrd[0] || tile.x === closestXOrd[1])) currentTiles.push(tile);
    });
    console.log('x coord', this.x);
    console.log(this);
    console.log('y coord', this.y);
    console.log(currentTiles);
    return currentTiles;
  }

  draw() {
    this.context.drawImage(this.image, 13, 670, 35, 49, this.x - 8, this.y + 4, this.width, this.height);
  }

  moveX(direction, bool) {
    console.log('old pos', this.x);
    if (bool) {
      this.x += direction;
    } else if (bool === false) {
      this.relativex += direction;
    } else {
      this.x += direction;
      this.relativex += direction;
    }
    console.log('new pos', this.x);
  }

  jump(direction, that, steps = 0) {
    console.log('steps: ', steps);
    console.log(this.y);
    let wario = this;
    let maxSteps = 36;
    that.animate();

    if (steps === maxSteps) {
      that.animate();
      return;
    } else {
      this.y -= direction;
      return setTimeout(function () {
        wario.jump(direction, that, steps + 1);
      }, 5);
    }

    console.log(this.y);
  }
}

module.exports = Wario;