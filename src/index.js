const Game = require('./game');
const SoundClip = require('./soundClip');

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
  button.innerText = 'PLAY AGAIN?';
  gameOverMsg.appendChild(text);
  gameOverMsg.appendChild(button);
  gameOverMsg.classList.add("gg-msg");
  gameOverMsg.setAttribute("id", "gg");
  newCanvas.classList.add("gg-canvas");
  newCanvas.setAttribute("id", "gg-can");
  text.classList.add("gg-text");
  button.classList.add("gg-button");
  document.body.appendChild(newCanvas);
  document.body.appendChild(gameOverMsg);
}

function displayGGMsg() {
  createGGMsg();
  let ggMsg = document.getElementById("gg");
  let displayCanvas = document.getElementById("gg-can");
  ggMsg.classList.add("enable");
  displayCanvas.classList.add("enable");
}

function createVictoryMsg(wario, map) {
  let newCanvas = document.createElement('div');
  let victoryMsg = document.createElement('form');
  let text = document.createElement('p');
  let retryButton = document.createElement('a');

  let emailLabel = document.createElement('label');
  let emailInput = document.createElement('input');
  let linkInput = document.createElement('input');
  let descInput = document.createElement('input');
  let sendButton = document.createElement('input');
  sendButton.setAttribute("type", "submit");
  sendButton.classList.add("send-button");
  sendButton.setAttribute("value", "SHARE");
  emailLabel.innerHTML = 'Share via Email: ';
  emailLabel.appendChild(emailInput);
  emailLabel.classList.add("email-label");
  emailInput.classList.add("email-input");
  emailInput.setAttribute("placeholder", "  example@email.com");
  emailInput.setAttribute("type", "text");
  linkInput.setAttribute("value", "https://jkjoeeekim.github.io/Super_Wario/dist/index");
  linkInput.setAttribute("name", "link");
  linkInput.setAttribute("type", "hidden");
  descInput.setAttribute("name", "desc");
  descInput.setAttribute("type", "hidden");
  // victoryMsg.setAttribute("method", "post");
  victoryMsg.appendChild(emailLabel);
  victoryMsg.appendChild(linkInput);
  victoryMsg.appendChild(descInput);
  victoryMsg.appendChild(sendButton);

  sendButton.addEventListener("click", function () {
    victoryMsg.setAttribute("method", "post");
    victoryMsg.setAttribute("enctype", "text/plain");
    descInput.setAttribute("value", `Check out this cool game! Try to beat my Score, I got ${wario.points} points in ${map.ingameSecond} seconds`);
    victoryMsg.setAttribute("action", `mailto:${emailInput.value}`);
  });

  text.innerHTML = `SCORE: ${wario.points} \n TIME: ${map.ingameSecond}s`;
  retryButton.innerText = 'RESTART';
  victoryMsg.appendChild(text);
  victoryMsg.appendChild(retryButton);
  victoryMsg.classList.add("victory-msg");
  victoryMsg.setAttribute("id", "victory");
  newCanvas.classList.add("victory-canvas");
  newCanvas.setAttribute("id", "victory-can");
  text.classList.add("victory-text");
  retryButton.classList.add("victory-button");
  retryButton.setAttribute("href", "javascript:window.location.reload(true)");
  document.body.appendChild(newCanvas);
  document.body.appendChild(victoryMsg);
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.volume = 0.1;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  // this.sound.setAttribute("autoplay", "");
  this.sound.setAttribute("muted", "true");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.play = function () {
    this.sound.play();
  };

  this.stop = function () {
    this.sound.pause();
  };
}

function displayVictoryMsg(wario, map) {
  createVictoryMsg(wario, map);
  let victoryMsg = document.getElementById("victory");
  let displayCanvas = document.getElementById("victory-can");
  victoryMsg.classList.add("enable");
  displayCanvas.classList.add("enable");
}

window.onload = function () {
  const element = document.getElementById("game-window");
  // window.requestAnimationFrame(game.map.fpsCounter(context));
};


