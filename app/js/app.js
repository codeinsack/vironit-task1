/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///../node_modules/process/browser.js?");

/***/ }),

/***/ "../node_modules/uniqid/index.js":
/*!***************************************!*\
  !*** ../node_modules/uniqid/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {/* \n(The MIT License)\nCopyright (c) 2014 Halász Ádám <mail@adamhalasz.com>\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n*/\n\n//  Unique Hexatridecimal ID Generator\n// ================================================\n\n//  Dependencies\n// ================================================\nvar pid = process && process.pid ? process.pid.toString(36) : '' ;\nvar address = '';\nif(false){ var i, mac, networkInterfaces; } \n\n//  Exports\n// ================================================\nmodule.exports = module.exports.default = function(prefix){ return (prefix || '') + address + pid + now().toString(36); }\nmodule.exports.process = function(prefix){ return (prefix || '') + pid + now().toString(36); }\nmodule.exports.time    = function(prefix){ return (prefix || '') + now().toString(36); }\n\n//  Helpers\n// ================================================\nfunction now(){\n    var time = Date.now();\n    var last = now.last || time;\n    return now.last = time > last ? time : last + 1;\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"../node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///../node_modules/uniqid/index.js?");

/***/ }),

/***/ "./js/components/add.js":
/*!******************************!*\
  !*** ./js/components/add.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Component = __webpack_require__(/*! ./component */ \"./js/components/component.js\")\r\n\r\nfunction AddComponent () {\r\n  Component.call(this)\r\n  this.element.addEventListener('click', this.handleClick.bind(this))\r\n}\r\n\r\nAddComponent.prototype = Object.create(Component.prototype)\r\nAddComponent.prototype.constructor = AddComponent\r\n\r\nAddComponent.prototype.render = function () {\r\n  return `<button class=\"btn btn-add\">\r\n            Add ATM\r\n          </button>`\r\n}\r\n\r\nAddComponent.prototype.handleClick = function () {\r\n  this.emit('AddComponent_Click')\r\n}\r\n\r\nmodule.exports = AddComponent\r\n\n\n//# sourceURL=webpack:///./js/components/add.js?");

/***/ }),

/***/ "./js/components/atm.js":
/*!******************************!*\
  !*** ./js/components/atm.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var uniqid = __webpack_require__(/*! uniqid */ \"../node_modules/uniqid/index.js\")\r\nvar Component = __webpack_require__(/*! ./component */ \"./js/components/component.js\")\r\nvar CloseComponent = __webpack_require__(/*! ./close */ \"./js/components/close.js\")\r\nvar Atm = __webpack_require__(/*! ../core/atm */ \"./js/core/atm.js\")\r\n\r\nfunction AtmComponent () {\r\n  Component.call(this)\r\n  this.id = uniqid()\r\n  var self = this\r\n  this.core = new Atm()\r\n  this.closeBtn = new CloseComponent()\r\n  this.element.appendChild(this.closeBtn.element)\r\n  this.closeBtn.on('CloseComponent_Click', () => this.emit('CloseComponent_Click', self))\r\n  this.core.on('Atm_MakeBusy', this.increment.bind(this))\r\n  this.core.on('Atm_MakeBusy', this.changeColor.bind(this))\r\n  this.core.on('Atm_MakeFree', this.changeColor.bind(this))\r\n  this.core.on('Atm_MakeBusy', this.changeCloseBtnVisibility.bind(this))\r\n  this.core.on('Atm_MakeFree', this.changeCloseBtnVisibility.bind(this))\r\n}\r\n\r\nAtmComponent.prototype = Object.create(Component.prototype)\r\nAtmComponent.prototype.constructor = AtmComponent\r\n\r\nAtmComponent.prototype.render = function () {\r\n  return `<div class=\"rect atm\">\r\n            0\r\n          </div>`\r\n}\r\n\r\nAtmComponent.prototype.changeColor = function () {\r\n  if (this.element.style.backgroundColor === 'red') {\r\n    this.element.style.backgroundColor = 'green'\r\n  } else {\r\n    this.element.style.backgroundColor = 'red'\r\n  }\r\n}\r\n\r\nAtmComponent.prototype.changeCloseBtnVisibility = function () {\r\n  if (this.element.querySelector('.close').style.display !== 'none') {\r\n    this.element.querySelector('.close').style.display = 'none'\r\n  } else {\r\n    this.element.querySelector('.close').style.display = 'block'\r\n  }\r\n}\r\n\r\nmodule.exports = AtmComponent\r\n\n\n//# sourceURL=webpack:///./js/components/atm.js?");

/***/ }),

