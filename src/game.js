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
    this.character = new Wario(25, 100);
    this.floor = new Floor(0, 112);
    this.roof = new Roof(0, 48);
  }

  bindKeyHandlers() {
    const wario = this.character;
    let that = this;
    // key("left", function () {
    //   // console.log('his', that.keysDown);
    //   that.keysDown['a'] = true;
    //   // console.log('his', that.keysDown);

    //   wario.moveX(-3);
    //   that.animate();
    // });
    // key("right", function () {
    //   wario.moveX(3);
    //   that.animate();
    // });
    // key("up", function () {
    //   wario.moveY(3, that);
    // });

    document.addEventListener('keypress', function (e) {
      console.log(e.key)
      if (e.key === ' ') {
        console.log('hihihihi')
        if (!that.keysDown[e.key]) {
          console.log('hihihihihihihihi')
          that.keysDown[e.key] = true;
          wario.moveY(3, that);
          setTimeout(function () { that.keysDown[e.key] = false }, 580)
        }
      }
    })

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        that.keysDown[e.key] = true;
      }
    })

    document.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        that.keysDown[e.key] = false;
      }
    })
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
          case 'ArrowUp':
            wario.moveY(1, that);
        }
      }
    })
  
    this.animate();
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
}

module.exports = Game;