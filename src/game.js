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
    key("left", function () {
      that.keysDown['a'] = true;
      console.log('his', that.keysDown);

      wario.moveX(-3);
      that.animate();
    });
    key("right", function () {
      wario.moveX(3);
      that.animate();
    });
    key("up", function () {
      wario.moveY(3, that);
    });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    console.log('hello');
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    console.log(this);
    this.context.clearRect(0, 0, 800, 600);
    const allPieces = this.map.allPieces();
    allPieces.forEach((tile) => {
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