/***/ "./js/components/close.js":
/*!********************************!*\
  !*** ./js/components/close.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Component = __webpack_require__(/*! ./component */ \"./js/components/component.js\")\r\n\r\nfunction CloseComponent () {\r\n  Component.call(this)\r\n  this.element.addEventListener('click', this.handleClick.bind(this))\r\n}\r\n\r\nCloseComponent.prototype = Object.create(Component.prototype)\r\nCloseComponent.prototype.constructor = CloseComponent\r\n\r\nCloseComponent.prototype.render = function () {\r\n  return `<span class=\"close\"></span>`\r\n}\r\n\r\nCloseComponent.prototype.handleClick = function () {\r\n  this.element.parentElement.remove()\r\n  this.emit('CloseComponent_Click')\r\n}\r\n\r\nmodule.exports = CloseComponent\r\n\n\n//# sourceURL=webpack:///./js/components/close.js?");

/***/ }),

/***/ "./js/components/component.js":
/*!************************************!*\
  !*** ./js/components/component.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var EventEmitter = __webpack_require__(/*! ../core/eventEmitter */ \"./js/core/eventEmitter.js\")\r\n\r\nfunction Component () {\r\n  EventEmitter.call(this)\r\n  this.element = strToDOM(this.render())\r\n\r\n  function strToDOM (htmlString) {\r\n    var [ , openTag, content ] = /<(.*?|(?:.*?\\n)+.*?)>(.*?|(?:.*?\\n)+.*?)<\\/.+?>/.exec(htmlString)\r\n    var tagName = /\\w+/.exec(openTag)\r\n    var element = document.createElement(tagName)\r\n    var reParams = /([\\w|-]+)=\"(.*?|(?:.*?\\n?)+.*?)\"/g\r\n    var reParamsExecResult\r\n    while ((reParamsExecResult = reParams.exec(openTag))) {\r\n      element.setAttribute(reParamsExecResult[1], reParamsExecResult[2])\r\n    }\r\n    element.innerHTML = content.trim()\r\n    return element\r\n  }\r\n}\r\n\r\nComponent.prototype = Object.create(EventEmitter.prototype)\r\nComponent.prototype.constructor = Component\r\n\r\nComponent.prototype.increment = function () {\r\n  this.element.childNodes[0].nodeValue = parseInt(this.element.childNodes[0].nodeValue) + 1\r\n}\r\n\r\nComponent.prototype.decrement = function () {\r\n  this.element.childNodes[0].nodeValue = parseInt(this.element.childNodes[0].nodeValue) - 1\r\n}\r\n\r\nmodule.exports = Component\r\n\n\n//# sourceURL=webpack:///./js/components/component.js?");

/***/ }),

/***/ "./js/components/queue.js":
/*!********************************!*\
  !*** ./js/components/queue.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Component = __webpack_require__(/*! ./component */ \"./js/components/component.js\")\r\nvar Queue = __webpack_require__(/*! ../core/queue */ \"./js/core/queue.js\")\r\n\r\nfunction QueueComponent () {\r\n  Component.call(this)\r\n  this.core = new Queue()\r\n  this.core.on('Queue_Add', this.increment.bind(this))\r\n  this.core.on('Queue_Remove', this.decrement.bind(this))\r\n}\r\n\r\nQueueComponent.prototype = Object.create(Component.prototype)\r\nQueueComponent.prototype.constructor = QueueComponent\r\n\r\nQueueComponent.prototype.render = function () {\r\n  return `<div class=\"rect queue\">\r\n            0\r\n          </div>`\r\n}\r\n\r\nmodule.exports = QueueComponent\r\n\n\n//# sourceURL=webpack:///./js/components/queue.js?");

/***/ }),

/***/ "./js/components/range.js":
/*!********************************!*\
  !*** ./js/components/range.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Component = __webpack_require__(/*! ./component */ \"./js/components/component.js\")\r\n\r\nfunction RangeComponent () {\r\n  var self = this\r\n  Component.call(this)\r\n  RangeComponent.count++\r\n  this.input = this.element.querySelector('input')\r\n  this.label = this.element.querySelector('label')\r\n  this.input.addEventListener('change', self.updateRangeValue.bind(self))\r\n}\r\n\r\nRangeComponent.prototype = Object.create(Component.prototype)\r\nRangeComponent.prototype.constructor = RangeComponent\r\n\r\nRangeComponent.count = 0\r\n\r\nRangeComponent.prototype.render = function () {\r\n  var one = RangeComponent.count\r\n  return `<div class=\"range ${!one ? 'range-min' : 'range-max'}\">\r\n  <label>${!one ? 2 : 4}</label>\r\n  <input type=\"range\" value=\"${!one ? 2 : 4}\" min=\"${!one ? 0 : 1}\" max=\"${!one ? 9 : 10}\"></input>\r\n  </div>`\r\n}\r\n\r\nRangeComponent.prototype.updateRangeValue = function () {\r\n  this.emit('RangeComponent_Change')\r\n  this.label.innerHTML = this.input.value\r\n}\r\n\r\nmodule.exports = RangeComponent\r\n\n\n//# sourceURL=webpack:///./js/components/range.js?");

