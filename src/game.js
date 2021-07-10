const Wario = require('./wario');
const Map = require('./map');
const Floor = require('./floor');
const Roof = require('./roof');

class Game {
  constructor(context) {
    this.keysDown = {
      'w': false,
      'a': false,
      's': false,
      'd': false
    };
    this.context = context;
    this.map = new Map();
    this.character = new Wario(25, 100);
    this.floor = new Floor(0, 112);
    this.roof = new Roof(0, 48);
  }

  bindKeyHandlers() {
    const wario = this.character;
    let that = this;
    key("a", function () {
      that.keysDown['a'] = true;
      console.log('hi', that.keysDown)

      wario.moveX(-3);
      that.animate();
    });
    key("d", function () {
      wario.moveX(3);
      that.animate();
    });
    key("w", function () {
      wario.moveY(3, that);
    })
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    console.log('hello');
    requestAnimationFrame(this.animate());
  }

  animate() {
    this.context.clearRect(0, 0, 800, 600);
    this.map.floorPieces.forEach((tile) => {
      this.map.draw(tile);
    });
    // this.context.clearRect(0, 0, 800, 600);
    // this.map.generateTiles(this.floor)
    this.character.draw();
    console.log('hi');
    // requestAnimationFrame(this.animate(context, image));
  }
}

module.exports = Game;