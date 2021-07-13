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
  const tile = game.emptyTile;
  const floor = game.floor;
  const roof = game.roof;
  const itemBlock = game.itemBlock;
  const pipe = game.pipe;
  
  loadImage('../img/tiles.png')
  .then(image => {
    tile.generateEmptyTiles(map, tile, context);
    map.generateTiles(floor, context, image, map.floorHoles);
    map.generateTiles(roof, context, image, map.roofHoles);
    map.generateTiles(itemBlock, context, image, map.itemBlockHoles);
    map.generateTiles(pipe, context, image, map.pipeHoles);
    let noGoZones = game.noGoZones();
    wario.nogoZones = noGoZones;
    // pipe.context = context;
    // pipe.image = image;
    // map.draw(pipe);
    // console.log(map.emptyPieces)
  });
  
  loadImage('../img/wario4.png')
  .then(image => {
    wario.context = context;
    wario.image = image;
    wario.draw();
    // game.enableGravity(wario);
    // map.fpsCounter(context);
    game.start();

    // console.log(game.tileAtXCoordinate(33))
  });
  
  game.bindKeyHandlers();
  // key("w", function() { wario.moveX(1) })

  // requestAnimationFrame(game.start.bind(game));
});