/***/ }),

/***/ "./js/core/atm.js":
/*!************************!*\
  !*** ./js/core/atm.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var utils = __webpack_require__(/*! ./utils */ \"./js/core/utils.js\")\r\nvar EventEmitter = __webpack_require__(/*! ./eventEmitter */ \"./js/core/eventEmitter.js\")\r\n\r\nfunction Atm () {\r\n  EventEmitter.call(this)\r\n  this.count = 0\r\n  this.isFree = true\r\n}\r\n\r\nAtm.prototype = Object.create(EventEmitter.prototype)\r\nAtm.prototype.constructor = Atm\r\n\r\nAtm.prototype.makeBusy = function () {\r\n  var self = this\r\n  this.count++\r\n  this.isFree = false\r\n  this.emit('Atm_MakeBusy')\r\n  setTimeout(function () {\r\n    self.makeFree()\r\n  }, utils.randomInteger(1000, 3000))\r\n}\r\n\r\nAtm.prototype.makeFree = function () {\r\n  this.isFree = true\r\n  this.emit('Atm_MakeFree')\r\n}\r\n\r\nmodule.exports = Atm\r\n\n\n//# sourceURL=webpack:///./js/core/atm.js?");

/***/ }),

/***/ "./js/core/eventEmitter.js":
/*!*********************************!*\
  !*** ./js/core/eventEmitter.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function EventEmitter () {\r\n  this.eventTable = {}\r\n}\r\n\r\nEventEmitter.prototype = {\r\n  on: function (event, callback) {\r\n    if (!this.eventTable.hasOwnProperty(event)) {\r\n      this.eventTable[event] = []\r\n    }\r\n    this.eventTable[event].push(callback)\r\n  },\r\n\r\n  emit: function (event, ...rest) {\r\n    if (event in this.eventTable) {\r\n      this.eventTable[event].forEach(function (callback) {\r\n        callback.apply(null, rest)\r\n      })\r\n    }\r\n  }\r\n}\r\n\r\nmodule.exports = EventEmitter\r\n\n\n//# sourceURL=webpack:///./js/core/eventEmitter.js?");

/***/ }),

/***/ "./js/core/queue.js":
/*!**************************!*\
  !*** ./js/core/queue.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var EventEmitter = __webpack_require__(/*! ./eventEmitter */ \"./js/core/eventEmitter.js\")\r\n\r\nfunction Queue () {\r\n  EventEmitter.call(this)\r\n  this.count = 0\r\n}\r\n\r\nQueue.prototype = Object.create(EventEmitter.prototype)\r\nQueue.prototype.constructor = Queue\r\n\r\nQueue.prototype.add = function () {\r\n  this.count++\r\n  this.emit('Queue_Add')\r\n}\r\n\r\nQueue.prototype.remove = function () {\r\n  this.count--\r\n  this.emit('Queue_Remove')\r\n}\r\n\r\nmodule.exports = Queue\r\n\n\n//# sourceURL=webpack:///./js/core/queue.js?");

/***/ }),