document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-window");
  const introScreen = document.getElementById("intro-screen");
  const introScreen2 = document.getElementById("intro-screen2");
  const introScreen3 = document.getElementById("intro-screen3");
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  let directions = 0;


  const game = new Game(context);
  const wario = game.character;
  const goomba1 = game.goomba1;
  const map = game.map;
  const goombas = map.goombaPieces;
  // displayVictoryMsg(wario, map);
  const tile = game.emptyTile;
  const floor = game.floor;
  const roof = game.roof;
  const itemBlock = game.itemBlock;
  const pipe = game.pipe;
  const cloud = game.cloud;
  const cloud2 = game.cloud2;
  const stair = game.stair;
  const flagPole = game.flagPole;
  const flagPoleTip = game.flagPoleTip;
  const stair2 = game.stair2;
  const stair3 = game.stair3;
  const stair4 = game.stair4;
  // const stair5 = game.stair5;
  const displayGG = displayGGMsg;
  const displayVIC = displayVictoryMsg;
  const allRenderTiles = map.allRenderPieces();
  let noGoZones = game.noGoZones();
  wario.nogoZones = noGoZones;

  let volumeOn = document.getElementById("volume-button");
  let muteOn = document.getElementById("mute-button");

  volumeOn.addEventListener("click", function () {
    volumeOn.classList.add("disable");
    muteOn.classList.add("enable");
    wario.toggleMute();
  });

  muteOn.addEventListener("click", function () {
    muteOn.classList.remove("enable");
    volumeOn.classList.remove("disable");
    wario.toggleMute();
  });

  loadImage('../img/tiles.png')
    .then(image => {
      map.generateTiles(floor, context, image, map.floorHoles);
      map.generateTiles(roof, context, image, map.roofHoles);
      map.generateTiles(itemBlock, context, image, map.itemBlockHoles);
      map.generateTiles(pipe, context, image, map.pipeHoles);
      map.generateTiles(cloud, context, image, map.cloudHoles);
      map.generateTiles(cloud2, context, image, map.cloud2Holes);
      map.generateTiles(stair, context, image, map.stairHoles);
      map.generateTiles(stair2, context, image, map.stair2Holes);
      map.generateTiles(stair3, context, image, map.stair3Holes);
      map.generateTiles(stair4, context, image, map.stair4Holes);
      map.generateTiles(flagPole, context, image, map.flagPoleHoles);
      map.generateTiles(flagPoleTip, context, image, map.flagPoleTipHoles);
      tile.generateEmptyTiles(map, tile, allRenderTiles);
    });

  loadImage('../img/goomba.png')
    .then(image => {
      goombas.forEach(goomba => {
        goomba.context = context;
        goomba.image = image;
        goomba.draw(tile);
      });
    });

  loadImage('../img/wario4.png')
    .then(image => {
      wario.context = context;
      wario.image = image;
      wario.draw();
      game.enableGravity(wario);
      game.animate();
    });

  document.body.addEventListener("click", function () {
    if (directions === 0) {
      directions += 1;
      introScreen.classList.add("disable");
      introScreen2.classList.add("enable");
    } else if (directions === 1) {
      directions += 1;
      introScreen2.classList.add("disable");
      introScreen3.classList.add("enable");
    } else if (directions === 2) {
      directions += 1;
      introScreen3.classList.add("disable");

      let soundClipCoin = new sound("../audio/smb_coin.wav");
      let soundClipStomp = new sound("../audio/smb_stomp.wav");
      let soundClipJump = new sound("../audio/smb_jump-small.wav");
      let soundClipStageClear = new sound("../audio/smb_stage_clear.wav");
      let soundClipDeath = new sound("../audio/smb_mariodie.wav");
      let soundClipFlagPole = new sound("../audio/smb_flagpole.wav");
      let soundClipBG = new sound("../audio/smb-overworld.wav");

      soundClipBG.play();
      wario.audioCoin = soundClipCoin;
      wario.audioStomp = soundClipStomp;
      wario.audioJump = soundClipJump;
      wario.audioStageClear = soundClipStageClear;
      wario.audioDeath = soundClipDeath;
      wario.audioFlagPole = soundClipFlagPole;
      wario.audioBG = soundClipBG;
      let animation = setInterval(function () {
        game.start(displayGG, displayVIC, animation);
      }, 1000 / 60);
    }
  });

  game.bindKeyHandlers();
});
