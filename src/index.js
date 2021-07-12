const Game = require('./game');

// game elements

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

window.onload = function () {
  const context = document.getElementById("game-window").getContext('2d');
  // window.requestAnimationFrame(game.map.fpsCounter(context));
};

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-window");
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;

  const game = new Game(context);
  const wario = game.character;
  const map = game.map;
  const floor = game.floor;
  const roof = game.roof;

  loadImage('../img/tiles.png')
    .then(image => {
      map.generateTiles(floor, context, image, map.floorHoles);
      map.generateTiles(roof, context, image, map.roofHoles);
      console.log(map.floorPieces);
      console.log(map.roofPieces);
    });

  loadImage('../img/wario4.png')
    .then(image => {
      wario.context = context;
      wario.image = image;
      wario.draw();
      game.start(context, image);
    });

  // key("w", function() { wario.moveX(1) })
});