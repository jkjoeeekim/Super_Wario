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

eval("class Floor {\n  constructor(x, y, context, image) {\n    this.context = context;\n    this.image = image; \n    this.height = 16;\n    this.width = 16;\n    this.spritePos = [0, 0];\n    this.x = x;\n    this.y = y;\n    this.maxRender = 153;\n    this.passable = false;\n  }\n}\n\nmodule.exports = Floor;\n\n//# sourceURL=webpack:///./src/floor.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Wario = __webpack_require__(/*! ./wario */ \"./src/wario.js\");\nconst Map = __webpack_require__(/*! ./map */ \"./src/map.js\");\nconst Floor = __webpack_require__(/*! ./floor */ \"./src/floor.js\");\nconst Roof = __webpack_require__(/*! ./roof */ \"./src/roof.js\");\n\nclass Game {\n  constructor(context) {\n    this.keysDown = {\n      'ArrowLeft': false,\n      'ArrowRight': false,\n      'ArrowUp': false\n    };\n    this.context = context;\n    this.map = new Map();\n    this.character = new Wario(25, 0);\n    this.floor = new Floor(0, 112);\n    this.roof = new Roof(0, 48);\n  }\n\n  bindKeyHandlers() {\n    const wario = this.character;\n    let that = this;\n\n    document.addEventListener('keypress', function (e) {\n      if (e.key === ' ') {\n        if (!that.keysDown[e.key]) {\n          that.keysDown[e.key] = true;\n          wario.jump(2, that);\n          setTimeout(function () { that.keysDown[e.key] = false; }, 550);\n        }\n      }\n    });\n\n    document.addEventListener('keydown', function (e) {\n      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n        that.keysDown[e.key] = true;\n      }\n    });\n\n    document.addEventListener('keyup', function (e) {\n      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {\n        that.keysDown[e.key] = false;\n      }\n    });\n  }\n\n  start() {\n    let that = this;\n    const wario = this.character;\n    Object.keys(this.keysDown).forEach((key) => {\n      if (this.keysDown[key]) {\n        switch (key) {\n          case 'ArrowLeft':\n            wario.moveX(-1);\n            break;\n          case 'ArrowRight':\n            wario.moveX(1);\n            break;\n        }\n      }\n    });\n\n    this.animate();\n    this.map.fpsCounter(this.context);\n    this.enableGravity(wario);\n    requestAnimationFrame(this.start.bind(this));\n  }\n\n  animate() {\n    this.context.clearRect(0, 0, 800, 600);\n    const allPieces = this.map.allPieces();\n    allPieces.forEach((tile) => {\n      this.map.draw(tile);\n    });\n    // this.context.clearRect(0, 0, 800, 600);\n    // this.map.generateTiles(this.floor)\n    this.character.draw();\n    // requestAnimationFrame(this.animate(context, image));\n  }\n\n  enableGravity(obj) {\n    // console.log(obj.x + obj.width)\n    // console.log(obj.y + obj.height)\n    this.context.fillText(\".\", obj.x + obj.width, obj.y + obj.height);\n    // console.log(this);\n    console.log('y', obj.y + obj.height);\n    console.log('x', obj.x + obj.width);\n    let allFloorPieces = this.map.floorPieces;\n    let tiles = this.tilesAtXCoordinate(obj.x, allFloorPieces);\n    // console.log('top floor y', tiles[0].y);\n    // console.log('top floor x', tiles[0].x);\n    console.log(tiles);\n    if (tiles.length === 0) {\n      console.log('falling')\n      obj.y += 1;\n    } else if ((obj.y + obj.height) < tiles[0].y) {\n      console.log('falling');\n      obj.y += 1;\n    }\n  }\n\n  closestXCoordinate(xOrd) {\n    // let newOrd = xOrd;\n    for (let i = 0; i < 16; i++) {\n      if ((xOrd - i) % 16 === 0) {\n        return xOrd - i;\n      }\n    }\n  }\n\n  tilesAtXCoordinate(xOrd, pieces) {\n    let ord = this.closestXCoordinate(xOrd);\n    console.log(ord);\n    let allPieces = pieces;\n    // console.log(allfloorPieces);\n    // debugger;\n    let tiles = [];\n\n    // floorPieces.forEach(tile => console.log(tile))\n    // debugger;\n    allPieces.forEach(tile => {\n      if (tile.x === ord) tiles.push(tile);\n    });\n    // console.log(tiles);\n\n    return tiles;\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n// game elements\n\nfunction loadImage(url) {\n  return new Promise(resolve => {\n    const image = new Image();\n    image.addEventListener('load', () => {\n      resolve(image);\n    });\n    image.src = url;\n  });\n}\n\nwindow.onload = function () {\n  const context = document.getElementById(\"game-window\").getContext('2d');\n  // window.requestAnimationFrame(game.map.fpsCounter(context));\n};\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById(\"game-window\");\n  const context = canvas.getContext('2d');\n  context.imageSmoothingEnabled = false;\n\n  const game = new Game(context);\n  const wario = game.character;\n  const map = game.map;\n  const floor = game.floor;\n  const roof = game.roof;\n\n  \n  loadImage('../img/tiles.png')\n  .then(image => {\n    map.generateTiles(floor, context, image, map.floorHoles);\n    map.generateTiles(roof, context, image, map.roofHoles);\n    // console.log(map.floorPieces);\n    // console.log(map.roofPieces);\n  });\n  \n  loadImage('../img/wario4.png')\n  .then(image => {\n    wario.context = context;\n    wario.image = image;\n    wario.draw();\n    // game.enableGravity(wario);\n    // map.fpsCounter(context);\n    game.start();\n    // console.log(game.tileAtXCoordinate(33))\n  });\n  \n  game.bindKeyHandlers();\n  // key(\"w\", function() { wario.moveX(1) })\n\n  // requestAnimationFrame(game.start.bind(game));\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Floor = __webpack_require__(/*! ./floor */ \"./src/floor.js\");\nconst Roof = __webpack_require__(/*! ./roof */ \"./src/roof.js\");\n\nclass Map {\n  constructor() {\n    this.width = 1000;\n    this.height = 20;\n    this.currentSecond = 0;\n    this.frameCount = 0;\n    this.framesPrevSec = 0;\n    this.floorPieces = [];\n    this.roofPieces = [];\n    this.floorHoles = [160, 176];\n    this.roofFills = [240, 256, 272, 288];\n    this.roofHoles = this.generateRoofHoles();\n  }\n\n  allPieces() {\n    return this.floorPieces.concat(this.roofPieces);\n  }\n\n  draw(tile) {\n    tile.context.drawImage(tile.image,\n      tile.spritePos[0], tile.spritePos[1],\n      16, 16,\n      tile.x, tile.y,\n      tile.width, tile.height\n    );\n  }\n\n  fpsCounter(context) {\n    if (context == null) return;\n    let sec = Math.floor(Date.now() / 1000);\n    // console.log(sec)\n    // console.log(this.currentSecond)\n    // console.log('fps', this.framesPrevSec)\n    // let framesPrevSec;\n    \n    if (sec != this.currentSecond) {\n      // console.log('before reset', this.frameCount)\n      this.currentSecond = sec;\n      this.framesPrevSec = this.frameCount;\n      this.frameCount = 1;\n    } else {\n      this.frameCount += 1;\n    }\n    context.fillText(\"FPS: \" + this.framesPrevSec, 10, 10)\n    // context.fillStyle = \"#ff0000\";\n    // context.clearText();\n    // window.requestAnimationFrame(this.fpsCounter(context));\n  }\n\n  generateTiles(tile, context, image, holes) {\n    for (let x = tile.x; x < this.width; x += tile.width) {\n      for (let y = tile.y; y < tile.maxRender; y += tile.height) {\n        if (holes.includes(x)) {\n          break;\n        } else {\n          let newTile = new tile.constructor(x, y, context, image);\n          if (newTile instanceof Floor) this.floorPieces.push(newTile);\n          if (newTile instanceof Roof) this.roofPieces.push(newTile);\n          this.draw(newTile);\n        };\n      }\n    }\n  }\n\n  generateRoofHoles() {\n    let holes = [];\n    for (let pos = 0; pos < this.width; pos += 16) {\n      if (!this.roofFills.includes(pos)) holes.push(pos);\n    }\n    return holes;\n  }\n}\n\nmodule.exports = Map;\n\n//# sourceURL=webpack:///./src/map.js?");

