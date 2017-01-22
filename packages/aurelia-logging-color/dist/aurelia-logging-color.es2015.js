(function (exports) {
'use strict';

var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {};

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

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
function nextTick(fun) {
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
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform$1 = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}
function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform$1,
  release: release,
  config: config,
  uptime: uptime
};

function release$1 () {
  if (typeof global$1.navigator !== 'undefined') {
    return global$1.navigator.appVersion;
  }
  return '';
}

const platform$$1 = typeof process !== 'undefined' ? process.platform : undefined;
const majorVersion = parseInt(release$1().split('.')[0], 10);
// use `module['e' + 'xports']` to avoid triggering failure in webpack during consumption.
const isNode = typeof module !== 'undefined' && module['e' + 'xports'];
const isWindow = platform$$1 ? /^win/.test(platform$$1) : false;
function getSupportedColorMode() {
    // Just assume Windows 10 Insider with 16m color support has `majorVersion > 6`.
    // Will fix to the correct version when issue appears.
    return (isNode && (!isWindow || majorVersion <= 6)) ? 'ANSI' : 'ANSI16M';
}

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
        result.push(...createColors(from, to, n, alpha));
    }
    return result;
}

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

const rainbow = [
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

class Ansi16mBrush {
    constructor(option = {}) {
        this.count = 0;
        this.map = {};
        this.option = {
            maxColor: option.maxColor || 20,
            coloringText: option.coloringText || false
        };
        // For background color, the light green make it hard to read text.
        // Dim green a bit to make it more readable.
        const colormap = this.option.coloringText ? rainbow : rainbow.map(m => {
            return {
                index: m.index,
                rgb: [m.rgb[0], m.rgb[1] * 0.7, m.rgb[2]]
            };
        });
        this.colors = createColorsFromMap(colormap, option.maxColor || 20);
        this.color = this.option.coloringText ? this.colorAnsi16m : this.getAnsi16mBackgroundString;
    }
    getRgb(text) {
        // It is ok to overlep color.
        // Not trying to be too smart about it.
        return this.map[text] = this.map[text] || this.colors[this.count++ % this.option.maxColor];
    }
    colorAnsi16m(id, ...rest) {
        const rgb = this.getRgb(id);
        return [this.wrapAnsi16m(id, rgb), ...rest];
    }
    getAnsi16mBackgroundString(id, ...rest) {
        const rgb = this.getRgb(id);
        return [this.wrapAnsi16m(` ${id} `, rgb, 10), ...rest];
    }
    wrapAnsi16m(id, rgb, offset = 0) {
        return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m` + id + `\u001B[${39 + offset}m`;
    }
}

class AnsiBrush {
    constructor(option = {}) {
        this.count = 0;
        this.map = {};
        this.codes = calculatedCodes = calculatedCodes || createColorCodes();
        this.option = {
            maxColor: option.maxColor || this.codes.length,
            coloringText: option.coloringText || false
        };
    }
    color(id, ...rest) {
        const codes = this.getCodes(id);
        return [this.wrapAnsi(id, codes), ...rest];
    }
    getCodes(text) {
        return this.map[text] = this.map[text] || this.codes[this.count++ % this.option.maxColor];
    }
    wrapAnsi(id, codes) {
        const code = codes.join(';');
        if (codes.some(x => x > 40)) {
            // Pad id when there is a background color in use.
            id = ` ${id} `;
        }
        return `\u001B[${code}m${id}\u001B[0m`;
    }
}
// Bright, dim, underscore
// const styles = [1, 2, 4]
// const foregroundColors = [31, 32, 33, 34, 35, 36]
const backgroundColors = [41, 42, 43, 44, 45, 46];
let calculatedCodes;
function createColorCodes() {
    let baseCodes = backgroundColors.map(x => [x]);
    baseCodes.push(...backgroundColors.map(x => [x, 31]));
    baseCodes.push(...backgroundColors.map(x => [x, 32]));
    baseCodes.push(...backgroundColors.map(x => [x, 33]));
    baseCodes.push(...backgroundColors.map(x => [x, 34]));
    baseCodes.push(...backgroundColors.map(x => [x, 35]));
    baseCodes.push(...backgroundColors.map(x => [x, 36]));
    baseCodes = baseCodes.filter(x => x.length === 1 || x[0] !== x[1] + 10);
    const brighten = baseCodes.map(x => [...x, 1]);
    const dimmed = baseCodes.map(x => [...x, 2]);
    const underscored = baseCodes.map(x => [...x, 4]);
    return [...baseCodes, ...brighten, ...dimmed, ...underscored];
}

class CSSBrush {
    constructor(option = {}) {
        this.count = 0;
        this.map = {};
        this.option = {
            maxColor: option.maxColor || 20,
            coloringText: option.coloringText || false
        };
        this.colors = createColorsFromMap(rainbow, option.maxColor || 20);
    }
    color(id, ...rest) {
        // TODO style (italic, bold, underscore) rotation
        const rgb = this.getRgb(id);
        const background = rgbHex(rgb);
        const border = rgbHex(rgb.map(x => Math.max(0, x - 32)));
        const color = rgb.every(x => x < 220) ? '#ffffff' : '#000000';
        return [`%c ${id} `, `padding: 2px; margin: 2px; line-height: 1.8em;background: ${background};bother: 1px solid ${border};color: ${color};`, ...rest];
    }
    getRgb(text) {
        // It is ok to overlep color.
        // Not trying to be too smart about it.
        return this.map[text] = this.map[text] || this.colors[this.count++ % this.option.maxColor];
    }
}

function createBrush(option = {}) {
    const colorMode = option.colorMode || getSupportedColorMode();
    let brush;
    switch (colorMode) {
        case 'CSS':
            brush = new CSSBrush(option);
            break;
        case 'ANSI':
            brush = new AnsiBrush(option);
            break;
        case 'ANSI16M':
            brush = new Ansi16mBrush(option);
            break;
        default:
        case 'NONE':
            brush = new PlainBrush();
            break;
    }
    return brush;
}
class PlainBrush {
    color(id, ...rest) {
        return [id, ...rest];
    }
}

/**
 * A colored console log.
 * Color only apply to Chrome, Firefox, and NodeJS.
 * Other will behave like `ConsoleAppender`
 */
class ColorAppender {
    constructor(option) {
        this.brush = createBrush(option);
    }
    error(logger, ...rest) {
        console.error.apply(console, this.brush.color(logger.id, ...rest));
    }
    warn(logger, ...rest) {
        console.warn.apply(console, this.brush.color(logger.id, ...rest));
    }
    info(logger, ...rest) {
        console.info.apply(console, this.brush.color(logger.id, ...rest));
    }
    debug(logger, ...rest) {
        (console.debug || console.log).apply(console, this.brush.color(logger.id, ...rest));
    }
}

exports.ColorAppender = ColorAppender;

}((this.AureliaLoggingColor = this.AureliaLoggingColor || {})));
//# sourceMappingURL=aurelia-logging-color.es2015.js.map
