var AureliaLogging =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogger = getLogger;
exports.addAppender = addAppender;
exports.setLevel = setLevel;
exports.getLevel = getLevel;



var logLevel = exports.logLevel = {
  none: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
};

var loggers = {};
var appenders = [];
var slice = Array.prototype.slice;
var loggerConstructionKey = {};
var globalDefaultLevel = logLevel.none;

function log(logger, level, args) {
  var i = appenders.length;
  var current = void 0;

  args = slice.call(args);
  args.unshift(logger);

  while (i--) {
    current = appenders[i];
    current[level].apply(current, args);
  }
}

function debug() {
  if (this.level < 4) {
    return;
  }

  log(this, 'debug', arguments);
}

function info() {
  if (this.level < 3) {
    return;
  }

  log(this, 'info', arguments);
}

function warn() {
  if (this.level < 2) {
    return;
  }

  log(this, 'warn', arguments);
}

function error() {
  if (this.level < 1) {
    return;
  }

  log(this, 'error', arguments);
}

function connectLogger(logger) {
  logger.debug = debug;
  logger.info = info;
  logger.warn = warn;
  logger.error = error;
}

function createLogger(id) {
  var logger = new Logger(id, loggerConstructionKey);
  logger.setLevel(globalDefaultLevel);

  if (appenders.length) {
    connectLogger(logger);
  }

  return logger;
}

function getLogger(id) {
  return loggers[id] || (loggers[id] = createLogger(id));
}

function addAppender(appender) {
  appenders.push(appender);

  if (appenders.length === 1) {
    for (var key in loggers) {
      connectLogger(loggers[key]);
    }
  }
}

function setLevel(level) {
  globalDefaultLevel = level;
  for (var key in loggers) {
    loggers[key].setLevel(level);
  }
}

function getLevel() {
  return globalDefaultLevel;
}

