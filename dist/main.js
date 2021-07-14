/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/floor.js":
/*!**********************!*\
  !*** ./src/floor.js ***!
  \**********************/
/***/ ((module) => {

eval("class Floor {\n  constructor(x, y, context, image, bool=true) {\n    this.context = context;\n    this.image = image;\n    this.height = 16;\n    this.width = 16;\n    this.spritePos = [0, 0];\n    this.viewportDiff = 0;\n    this.x = x;\n    this.y = y;\n    this.render = bool;\n    this.maxRender = 153;\n    this.passable = false;\n  }\n}\n\nmodule.exports = Floor;\n\n//# sourceURL=webpack:///./src/floor.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Wario = __webpack_require__(/*! ./wario */ \"./src/wario.js\");\nconst Map = __webpack_require__(/*! ./map */ \"./src/map.js\");\nconst Floor = __webpack_require__(/*! ./floor */ \"./src/floor.js\");\nconst Roof = __webpack_require__(/*! ./roof */ \"./src/roof.js\");\nconst Tile = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\nconst Pipe = __webpack_require__(/*! ./pipe */ \"./src/pipe.js\");\nconst ItemBlock = __webpack_require__(/*! ./itemBlock */ \"./src/itemBlock.js\");\nconst Goomba = __webpack_require__(/*! ./goomba */ \"./src/goomba.js\");\n\nclass Game {\n  constructor(context) {\n    this.keysDown = {\n      'ArrowLeft': false,\n      'ArrowRight': false,\n      'ArrowUp': false\n    };\n    this.context = context;\n    this.map = new Map();\n    this.emptyTile = new Tile(-16, 0);\n    this.character = new Wario(25, 0);\n    this.testGoomba = new Goomba(64, 99);\n    this.goomba1 = new Goomba(400, 99);\n    this.goomba2 = new Goomba(432, 99);\n    this.goomba3 = new Goomba(752, 99);\n    this.goomba4 = new Goomba(784, 99);\n    this.goomba5 = new Goomba(1008, 99);\n    this.goomba6 = new Goomba(1040, 99);\n    this.map.goombaPieces = [this.testGoomba, this.goomba1, this.goomba2, this.goomba3, this.goomba4, this.goomba5, this.goomba6];\n    // this.map.goombaPieces = this.goombas;\n    this.pipe = new Pipe(480, 80);\n    this.floor = new Floor(0, 112);\n    this.itemBlock = new ItemBlock(0, 48);\n    this.roof = new Roof(240, 48);\n    this.notRendering = true;\n  }\n\n  bindKeyHandlers() {\n    const wario = this.character;\n    let that = this;\n\n    document.addEventListener('keypress', function (e) {\n      if (e.key === ' ') {\n        if (!that.keysDown[e.key]) {\n          if (that.enableGravity(wario)) {\n            that.keysDown[e.key] = true;\n            wario.jump(2, that);\n            setTimeout(function () { that.keysDown[e.key] = false; }, 515);\n          }\n        }\n      }\n    });\n\n    document.addEventListener('keydown', function (e) {\n      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n        that.keysDown[e.key] = true;\n      }\n    });\n\n    document.addEventListener('keyup', function (e) {\n      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n        that.keysDown[e.key] = false;\n      }\n    });\n  }\n\n  // toggleGoomba(wario, tile, goomba) {\n  //   if (wario.x + tile.viewportDiff > goomba.x - 200) {\n  //     goomba.triggerMovement();\n  //   }\n  // }\n\n  // give all units a value of viewportDiff which keeps track of x-axis difference.\n  moveBack(tile, num, wario, goomba) {\n    tile.viewportDiff += num;\n    wario.viewportDiff += num;\n    goomba.viewportDiff += num;\n  }\n\n  start(fnc) {\n    let that = this;\n    const wario = this.character;\n    const goomba = this.goomba1;\n    Object.keys(this.keysDown).forEach((key) => {\n      if (this.keysDown[key]) {\n        switch (key) {\n          case 'ArrowLeft':\n            if (this.canMove(wario, 'backward')) {\n              wario.moveX(-1);\n              // wario.currentTile(that);\n            };\n            break;\n          case 'ArrowRight':\n            if (this.canMove(wario, 'forward')) {\n              if (wario.x + 5 > 100) {\n                if (this.notRendering) {\n                  this.notRendering = false;\n                  let allPieces = that.map.allPieces();\n                  allPieces.forEach(piece => {\n                    that.moveBack(piece, 1, wario, goomba);\n                  });\n                  setTimeout(function () {\n                    that.notRendering = true;\n                  }, 6);\n                };\n              } else {\n                wario.moveX(1, true);\n              }\n            };\n            break;\n        }\n      }\n    });\n\n    this.animate();\n    this.map.fpsCounter(this.context);\n    this.enableGravity(wario);\n    // this.toggleGoomba(wario, this.floor, goomba);\n    let animationFrame = requestAnimationFrame(this.start.bind(this, fnc));\n    if (this.checkDeath(wario)) {\n      setTimeout(function () {\n        fnc();\n      }, 1500);\n    }\n    if (this.checkDeath(wario)) {\n      cancelAnimationFrame(animationFrame);\n    };\n  }\n\n  checkDeath(wario) {\n    if (wario.y > 111) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  checkGoomba(game, fx) {\n    this.map.goombaPieces.forEach((goomba, index) => {\n      if (goomba.x - 208 === fx && !goomba.triggered) {\n        goomba.triggerMovement(goomba);\n        // this.map.goombaPieces.splice(index, 1);\n      }\n    });\n  }\n\n  animate() {\n    this.context.clearRect(0, 0, 800, 600);\n    const allPieces = this.map.allRenderPieces();\n    allPieces.forEach((tile) => {\n      this.map.draw(tile);\n    });\n    this.map.goombaPieces.forEach(goomba => {\n      goomba.draw(allPieces[0]);\n    });\n    // this.goomba1.draw(allPieces[0]);\n    this.character.draw();\n  }\n\n  noGoZones() {\n    let allPieces = this.map.allPieces();\n    let noGoCoords = [];\n    allPieces.forEach(piece => {\n      if (!piece.passable) {\n        noGoCoords.push([piece.x, piece.y]);\n      }\n    });\n    return noGoCoords;\n  }\n\n  canMove(wario, direction) {\n    let allFloorPieces = this.map.floorPieces;\n    let tiles = wario.currentTiles(this);\n    tiles.slice(2);\n    let bubble = wario.bubble(this);\n    let rightBubble = bubble['rightBubble'];\n    let leftBubble = bubble['leftBubble'];\n    switch (direction) {\n      case 'forward':\n        let frontxCoord = this.closestCoordinate(wario.x + tiles[0].viewportDiff);\n        let frontyCoord = this.closestCoordinate(wario.y);\n        let fx = frontxCoord[1];\n        let fy = frontyCoord[1];\n        // console.log(fx)\n        this.checkGoomba(this, fx);\n        if (wario.nogoZones.includes([fx, fy])) {\n          return false;\n        } else {\n          return true;\n        }\n      case 'backward':\n        let backxCoord = this.closestCoordinate(wario.x + tiles[0].viewportDiff);\n        let backyCoord = this.closestCoordinate(wario.y);\n        let bx = backxCoord[0];\n        let by = backyCoord[0];\n        if (wario.nogoZones.includes([bx, by])) {\n          return false;\n        } else if (wario.x - 10 < 0) {\n          return false;\n        } else {\n          return true;\n        }\n    }\n    return false;\n  }\n\n  canMove2(wario, direction) {\n    let tiles = wario.currentTiles(this);\n    let closestXCoords = this.closestCoordinate(wario.x + tiles[0].viewportDiff);\n    let closestYCoords = this.closestCoordinate(wario.y);\n    let bubble = wario.bubble(this);\n    // console.log(tiles)\n\n    switch (direction) {\n      case 'forward':\n        // let forward = true;\n        // let nogoCoords = this.noGoZones();\n        // console.log(nogoCoords);\n        // nogoCoords.forEach(coord => {\n        //   if (wario.x + tiles[0].viewportDiff > coord[0] && wario.x + tiles[0].viewportDiff < coord[0] + 16 && wario.y < coord[1] && wario.y > coord[1] - 16) {\n        //     // console.log(wario.x)\n        //     forward = false;\n        //   }\n        // });\n        // return forward\n        let forward = 0;\n        bubble['leftBubble'].forEach(tile => {\n          if (tiles[0] instanceof Pipe && tiles[1] instanceof Pipe && tiles[2] instanceof Pipe) {\n            wario.x -= 20;\n            forward -= 200;\n          }\n          if (tile.passable) {\n            forward += 51;\n          }\n          if (tiles[2] instanceof Pipe) {\n            forward -= 100;\n          }\n          if (wario.y < tiles[0].y && wario.y < tiles[1].y) {\n            forward += 50;\n          }\n        });\n        return forward > 0;\n        break;\n      case 'backward':\n        let backward = 0;\n        bubble['rightBubble'].forEach(tile => {\n          if (tiles[0] instanceof Pipe && tiles[1] instanceof Pipe && tiles[2] instanceof Pipe) {\n            wario.x += 20;\n            backward -= 200;\n          }\n          if (tile.passable) {\n            backward += 51;\n          }\n          if (tiles[2] instanceof Pipe) {\n            backward -= 100;\n          }\n          if (wario.y < tiles[0].y && wario.y < tiles[1].y) {\n            backward += 50;\n          }\n          if (wario.x - 5 < 0) {\n            backward = -10;\n          } else if (tile.passable) {\n            backward += 1;\n          }\n        });\n        return backward > 0;\n        break;\n    }\n  }\n\n  enableGravity(obj) {\n    let tiles = obj.currentTiles(this);\n    let bottomTiles = [tiles[0], tiles[1]];\n    let goombas = this.map.goombaPieces;\n    let that = this;\n    let floorCount = 0;\n    let pipeCount = 0;\n\n    bottomTiles.forEach(tile => {\n      if (tile instanceof Floor) {\n        return;\n      } else if (tile instanceof Pipe) {\n        pipeCount += 1;\n      } else {\n        floorCount += 1;\n      }\n    });\n    this.checkDeathGoomba(bottomTiles);\n    if (goombas.includes(bottomTiles[0]) || goombas.includes(bottomTiles[1])) {\n      // bottomTiles[0].triggerDeath(bottomTiles[0], that);\n      return true;\n    } else if (floorCount < 2 || pipeCount > 0) {\n      return true;\n    } else if (floorCount < 2 && pipeCount > 0) {\n      obj.x -= 3;\n      obj.y += 1;\n      return true;\n    } else {\n      obj.y += 1;\n      return false;\n    };\n  }\n\n  checkDeathGoomba(bottomTiles) {\n    let bottomLeft = bottomTiles[0];\n    let bottomRight = bottomTiles[1];\n    let wario = this.character;\n    let that = this;\n    this.map.goombaPieces.forEach(goomba => {\n      // console.log('hi')\n      // console.log(bottomLeft.x + bottomRight.x);\n      // console.log('goomba', goomba.x);\n      // console.log(bottomLeft.x)\n      // console.log(bottomRight.x)\n      if (goomba.x >= (bottomLeft.x - 17) && goomba.x <= (bottomRight.x + 17)) {\n        // console.log('hihi');\n        if (goomba.y > wario.y + 5 && goomba.y < wario.y + 15) {\n          if (!goomba.jumpedOn) {\n            goomba.jumpedOn = true;\n            wario.bouncing = true;\n            setTimeout(function () {\n              wario.bouncing = false;\n            }, 200);\n            setTimeout(function () {\n              goomba.triggerDeath(goomba, that);\n            }, 200);\n            wario.bouncing = true;\n            setTimeout(function () {\n              wario.jump(2, that, 10);\n            }, 25);\n          }\n\n          // if (wario.bouncing) {\n          // } else {\n          // }\n        }\n      }\n    });\n  }\n\n  closestCoordinate(ord, width = 16) {\n    for (let i = 0; i < width; i++) {\n      let newOrd = ord - i;\n      if (newOrd % width === 0) {\n        return [newOrd, newOrd + width];\n      }\n    }\n  }\n\n  tilesAtXCoordinate(ord) {\n    let closestOrd = this.closestCoordinate(ord);\n    let allPieces = this.map.floorPieces;\n    let leftTiles = [];\n    let rightTiles = [];\n\n    allPieces.forEach(tile => {\n      if (tile.x === closestOrd[0]) leftTiles.push(tile);\n      if (tile.x === closestOrd[1]) rightTiles.push(tile);\n    });\n\n    return [leftTiles, rightTiles];\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/goomba.js":
/*!***********************!*\
  !*** ./src/goomba.js ***!
  \***********************/
/***/ ((module) => {

eval("class Goomba {\n  constructor(x, y) {\n    this.height = 16;\n    this.width = 24;\n    this.x = x;\n    this.y = y;\n    this.viewportDiff = 0;\n    this.render = true;\n    this.triggered = false;\n    this.passable = false;\n    this.spritePos = [90, 40];\n    // this.spritePos = [500, 30]\n    this.context = null;\n    this.image = null;\n    this.moving = null;\n    this.dead = false;\n    this.jumpedOn = false;\n\n    let that = this;\n    setInterval(function () {\n      that.changeSprite();\n    }, 500);\n  }\n\n  moveX() {\n    this.x -= .5;\n  }\n\n  triggerMovement(goomba) {\n    goomba.triggered = true;\n    this.moving = setInterval(function () {\n      goomba.moveX();\n    }, 1000 / 60);\n  }\n\n  triggerDeath(goomba, that) {\n    goomba.passable = true;\n    goomba.jumpedOn = true;\n    // goomba.spritePos[0] = 500;\n    goomba.spritePos = [500, 30];\n    goomba.dead = true;\n    let goombas = that.map.goombaPieces;\n    let goombaIdx = goombas.indexOf(goomba);\n    setTimeout(function () {\n      that.map.goombaPieces.splice(goombaIdx, 1);\n    }, 200)\n    if (goomba.moving) {\n      clearInterval(goomba.moving);\n    }\n  }\n\n  changeSprite() {\n    switch (this.spritePos[0]) {\n      case 90:\n        this.spritePos[0] = 290;\n        break;\n      case 290:\n        this.spritePos[0] = 90;\n        break;\n    }\n  }\n\n  draw(tile) {\n    this.context.drawImage(\n      this.image,\n      this.spritePos[0], this.spritePos[1],\n      225, 200,\n      this.x - tile.viewportDiff, this.y,\n      this.width, this.height\n    );\n  }\n}\n\nmodule.exports = Goomba;\n\n//# sourceURL=webpack:///./src/goomba.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n// game elements\n\nfunction loadImage(url) {\n  return new Promise(resolve => {\n    const image = new Image();\n    image.addEventListener('load', () => {\n      resolve(image);\n    });\n    image.src = url;\n  });\n}\n\nfunction createGGMsg() {\n  let newCanvas = document.createElement('div');\n  let gameOverMsg = document.createElement('form');\n  let text = document.createElement('p');\n  let button = document.createElement('button');\n  text.innerHTML = 'GAME OVER';\n  button.innerText = 'Play Again?';\n  gameOverMsg.appendChild(text);\n  gameOverMsg.appendChild(button);\n  gameOverMsg.classList.add(\"gg-msg\");\n  gameOverMsg.setAttribute(\"id\", \"gg\");\n  newCanvas.classList.add(\"dim-canvas\");\n  newCanvas.setAttribute(\"id\", \"dim\");\n  text.classList.add(\"gg-text\");\n  button.classList.add(\"gg-button\");\n  document.body.appendChild(newCanvas);\n  document.body.appendChild(gameOverMsg);\n}\n\nfunction displayGGMsg() {\n  let ggMsg = document.getElementById(\"gg\");\n  let displayCanvas = document.getElementById(\"dim\");\n  ggMsg.classList.add(\"enable\");\n  displayCanvas.classList.add(\"enable\");\n}\n\nwindow.onload = function () {\n  const context = document.getElementById(\"game-window\").getContext('2d');\n  createGGMsg();\n  // window.requestAnimationFrame(game.map.fpsCounter(context));\n};\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById(\"game-window\");\n  const context = canvas.getContext('2d');\n  context.imageSmoothingEnabled = false;\n\n  const game = new Game(context);\n  const wario = game.character; \n  const goomba1 = game.goomba1;\n  const map = game.map;\n  const goombas = map.goombaPieces;\n  const tile = game.emptyTile;\n  const floor = game.floor;\n  const roof = game.roof;\n  const itemBlock = game.itemBlock;\n  const pipe = game.pipe;\n  const displayGG = displayGGMsg;\n  const allRenderTiles = map.allRenderPieces();\n\n  loadImage('../img/tiles.png')\n    .then(image => {\n      map.generateTiles(floor, context, image, map.floorHoles);\n      map.generateTiles(roof, context, image, map.roofHoles);\n      map.generateTiles(itemBlock, context, image, map.itemBlockHoles);\n      map.generateTiles(pipe, context, image, map.pipeHoles);\n      tile.generateEmptyTiles(map, tile, allRenderTiles);\n      let noGoZones = game.noGoZones();\n      wario.nogoZones = noGoZones;\n      // pipe.context = context;\n      // pipe.image = image;\n      // map.draw(pipe);\n      // console.log(map.emptyPieces)\n    });\n\n  loadImage('../img/goomba.png')\n    .then(image => {\n      goombas.forEach(goomba => {\n        goomba.context = context;\n        goomba.image = image;\n        goomba.draw(tile);\n      })\n      // goomba1.context = context;\n      // goomba1.image = image;\n      // goomba1.draw(tile);\n    });\n\n  loadImage('../img/wario4.png')\n    .then(image => {\n      wario.context = context;\n      wario.image = image;\n      wario.draw();\n      // game.enableGravity(wario);\n      // map.fpsCounter(context);\n      game.start(displayGG);\n\n      // console.log(game.tileAtXCoordinate(33))\n    });\n\n  game.bindKeyHandlers();\n  // key(\"w\", function() { wario.moveX(1) })\n\n  // requestAnimationFrame(game.start.bind(game));\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/itemBlock.js":
/*!**************************!*\
  !*** ./src/itemBlock.js ***!
  \**************************/
/***/ ((module) => {

eval("class ItemBlock {\n  constructor(x, y, context, image, bool=true) {\n    this.context = context;\n    this.image = image;\n    this.height = 16;\n    this.width = 16;\n    this.spritePos = [384, 0];\n    this.viewportDiff = 0;\n    this.x = x;\n    this.y = y;\n    this.render = bool;\n    this.maxRender = 51;\n    this.passable = false;\n    this.triggered = false;\n    let that = this;\n    setInterval(function() {\n      that.changeSprite();\n    }, 600)\n  }\n\n  changeSprite() {\n    let currentSprite = this.spritePos[0];\n    switch (currentSprite) {\n      case 400:\n        this.spritePos[0] = 384;\n        break;\n      case 384:\n        this.spritePos[0] = 400;\n        break;\n    }\n  }\n}\n\nmodule.exports = ItemBlock;\n\n//# sourceURL=webpack:///./src/itemBlock.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Floor = __webpack_require__(/*! ./floor */ \"./src/floor.js\");\nconst Roof = __webpack_require__(/*! ./roof */ \"./src/roof.js\");\nconst Pipe = __webpack_require__(/*! ./pipe */ \"./src/pipe.js\");\nconst ItemBlock = __webpack_require__(/*! ./itemBlock */ \"./src/itemBlock.js\");\n\nclass Map {\n  constructor() {\n    this.width = 1500;\n    this.height = 20;\n    this.currentSecond = 0;\n    this.frameCount = 0;\n    this.framesPrevSec = 0;\n    this.floorPieces = [];\n    this.roofPieces = [];\n    this.emptyPieces = [];\n    this.pipePieces = [];\n    this.itemBlockPieces = [];\n    this.goombaPieces = [];\n    this.floorHoles = [160, 176, 560, 576, 800, 816];\n    this.roofFills = [240, 272, 288, 864, 880, 896];\n    this.itemBlockFills = [256, 912];\n    this.pipeFills = [480];\n    this.roofHoles = this.generateHoles(this.roofFills, 16);\n    this.itemBlockHoles = this.generateHoles(this.itemBlockFills, 16);\n    this.pipeHoles = this.generateHoles(this.pipeFills, 32);\n  }\n\n  allPieces() {\n    return this.floorPieces.concat(this.itemBlockPieces).concat(this.roofPieces).concat(this.pipePieces).concat(this.goombaPieces).concat(this.emptyPieces);\n  }\n\n  allRenderPieces() {\n    return this.floorPieces.concat(this.itemBlockPieces).concat(this.roofPieces).concat(this.pipePieces);\n  }\n\n  draw(tile) {\n    if (tile.render) {\n      tile.context.drawImage(\n        tile.image,\n        tile.spritePos[0], tile.spritePos[1],\n        tile.width, tile.height,\n        tile.x - tile.viewportDiff, tile.y,\n        tile.width, tile.height\n      );\n    }\n  }\n\n  fpsCounter(context) {\n    if (context == null) return;\n    let sec = Math.floor(Date.now() / 1000);\n\n    if (sec != this.currentSecond) {\n      this.currentSecond = sec;\n      this.framesPrevSec = this.frameCount;\n      this.frameCount = 1;\n    } else {\n      this.frameCount += 1;\n    }\n    context.fillText(\"FPS: \" + this.framesPrevSec, 10, 10);\n  }\n\n  generateTiles(tile, context, image, holes) {\n    for (let x = tile.x; x < this.width; x += tile.width) {\n      for (let y = tile.y; y < tile.maxRender; y += tile.height) {\n        if (holes.includes(x)) {\n          break;\n        } else {\n          let pieceIdx = 0;\n          this.emptyPieces.forEach((piece, index) => {\n            if (piece.x === x && piece.y === y) pieceIdx = index;\n          });\n          this.emptyPieces.splice(pieceIdx, 1);\n          let newTile = new tile.constructor(x, y, context, image, this);\n          if (newTile instanceof Floor) this.floorPieces.push(newTile);\n          if (newTile instanceof Roof) this.roofPieces.push(newTile);\n          if (newTile instanceof Pipe) {\n            newTile.createDouble(this);\n            this.pipePieces.push(newTile);\n          };\n          if (newTile instanceof ItemBlock) this.itemBlockPieces.push(newTile);\n          this.draw(newTile);\n        };\n      }\n    }\n  }\n\n  generateRoofHoles() {\n    let holes = [];\n    for (let pos = 0; pos < this.width; pos += 16) {\n      if (!this.roofFills.includes(pos)) holes.push(pos);\n    }\n    return holes;\n  }\n\n  generateHoles(fills, width) {\n    let holes = [];\n    for (let pos = 0; pos < this.width; pos += width) {\n      if (!fills.includes(pos)) holes.push(pos);\n    }\n    return holes;\n  }\n}\n\nmodule.exports = Map;\n\n//# sourceURL=webpack:///./src/map.js?");

/***/ }),

/***/ "./src/pipe.js":
/*!*********************!*\
  !*** ./src/pipe.js ***!
  \*********************/
/***/ ((module) => {

eval("class Pipe {\n  constructor(x, y, context, image, bool=true) {\n    this.context = context;\n    this.image = image;\n    this.height = 32;\n    this.width = 32;\n    this.spritePos = [0, 128];\n    this.viewportDiff = 0;\n    this.x = x;\n    this.y = y;\n    this.render = bool;\n    this.maxRender = 100;\n    this.passable = false;\n  }\n\n  createDouble(map) {\n    let pipePair1 = new Pipe(this.x + 16, this.y, null, null, false)\n    let pipePair2 = new Pipe(this.x, this.y + 16, null, null, false)\n    let pipePair3 = new Pipe(this.x + 16, this.y + 16, null, null, false)\n    map.pipePieces.push(pipePair1);\n    map.pipePieces.push(pipePair2);\n    map.pipePieces.push(pipePair3);\n  }\n}\n\nmodule.exports = Pipe;\n\n//# sourceURL=webpack:///./src/pipe.js?");

/***/ }),

/***/ "./src/roof.js":
/*!*********************!*\
  !*** ./src/roof.js ***!
  \*********************/
/***/ ((module) => {

eval("class Roof {\n  constructor(x, y, context, image, bool=true) {\n    this.context = context;\n    this.image = image;\n    this.height = 16;\n    this.width = 16;\n    this.spritePos = [16, 0];\n    this.viewportDiff = 0;\n    this.x = x;\n    this.y = y;\n    this.render = bool;\n    this.maxRender = 51;\n    this.passable = false;\n  }\n}\n\nmodule.exports = Roof;\n\n//# sourceURL=webpack:///./src/roof.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/***/ ((module) => {

eval("class Tile {\n  constructor(x, y) {\n    this.height = 16;\n    this.width = 16;\n    this.x = x;\n    this.y = y;\n    this.viewportDiff = 0;\n    this.maxRender = 1000;\n    this.passable = true;\n  }\n\n  generateEmptyTiles(map, tile, context) {\n    for (let x = tile.x; x < 1500; x += tile.width) {\n      for (let y = tile.y; y < tile.maxRender; y += tile.height) {\n        let newTile = new Tile(x, y);\n        map.emptyPieces.push(newTile);\n      }\n    }\n  }\n}\n\nmodule.exports = Tile;\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ }),

/***/ "./src/wario.js":
/*!**********************!*\
  !*** ./src/wario.js ***!
  \**********************/
/***/ ((module) => {

eval("class Wario {\n  constructor(x, y, restricted) {\n    this.height = 34 / 2;\n    this.width = 48 / 2;\n    this.x = x;\n    this.y = y;\n    this.context = null;\n    this.bouncing = false;\n    this.nogoZones = restricted;\n    this.image = null;\n  }\n\n  bubble(game) {\n    let currentTiles = this.currentTiles(game);\n    let allPieces = game.map.allPieces();\n    let floorTiles = {\n      leftBubble: [currentTiles[0], currentTiles[2]],\n      rightBubble: [currentTiles[1], currentTiles[3]]\n    };\n    let bubble = {\n      leftBubble: [],\n      rightBubble: []\n    };\n    floorTiles['leftBubble'].forEach(tile => {\n      allPieces.forEach(piece => {\n        if (!piece || !tile) {\n          return;\n        } else if (piece.x - 32 === tile.x && piece.y === tile.y) {\n          bubble['rightBubble'].push(piece);\n        } else if (piece.x + 16 === tile.x && piece.y === tile.y) {\n          bubble['leftBubble'].push(piece);\n        }\n      });\n    });\n    return bubble;\n  }\n\n  currentTiles(game, bool) {\n    let allTiles = game.map.allPieces();\n    let currentTiles = [];\n    let closestYOrd = game.closestCoordinate(this.y);\n    let closestXOrd = game.closestCoordinate(this.x + allTiles[0].viewportDiff);\n    allTiles.forEach(tile => {\n      if ((tile.y === closestYOrd[0] || tile.y === closestYOrd[1]) && (tile.x === closestXOrd[0] || tile.x === closestXOrd[1])) currentTiles.push(tile);\n    });\n    // console.log(currentTiles);\n    return currentTiles;\n  }\n\n  draw() {\n    this.context.drawImage(this.image, 13, 670, 35, 49, this.x - 8, this.y + 4, this.width, this.height);\n  }\n\n  moveX(direction, bool) {\n    if (bool) {\n      this.x += direction;\n    } else if (bool === false) {\n      this.relativex += direction;\n    } else {\n      this.x += direction;\n      this.relativex += direction;\n    }\n  }\n\n  jump(direction, that, steps = 0) {\n    let wario = this;\n    let maxSteps = 36;\n    that.animate();\n\n    if (steps === maxSteps) {\n      that.animate();\n      return;\n    } else {\n      this.y -= direction;\n      return setTimeout(function () {\n        wario.jump(direction, that, steps + 1);\n      }, 5);\n    }\n  }\n}\n\nmodule.exports = Wario;\n\n//# sourceURL=webpack:///./src/wario.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;