/***/ }),

/***/ "./src/roof.js":
/*!*********************!*\
  !*** ./src/roof.js ***!
  \*********************/
/***/ ((module) => {

eval("class Roof {\n  constructor(x, y, context, image) {\n    this.context = context;\n    this.image = image;\n    this.height = 16;\n    this.width = 16;\n    this.spritePos = [16, 0];\n    this.x = x;\n    this.y = y;\n    this.maxRender = 51;\n    this.passable = false;\n  }\n}\n\nmodule.exports = Roof;\n\n//# sourceURL=webpack:///./src/roof.js?");

/***/ }),

/***/ "./src/wario.js":
/*!**********************!*\
  !*** ./src/wario.js ***!
  \**********************/
/***/ ((module) => {

eval("class Wario {\n  constructor(x, y) {\n    this.height = 34 / 2;\n    this.width = 48 / 2;\n    this.x = x;\n    this.y = y + 5;\n    this.context = null;\n    this.image = null;\n  }\n\n  draw() {\n    this.context.drawImage(this.image, 13, 670, 35, 49, this.x - 10, this.y + 5, this.width, this.height);\n  }\n\n  moveX(direction) {\n    console.log('old pos', this.x);\n    this.x += direction;\n    console.log('new pos', this.x);\n  }\n\n  jump(direction, that, steps = 0) {\n    console.log('steps: ', steps)\n    console.log(this.y);\n    let wario = this;\n    let maxSteps = 36;\n    that.animate();\n\n    if (steps === maxSteps) {\n      that.animate();\n      return;\n    } else {\n      this.y -= direction;\n      return setTimeout(function () {\n        wario.jump(direction, that, steps + 1);\n      }, 5);\n    }\n\n    console.log(this.y);\n  }\n}\n\nmodule.exports = Wario;\n\n//# sourceURL=webpack:///./src/wario.js?");

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