/***/ "./js/core/utils.js":
/*!**************************!*\
  !*** ./js/core/utils.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function randomInteger (min, max) {\r\n  var rand = min + Math.random() * (max + 1 - min)\r\n  return Math.floor(rand)\r\n}\r\nmodule.exports.randomInteger = randomInteger\r\n\n\n//# sourceURL=webpack:///./js/core/utils.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var utils = __webpack_require__(/*! ./core/utils */ \"./js/core/utils.js\")\r\nvar queueGeneratorTimer = null\r\nvar queueOverflowTimer = null\r\n\r\nvar QueueComponent = __webpack_require__(/*! ./components/queue */ \"./js/components/queue.js\")\r\nvar AtmComponent = __webpack_require__(/*! ./components/atm */ \"./js/components/atm.js\")\r\nvar AddComponent = __webpack_require__(/*! ./components/add */ \"./js/components/add.js\")\r\nvar RangeComponent = __webpack_require__(/*! ./components/range */ \"./js/components/range.js\")\r\n\r\nvar leftContainer = document.querySelector('.container__left')\r\nvar rightContainer = document.querySelector('.container__right')\r\n\r\nvar queueComponent = new QueueComponent()\r\nleftContainer.appendChild(queueComponent.element)\r\n\r\nvar atmComponents = Array(3)\r\n  .fill(null)\r\n  .map(function () {\r\n    var atmComponent = new AtmComponent()\r\n    atmComponent.on('CloseComponent_Click', deleteAtm.bind(atmComponent))\r\n    atmComponent.core.on('Atm_MakeFree', findFreeAtm.bind(atmComponent))\r\n    leftContainer.appendChild(atmComponent.element)\r\n    return atmComponent\r\n  })\r\nqueueComponent.core.on('Queue_Add', findFreeAtm)\r\nqueueComponent.core.on('Queue_Add', checkQueueLength)\r\nqueueComponent.core.on('Queue_Remove', startTimer)\r\n\r\nvar addComponent = new AddComponent()\r\naddComponent.on('AddComponent_Click', addAtm)\r\nrightContainer.appendChild(addComponent.element)\r\n\r\nvar rangeComponents = Array(2)\r\n  .fill(null)\r\n  .map(function () {\r\n    var rangeComponent = new RangeComponent()\r\n    rangeComponent.on('RangeComponent_Change', changeRange.bind(null, rangeComponent))\r\n    rightContainer.appendChild(rangeComponent.element)\r\n    return rangeComponent\r\n  })\r\n\r\nqueueGenerator(rangeComponents[0].input.value * 1000, rangeComponents[1].input.value * 1000)\r\n\r\nfunction queueGenerator (min, max) {\r\n  queueGeneratorTimer = setTimeout(function () {\r\n    queueComponent.core.add()\r\n    queueGenerator(min, max)\r\n  }, utils.randomInteger(min, max))\r\n}\r\n\r\nfunction findFreeAtm () {\r\n  setTimeout(function () {\r\n    if (!atmComponents) return\r\n    var freeAtm = atmComponents.find(function (atmComponent) {\r\n      return atmComponent.core.isFree && queueComponent.core.count > 0\r\n    })\r\n    if (freeAtm) {\r\n      queueComponent.core.remove()\r\n      freeAtm.core.makeBusy()\r\n    }\r\n  }, 1000)\r\n}\r\n\r\nfunction deleteAtm (deleteAtm) {\r\n  for (var i = 0; i < atmComponents.length; i++) {\r\n    if (deleteAtm.id === atmComponents[i].id) {\r\n      atmComponents.splice(i, 1)\r\n    }\r\n  }\r\n}\r\n\r\nfunction addAtm () {\r\n  clearInterval(queueOverflowTimer)\r\n  var newAtm = new AtmComponent()\r\n  newAtm.on('CloseComponent_Click', deleteAtm)\r\n  newAtm.core.on('Atm_MakeFree', findFreeAtm)\r\n  leftContainer.appendChild(newAtm.element)\r\n  atmComponents.push(newAtm)\r\n  findFreeAtm()\r\n}\r\n\r\nfunction changeRange (range) {\r\n  var rangeMinElement, rangeMaxElement\r\n  if (Array.from(range.element.classList).indexOf('range-min') !== -1) {\r\n    rangeMinElement = range.input\r\n    rangeMaxElement = range.element.nextSibling.querySelector('input')\r\n    if (rangeMinElement.value >= rangeMaxElement.value) {\r\n      rangeMaxElement.value = parseInt(rangeMinElement.value) + 1\r\n      rangeMaxElement.previousSibling.previousSibling.innerHTML = rangeMaxElement.value\r\n    }\r\n  } else {\r\n    rangeMaxElement = range.input\r\n    rangeMinElement = range.element.previousSibling.querySelector('input')\r\n    if (rangeMaxElement.value <= rangeMinElement.value) {\r\n      rangeMinElement.value = parseInt(rangeMaxElement.value) - 1\r\n      rangeMinElement.previousSibling.previousSibling.innerHTML = rangeMinElement.value\r\n    }\r\n  }\r\n  clearInterval(queueGeneratorTimer)\r\n  queueGenerator(rangeMinElement.value * 1000, rangeMaxElement.value * 1000)\r\n}\r\n\r\nfunction checkQueueLength () {\r\n  if (queueComponent.core.count > 10) {\r\n    addAtm()\r\n  }\r\n}\r\n\r\nfunction startTimer () {\r\n  clearInterval(queueOverflowTimer)\r\n  queueOverflowTimer = setTimeout(function () {\r\n    deleteLastAtm()\r\n    startTimer()\r\n  }, 5000)\r\n}\r\n\r\nfunction deleteLastAtm () {\r\n  var index = atmComponents.length - 1\r\n  if (index < 1) return\r\n  atmComponents[index].element.remove()\r\n  atmComponents.splice(index, 1)\r\n}\r\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./sass/main.scss":
/*!************************!*\
  !*** ./sass/main.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./sass/main.scss?");

/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./js/main.js ./sass/main.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./js/main.js */\"./js/main.js\");\nmodule.exports = __webpack_require__(/*! ./sass/main.scss */\"./sass/main.scss\");\n\n\n//# sourceURL=webpack:///multi_./js/main.js_./sass/main.scss?");

/***/ })

/******/ });