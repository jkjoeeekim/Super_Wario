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

eval("const Wario = __webpack_require__(/*! ./wario */ \"./src/wario.js\");\nconst Map = __webpack_require__(/*! ./map */ \"./src/map.js\");\nconst Floor = __webpack_require__(/*! ./floor */ \"./src/floor.js\");\nconst Roof = __webpack_require__(/*! ./roof */ \"./src/roof.js\");\n\nclass Game {\n  constructor(context) {\n    this.keysDown = {\n      'w': false,\n      'a': false,\n      's': false,\n      'd': false\n    };\n    this.context = context;\n    this.map = new Map();\n    this.character = new Wario(25, 100);\n    this.floor = new Floor(0, 112);\n    this.roof = new Roof(0, 48);\n  }\n\n  bindKeyHandlers() {\n    const wario = this.character;\n    let that = this;\n    key(\"left\", function () {\n      that.keysDown['a'] = true;\n      console.log('his', that.keysDown);\n\n      wario.moveX(-3);\n      that.animate();\n    });\n    key(\"right\", function () {\n      wario.moveX(3);\n      that.animate();\n    });\n    key(\"up\", function () {\n      wario.moveY(3, that);\n    });\n  }\n\n  start() {\n    this.bindKeyHandlers();\n    this.lastTime = 0;\n    console.log('hello');\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate() {\n    console.log(this);\n    this.context.clearRect(0, 0, 800, 600);\n    const allPieces = this.map.allPieces();\n    allPieces.forEach((tile) => {\n      this.map.draw(tile);\n    });\n    // this.context.clearRect(0, 0, 800, 600);\n    // this.map.generateTiles(this.floor)\n    this.character.draw();\n    console.log('hi');\n    // requestAnimationFrame(this.animate(context, image));\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n// game elements\n\nfunction loadImage(url) {\n  return new Promise(resolve => {\n    const image = new Image();\n    image.addEventListener('load', () => {\n      resolve(image);\n    });\n    image.src = url;\n  });\n}\n\nwindow.onload = function () {\n  const context = document.getElementById(\"game-window\").getContext('2d');\n  // window.requestAnimationFrame(game.map.fpsCounter(context));\n};\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById(\"game-window\");\n  const context = canvas.getContext('2d');\n  context.imageSmoothingEnabled = false;\n\n  const game = new Game(context);\n  const wario = game.character;\n  const map = game.map;\n  const floor = game.floor;\n  const roof = game.roof;\n\n  loadImage('../img/tiles.png')\n    .then(image => {\n      map.generateTiles(floor, context, image, map.floorHoles);\n      map.generateTiles(roof, context, image, map.roofHoles);\n      console.log(map.floorPieces);\n      console.log(map.roofPieces);\n    });\n\n  loadImage('../img/wario4.png')\n    .then(image => {\n      wario.context = context;\n      wario.image = image;\n      wario.draw();\n      game.start(context, image);\n    });\n\n  // key(\"w\", function() { wario.moveX(1) })\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Floor = __webpack_require__(/*! ./floor */ \"./src/floor.js\");\nconst Roof = __webpack_require__(/*! ./roof */ \"./src/roof.js\");\n\nclass Map {\n  constructor() {\n    this.width = 1000;\n    this.height = 20;\n    this.currentSecond = 0;\n    this.frameCount = 0;\n    this.floorPieces = [];\n    this.roofPieces = [];\n    this.floorHoles = [160, 176];\n    this.roofFills = [240, 256, 272, 288];\n    this.roofHoles = this.generateRoofHoles();\n  }\n\n  allPieces() {\n    return this.floorPieces.concat(this.roofPieces);\n  }\n\n  draw(tile) {\n    tile.context.drawImage(tile.image,\n      tile.spritePos[0], tile.spritePos[1],\n      16, 16,\n      tile.x, tile.y,\n      tile.width, tile.height\n    );\n  }\n\n  fpsCounter(context) {\n    if (context == null) return;\n    let sec = Math.floor(Date.now() / 1000);\n    console.log(sec)\n    console.log(this.currentSecond)\n    let framesPrevSec;\n\n    if (sec != this.currentSecond) {\n      this.currentSecond = sec;\n      framesPrevSec = this.frameCount;\n      console.log(framesPrevSec)\n      this.frameCount = 1;\n    } else {\n      this.frameCount += 1;\n    }\n\n    // context.fillStyle = \"#ff0000\";\n    context.fillText(\"FPS: \" + framesPrevSec, 10, 10)\n    // window.requestAnimationFrame(this.fpsCounter(context));\n  }\n\n  generateTiles(tile, context, image, holes) {\n    for (let x = tile.x; x < this.width; x += tile.width) {\n      for (let y = tile.y; y < tile.maxRender; y += tile.height) {\n        if (holes.includes(x)) {\n          break;\n        } else {\n          let newTile = new tile.constructor(x, y, context, image);\n          if (newTile instanceof Floor) this.floorPieces.push(newTile);\n          if (newTile instanceof Roof) this.roofPieces.push(newTile);\n          this.draw(newTile);\n        };\n      }\n    }\n  }\n\n  generateRoofHoles() {\n    let holes = [];\n    for (let pos = 0; pos < this.width; pos += 16) {\n      if (!this.roofFills.includes(pos)) holes.push(pos);\n    }\n    return holes;\n  }\n}\n\nmodule.exports = Map;\n\n//# sourceURL=webpack:///./src/map.js?");

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

eval("class Wario {\n  constructor(x, y) {\n    this.height = 34 / 2;\n    this.width = 48 / 2;\n    this.x = x;\n    this.y = y;\n    this.context = null;\n    this.image = null;\n  }\n\n  draw() {\n    this.context.drawImage(this.image, 13, 670, 35, 49, this.x, this.y, this.width, this.height);\n  }\n\n  moveX(direction) {\n    console.log(this.x);\n    this.x += direction;\n    console.log(this.x);\n  }\n\n  moveY(direction, that, steps = 0) {\n    console.log('steps: ', steps)\n    console.log(this.y);\n    let wario = this;\n    that.animate();\n\n    if (steps === 6) {\n      that.animate();\n      return;\n    } else if (steps < 3) {\n      this.y -= direction;\n      return setTimeout(function () {\n        wario.moveY(direction, that, steps + 1);\n      }, 500);\n    } else if (steps < 6 && steps > 2) {\n      this.y += direction;\n      return setTimeout(function () {\n        wario.moveY(direction, that, steps + 1);\n      }, 500);\n    }\n\n    console.log(this.y);\n  }\n}\n\nmodule.exports = Wario;\n\n//# sourceURL=webpack:///./src/wario.js?");

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