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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createColors;
function createColors(from, to, shades, alpha) {
    const rgba = [];
    const start = [...from];
    const diff = [
        to[0] - from[0],
        to[1] - from[1],
        to[2] - from[2]
    ];
    if (alpha) {
        start.push(alpha[0]);
        diff.push(alpha[1] - alpha[0]);
    }
    for (let i = 0; i < shades; i++) {
        const inc = 1 /
            Math.max(shades - 1, 1);
        const color = [
            Math.round(start[0] + i * diff[0] * inc),
            Math.round(start[1] + i * diff[1] * inc),
            Math.round(start[2] + i * diff[2] * inc),
            alpha ? start[3] + i * diff[3] * inc : 1
        ];
        rgba.push(color);
    }
    return rgba;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createColors__ = __webpack_require__(1);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "createColors", function() { return __WEBPACK_IMPORTED_MODULE_0__createColors__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__createColorsFromMap__ = __webpack_require__(9);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "createColorsFromMap", function() { return __WEBPACK_IMPORTED_MODULE_1__createColorsFromMap__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rgbHex__ = __webpack_require__(10);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "rgbHex", function() { return __WEBPACK_IMPORTED_MODULE_2__rgbHex__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rgbaString__ = __webpack_require__(11);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "rgbaString", function() { return __WEBPACK_IMPORTED_MODULE_3__rgbaString__["a"]; });






/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var createBrush_1 = __webpack_require__(7);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var color_map_1 = __webpack_require__(2);
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var color_map_1 = __webpack_require__(2);
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
        var idStr = "%c " + id + " ";
        if (rest.length > 1 && rest[0].indexOf('%c') !== -1) {
            idStr += rest.shift();
        }
        return [idStr, "padding: 2px; margin: 2px; line-height: 1.8em;background: " + background + ";bother: 1px solid " + border + ";color: " + color + ";"].concat(rest);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var environments_1 = __webpack_require__(8);
var Ansi16mBrush_1 = __webpack_require__(4);
var AnsiBrush_1 = __webpack_require__(5);
var CSSBrush_1 = __webpack_require__(6);
function createBrush(option) {
    if (option === void 0) { option = {}; }
    var colorMode = option.colorMode || environments_1.getSupportedColorMode();
    var brush;
    switch (colorMode) {
        case 'CSS':
            brush = new CSSBrush_1.CSSBrush(option);
            break;
        case 'ANSI':
            brush = new AnsiBrush_1.AnsiBrush(option);
            break;
        case 'ANSI16M':
            brush = new Ansi16mBrush_1.Ansi16mBrush(option);
            break;
        default:
        case 'NONE':
            brush = new PlainBrush();
            break;
    }
    return brush;
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
var vendor = typeof navigator !== 'undefined' ? navigator.vendor : undefined;
// alternatively check `!!window.chrome`
var isChrome = userAgent && vendor ? /Chrome/.test(userAgent) && /Google Inc/.test(vendor) : false;
var isFirefox = userAgent ? /firefox/i.test(userAgent) : false;
function getSupportedColorMode() {
    // Not checking specific version support, but should work as
    // most people update their chrome and firefox.
    return isChrome || isFirefox ? 'CSS' : 'NONE';
}
exports.getSupportedColorMode = getSupportedColorMode;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createColors__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = createColorsFromMap;

/**
 * Create colors with specified color map.
 */
function createColorsFromMap(colormap, shades, alpha) {
    if (shades < colormap.length) {
        throw new Error(`Requires at least ${colormap.length} shades.`);
    }
    const result = [];
    const steps = [];
    for (let i = 0; i < colormap.length; i++) {
        steps.push(Math.round(colormap[i].index * shades));
    }
    for (let i = 0; i < colormap.length - 1; i++) {
        const n = steps[i + 1] - steps[i];
        const from = colormap[i].rgb;
        const to = colormap[i + 1].rgb;
        result.push(...__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__createColors__["a" /* createColors */])(from, to, n, alpha));
    }
    return result;
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rgbHex;
/**
 * Convert `RGB` to `#rgb`
 * JavaScript note: no check for array length, use it properly.
 */
function rgbHex(rgb) {
    let hex = '#';
    for (let i = 0; i < 3; i++) {
        hex += d2h(rgb[i]);
    }
    return hex;
}
function d2h(d) {
    let s = (+d).toString(16);
    return s.length < 2 ? '0' + s : s;
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rgbaString;
function rgbaString(rgba) {
    return 'rgba(' + rgba.join(',') + ')';
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(3));


/***/ })
/******/ ]);
//# sourceMappingURL=aurelia-logging-color.es5.js.map