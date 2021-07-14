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

function createGGMsg() {
  let newCanvas = document.createElement('div');
  let gameOverMsg = document.createElement('form');
  let text = document.createElement('p');
  let button = document.createElement('button');
  text.innerHTML = 'GAME OVER';
  button.innerText = 'Play Again?';
  gameOverMsg.appendChild(text);
  gameOverMsg.appendChild(button);
  gameOverMsg.classList.add("gg-msg");
  gameOverMsg.setAttribute("id", "gg");
  newCanvas.classList.add("dim-canvas");
  newCanvas.setAttribute("id", "dim");
  text.classList.add("gg-text");
  button.classList.add("gg-button");
  document.body.appendChild(newCanvas);
  document.body.appendChild(gameOverMsg);
}

function displayGGMsg() {
  let ggMsg = document.getElementById("gg");
  let displayCanvas = document.getElementById("dim");
  ggMsg.classList.add("enable");
  displayCanvas.classList.add("enable");
}

window.onload = function () {
  const context = document.getElementById("game-window").getContext('2d');
  createGGMsg();
  // window.requestAnimationFrame(game.map.fpsCounter(context));
};


document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-window");
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;

  const game = new Game(context);
  const wario = game.character; 
  const goomba1 = game.goomba1;
  const map = game.map;
  const goombas = map.goombaPieces;
  const tile = game.emptyTile;
  const floor = game.floor;
  const roof = game.roof;
  const itemBlock = game.itemBlock;
  const pipe = game.pipe;
  const displayGG = displayGGMsg;
  const allRenderTiles = map.allRenderPieces();

  loadImage('../img/tiles.png')
    .then(image => {
      map.generateTiles(floor, context, image, map.floorHoles);
      map.generateTiles(roof, context, image, map.roofHoles);
      map.generateTiles(itemBlock, context, image, map.itemBlockHoles);
      map.generateTiles(pipe, context, image, map.pipeHoles);
      tile.generateEmptyTiles(map, tile, allRenderTiles);
      let noGoZones = game.noGoZones();
      wario.nogoZones = noGoZones;
      // pipe.context = context;
      // pipe.image = image;
      // map.draw(pipe);
      // console.log(map.emptyPieces)
    });

  loadImage('../img/goomba.png')
    .then(image => {
      goombas.forEach(goomba => {
        goomba.context = context;
        goomba.image = image;
        goomba.draw(tile);
      })
      // goomba1.context = context;
      // goomba1.image = image;
      // goomba1.draw(tile);
    });

  loadImage('../img/wario4.png')
    .then(image => {
      wario.context = context;
      wario.image = image;
      wario.draw();
      // game.enableGravity(wario);
      // map.fpsCounter(context);
      game.start(displayGG);

      // console.log(game.tileAtXCoordinate(33))
    });

  game.bindKeyHandlers();
  // key("w", function() { wario.moveX(1) })

  // requestAnimationFrame(game.start.bind(game));
});