var Logger = exports.Logger = function () {
  function Logger(id, key) {
    

    this.level = logLevel.none;

    if (key !== loggerConstructionKey) {
      throw new Error('Cannot instantiate "Logger". Use "getLogger" instead.');
    }

    this.id = id;
  }

  Logger.prototype.debug = function debug(message) {};

  Logger.prototype.info = function info(message) {};

  Logger.prototype.warn = function warn(message) {};

  Logger.prototype.error = function error(message) {};

  Logger.prototype.setLevel = function setLevel(level) {
    this.level = level;
  };

  return Logger;
}();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjEzMDExNDQ5MTcwYjIyMTM3MjIiLCJ3ZWJwYWNrOi8vLy4vfi9hdXJlbGlhLWxvZ2dpbmcvZGlzdC9jb21tb25qcy9hdXJlbGlhLWxvZ2dpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ2hFQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLEciLCJmaWxlIjoiYXVyZWxpYS1sb2dnaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjEzMDExNDQ5MTcwYjIyMTM3MjIiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmdldExvZ2dlciA9IGdldExvZ2dlcjtcbmV4cG9ydHMuYWRkQXBwZW5kZXIgPSBhZGRBcHBlbmRlcjtcbmV4cG9ydHMuc2V0TGV2ZWwgPSBzZXRMZXZlbDtcbmV4cG9ydHMuZ2V0TGV2ZWwgPSBnZXRMZXZlbDtcblxuXG5cbnZhciBsb2dMZXZlbCA9IGV4cG9ydHMubG9nTGV2ZWwgPSB7XG4gIG5vbmU6IDAsXG4gIGVycm9yOiAxLFxuICB3YXJuOiAyLFxuICBpbmZvOiAzLFxuICBkZWJ1ZzogNFxufTtcblxudmFyIGxvZ2dlcnMgPSB7fTtcbnZhciBhcHBlbmRlcnMgPSBbXTtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBsb2dnZXJDb25zdHJ1Y3Rpb25LZXkgPSB7fTtcbnZhciBnbG9iYWxEZWZhdWx0TGV2ZWwgPSBsb2dMZXZlbC5ub25lO1xuXG5mdW5jdGlvbiBsb2cobG9nZ2VyLCBsZXZlbCwgYXJncykge1xuICB2YXIgaSA9IGFwcGVuZGVycy5sZW5ndGg7XG4gIHZhciBjdXJyZW50ID0gdm9pZCAwO1xuXG4gIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3MpO1xuICBhcmdzLnVuc2hpZnQobG9nZ2VyKTtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgY3VycmVudCA9IGFwcGVuZGVyc1tpXTtcbiAgICBjdXJyZW50W2xldmVsXS5hcHBseShjdXJyZW50LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWJ1ZygpIHtcbiAgaWYgKHRoaXMubGV2ZWwgPCA0KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbG9nKHRoaXMsICdkZWJ1ZycsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIGluZm8oKSB7XG4gIGlmICh0aGlzLmxldmVsIDwgMykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZyh0aGlzLCAnaW5mbycsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIHdhcm4oKSB7XG4gIGlmICh0aGlzLmxldmVsIDwgMikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZyh0aGlzLCAnd2FybicsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIGVycm9yKCkge1xuICBpZiAodGhpcy5sZXZlbCA8IDEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2codGhpcywgJ2Vycm9yJywgYXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gY29ubmVjdExvZ2dlcihsb2dnZXIpIHtcbiAgbG9nZ2VyLmRlYnVnID0gZGVidWc7XG4gIGxvZ2dlci5pbmZvID0gaW5mbztcbiAgbG9nZ2VyLndhcm4gPSB3YXJuO1xuICBsb2dnZXIuZXJyb3IgPSBlcnJvcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTG9nZ2VyKGlkKSB7XG4gIHZhciBsb2dnZXIgPSBuZXcgTG9nZ2VyKGlkLCBsb2dnZXJDb25zdHJ1Y3Rpb25LZXkpO1xuICBsb2dnZXIuc2V0TGV2ZWwoZ2xvYmFsRGVmYXVsdExldmVsKTtcblxuICBpZiAoYXBwZW5kZXJzLmxlbmd0aCkge1xuICAgIGNvbm5lY3RMb2dnZXIobG9nZ2VyKTtcbiAgfVxuXG4gIHJldHVybiBsb2dnZXI7XG59XG5cbmZ1bmN0aW9uIGdldExvZ2dlcihpZCkge1xuICByZXR1cm4gbG9nZ2Vyc1tpZF0gfHwgKGxvZ2dlcnNbaWRdID0gY3JlYXRlTG9nZ2VyKGlkKSk7XG59XG5cbmZ1bmN0aW9uIGFkZEFwcGVuZGVyKGFwcGVuZGVyKSB7XG4gIGFwcGVuZGVycy5wdXNoKGFwcGVuZGVyKTtcblxuICBpZiAoYXBwZW5kZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgIGZvciAodmFyIGtleSBpbiBsb2dnZXJzKSB7XG4gICAgICBjb25uZWN0TG9nZ2VyKGxvZ2dlcnNba2V5XSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldExldmVsKGxldmVsKSB7XG4gIGdsb2JhbERlZmF1bHRMZXZlbCA9IGxldmVsO1xuICBmb3IgKHZhciBrZXkgaW4gbG9nZ2Vycykge1xuICAgIGxvZ2dlcnNba2V5XS5zZXRMZXZlbChsZXZlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TGV2ZWwoKSB7XG4gIHJldHVybiBnbG9iYWxEZWZhdWx0TGV2ZWw7XG59XG5cbnZhciBMb2dnZXIgPSBleHBvcnRzLkxvZ2dlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTG9nZ2VyKGlkLCBrZXkpIHtcbiAgICBcblxuICAgIHRoaXMubGV2ZWwgPSBsb2dMZXZlbC5ub25lO1xuXG4gICAgaWYgKGtleSAhPT0gbG9nZ2VyQ29uc3RydWN0aW9uS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBcIkxvZ2dlclwiLiBVc2UgXCJnZXRMb2dnZXJcIiBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIHRoaXMuaWQgPSBpZDtcbiAgfVxuXG4gIExvZ2dlci5wcm90b3R5cGUuZGVidWcgPSBmdW5jdGlvbiBkZWJ1ZyhtZXNzYWdlKSB7fTtcblxuICBMb2dnZXIucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiBpbmZvKG1lc3NhZ2UpIHt9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUud2FybiA9IGZ1bmN0aW9uIHdhcm4obWVzc2FnZSkge307XG5cbiAgTG9nZ2VyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UpIHt9O1xuXG4gIExvZ2dlci5wcm90b3R5cGUuc2V0TGV2ZWwgPSBmdW5jdGlvbiBzZXRMZXZlbChsZXZlbCkge1xuICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgfTtcblxuICByZXR1cm4gTG9nZ2VyO1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9hdXJlbGlhLWxvZ2dpbmcvZGlzdC9jb21tb25qcy9hdXJlbGlhLWxvZ2dpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==