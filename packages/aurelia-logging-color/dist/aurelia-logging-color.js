/*! aurelia-logging-color.js version: 0.4.3 generated on: Thu Jan 12 2017 */
var AureliaLoggingColor =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.rainbow = [
    { index: 0, rgb: [150, 0, 90] },
    { index: 0.125, rgb: [0, 0, 200] },
    { index: 0.25, rgb: [0, 25, 255] },
    { index: 0.375, rgb: [0, 152, 255] },
    { index: 0.5, rgb: [44, 255, 150] },
    { index: 0.625, rgb: [151, 255, 0] },
    { index: 0.75, rgb: [255, 234, 0] },
    { index: 0.875, rgb: [255, 111, 0] },
    { index: 1, rgb: [255, 0, 0] }
];


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = ColorMap;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var createBrush_1 = __webpack_require__(6);
/**
 * A colored console log.
 * Color only apply to Chrome, Firefox, and NodeJS.
 * Other will behave like `ConsoleAppender`
 */
var ColorAppender = (function () {
    function ColorAppender(option) {
        this.brush = createBrush_1.createBrush(option);
    }
    ColorAppender.prototype.error = function (logger) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        console.error.apply(console, (_a = this.brush).color.apply(_a, [logger.id].concat(rest)));
        var _a;
    };
    ColorAppender.prototype.warn = function (logger) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        console.warn.apply(console, (_a = this.brush).color.apply(_a, [logger.id].concat(rest)));
        var _a;
    };
    ColorAppender.prototype.info = function (logger) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        console.info.apply(console, (_a = this.brush).color.apply(_a, [logger.id].concat(rest)));
        var _a;
    };
    ColorAppender.prototype.debug = function (logger) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        (console.debug || console.log).apply(console, (_a = this.brush).color.apply(_a, [logger.id].concat(rest)));
        var _a;
    };
    return ColorAppender;
}());
exports.ColorAppender = ColorAppender;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var color_map_1 = __webpack_require__(1);
var colors_1 = __webpack_require__(0);
var Ansi16mBrush = (function () {
    function Ansi16mBrush(option) {
        if (option === void 0) { option = {}; }
        this.count = 0;
        this.map = {};
        this.option = {
            maxColor: option.maxColor || 20,
            coloringText: option.coloringText || false
        };
        // For background color, the light green make it hard to read text.
        // Dim green a bit to make it more readable.
        var colormap = this.option.coloringText ? colors_1.rainbow : colors_1.rainbow.map(function (m) {
            return {
                index: m.index,
                rgb: [m.rgb[0], m.rgb[1] * 0.7, m.rgb[2]]
            };
        });
        this.colors = color_map_1.createColorsFromMap(colormap, option.maxColor || 20);
        this.color = this.option.coloringText ? this.colorAnsi16m : this.getAnsi16mBackgroundString;
    }
    Ansi16mBrush.prototype.getRgb = function (text) {
        // It is ok to overlep color.
        // Not trying to be too smart about it.
        return this.map[text] = this.map[text] || this.colors[this.count++ % this.option.maxColor];
    };
    Ansi16mBrush.prototype.colorAnsi16m = function (id) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var rgb = this.getRgb(id);
        return [this.wrapAnsi16m(id, rgb)].concat(rest);
    };
    Ansi16mBrush.prototype.getAnsi16mBackgroundString = function (id) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var rgb = this.getRgb(id);
        return [this.wrapAnsi16m(" " + id + " ", rgb, 10)].concat(rest);
    };
    Ansi16mBrush.prototype.wrapAnsi16m = function (id, rgb, offset) {
        if (offset === void 0) { offset = 0; }
        return "\u001B[" + (38 + offset) + ";2;" + rgb[0] + ";" + rgb[1] + ";" + rgb[2] + "m" + id + ("\u001B[" + (39 + offset) + "m");
    };
    return Ansi16mBrush;
}());
exports.Ansi16mBrush = Ansi16mBrush;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var AnsiBrush = (function () {
    function AnsiBrush(option) {
        if (option === void 0) { option = {}; }
        this.count = 0;
        this.map = {};
        this.codes = calculatedCodes = calculatedCodes || createColorCodes();
        this.option = {
            maxColor: option.maxColor || this.codes.length,
            coloringText: option.coloringText || false
        };
    }
    AnsiBrush.prototype.color = function (id) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var codes = this.getCodes(id);
        return [this.wrapAnsi(id, codes)].concat(rest);
    };
    AnsiBrush.prototype.getCodes = function (text) {
        return this.map[text] = this.map[text] || this.codes[this.count++ % this.option.maxColor];
    };
    AnsiBrush.prototype.wrapAnsi = function (id, codes) {
        var code = codes.join(';');
        if (codes.some(function (x) { return x > 40; })) {
            // Pad id when there is a background color in use.
            id = " " + id + " ";
        }
        return "\u001B[" + code + "m" + id + "\u001B[0m";
    };
    return AnsiBrush;
}());
exports.AnsiBrush = AnsiBrush;
// Bright, dim, underscore
// const styles = [1, 2, 4]
// const foregroundColors = [31, 32, 33, 34, 35, 36]
var backgroundColors = [41, 42, 43, 44, 45, 46];
var calculatedCodes;
function createColorCodes() {
    var baseCodes = backgroundColors.map(function (x) { return [x]; });
    baseCodes.push.apply(baseCodes, backgroundColors.map(function (x) { return [x, 31]; }));
    baseCodes.push.apply(baseCodes, backgroundColors.map(function (x) { return [x, 32]; }));
    baseCodes.push.apply(baseCodes, backgroundColors.map(function (x) { return [x, 33]; }));
    baseCodes.push.apply(baseCodes, backgroundColors.map(function (x) { return [x, 34]; }));
    baseCodes.push.apply(baseCodes, backgroundColors.map(function (x) { return [x, 35]; }));
    baseCodes.push.apply(baseCodes, backgroundColors.map(function (x) { return [x, 36]; }));
    baseCodes = baseCodes.filter(function (x) { return x.length === 1 || x[0] !== x[1] + 10; });
    var brighten = baseCodes.map(function (x) { return x.concat([1]); });
    var dimmed = baseCodes.map(function (x) { return x.concat([2]); });
    var underscored = baseCodes.map(function (x) { return x.concat([4]); });
    return baseCodes.concat(brighten, dimmed, underscored);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var color_map_1 = __webpack_require__(1);
var colors_1 = __webpack_require__(0);
var CSSBrush = (function () {
    function CSSBrush(option) {
        if (option === void 0) { option = {}; }
        this.count = 0;
        this.map = {};
        this.option = {
            maxColor: option.maxColor || 20,
            coloringText: option.coloringText || false
        };
        this.colors = color_map_1.createColorsFromMap(colors_1.rainbow, option.maxColor || 20);
    }
    CSSBrush.prototype.color = function (id) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        // TODO style (italic, bold, underscore) rotation
        var rgb = this.getRgb(id);
        var background = color_map_1.rgbHex(rgb);
        var border = color_map_1.rgbHex(rgb.map(function (x) { return Math.max(0, x - 32); }));
        var color = rgb.every(function (x) { return x < 220; }) ? '#ffffff' : '#000000';
        return ["%c " + id + " ", "padding: 2px; margin: 2px; line-height: 1.8em;background: " + background + ";bother: 1px solid " + border + ";color: " + color + ";"].concat(rest);
    };
    CSSBrush.prototype.getRgb = function (text) {
        // It is ok to overlep color.
        // Not trying to be too smart about it.
        return this.map[text] = this.map[text] || this.colors[this.count++ % this.option.maxColor];
    };
    return CSSBrush;
}());
exports.CSSBrush = CSSBrush;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var environments_1 = __webpack_require__(7);
var Ansi16mBrush_1 = __webpack_require__(3);
var AnsiBrush_1 = __webpack_require__(4);
var CSSBrush_1 = __webpack_require__(5);
function createBrush(option) {
    if (option === void 0) { option = {}; }
    var css = option.css !== undefined ? option.css : environments_1.supportCSSColor;
    var ansi16m = option.ansi16m !== undefined ? option.ansi16m : environments_1.supportAnsi16mColor;
    var ansi = option.ansi !== undefined ? option.ansi : environments_1.supportAnsiColor;
    if (css) {
        return new CSSBrush_1.CSSBrush(option);
    }
    if (ansi16m) {
        return new Ansi16mBrush_1.Ansi16mBrush(option);
    }
    if (ansi) {
        return new AnsiBrush_1.AnsiBrush(option);
    }
    return new PlainBrush();
}
exports.createBrush = createBrush;
var PlainBrush = (function () {
    function PlainBrush() {
    }
    PlainBrush.prototype.color = function (id) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return [id].concat(rest);
    };
    return PlainBrush;
}());
exports.PlainBrush = PlainBrush;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var os_1 = __webpack_require__(8);
var userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
var vendor = typeof navigator !== 'undefined' ? navigator.vendor : undefined;
var platform = typeof process !== 'undefined' ? process.platform : undefined;
var majorVersion = parseInt(os_1.release().split('.')[0], 10);
// alternatively check `!!window.chrome`
var isChrome = userAgent && vendor ? /Chrome/.test(userAgent) && /Google Inc/.test(vendor) : false;
var isFirefox = userAgent ? /firefox/i.test(userAgent) : false;
var isNode = typeof module !== 'undefined' && module.exports;
var isWindow = platform ? /^win/.test(platform) : false;
// Not checking specific version support, but should work as
// most people update their chrome and firefox.
exports.supportCSSColor = isChrome || isFirefox;
exports.supportAnsiColor = isNode && (!isWindow || majorVersion <= 6);
// Just assume Windows 10 Insider with 16m support is v7.
exports.supportAnsi16mColor = isNode && (!isWindow || majorVersion > 6);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright(c) Palo Alto Networks, Inc.
 * Created by hwong on 01/06/2016
 */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(2));


/***/ })
/******/ ]);
//# sourceMappingURL=aurelia-logging-color.js.map