/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _tweezer = __webpack_require__(1);

	var _tweezer2 = _interopRequireDefault(_tweezer);

	var _ez = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var animatedHeight = document.querySelector('#animate-height');
	var animateHeightButton = document.querySelector('#animate-height-button');
	var a = new _tweezer2.default({
	  start: animatedHeight.getBoundingClientRect().height,
	  end: animatedHeight.getBoundingClientRect().height * 3
	}).on('tick', function (v) {
	  return animatedHeight.style.height = v + 'px';
	});

	animateHeightButton.onclick = function () {
	  a.begin();
	};

	var countUp = document.querySelector('#count-up');
	var countUpButton = document.querySelector('#count-up-button');
	var c = new _tweezer2.default({
	  start: 0,
	  end: 123456
	}).on('tick', function (v) {
	  return countUp.textContent = v;
	});
	countUpButton.onclick = function () {
	  c.begin();
	};

	var moveAcrossScreen = document.querySelector('#move-across-screen');
	var moveAcrossScreenButton = document.querySelector('#move-across-screen-button');
	var m = new _tweezer2.default({
	  start: moveAcrossScreen.getBoundingClientRect().left,
	  end: window.innerWidth - moveAcrossScreen.getBoundingClientRect().width,
	  easing: _ez.easeOutBounce
	}).on('tick', function (v) {
	  return moveAcrossScreen.style.transform = 'translateX(' + v + 'px)';
	});

	moveAcrossScreenButton.onclick = function () {
	  m.begin();
	};

	var jump = document.querySelector('#jump-button');
	jump.onclick = function () {
	  new _tweezer2.default({
	    start: window.scrollY,
	    end: document.body.clientHeight - window.innerHeight
	  }).on('tick', function (v) {
	    return window.scrollTo(0, v);
	  }).begin();
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Tweezer"] = factory();
		else
			root["Tweezer"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {

		'use strict';

		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var Tweezer = (function () {
		  function Tweezer() {
		    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		    _classCallCheck(this, Tweezer);

		    this.duration = opts.duration || 1000;
		    this.ease = opts.easing || this._defaultEase;
		    this.start = opts.start;
		    this.end = opts.end;

		    this.next = null;
		    this.isRunning = false;
		    this.events = {};
		    this.direction = this.start < this.end ? 'up' : 'down';
		  }

		  _createClass(Tweezer, [{
		    key: 'begin',
		    value: function begin() {
		      if (!this.isRunning && this.next !== this.end) {
		        requestAnimationFrame(this._tick.bind(this));
		      }
		    }
		  }, {
		    key: 'on',
		    value: function on(name, handler) {
		      this.events[name] = this.events[name] || [];
		      this.events[name].push(handler);
		      return this;
		    }
		  }, {
		    key: 'emit',
		    value: function emit(name, val) {
		      var _this = this;

		      var e = this.events[name];
		      e && e.forEach(function (handler) {
		        return handler.call(_this, val);
		      });
		    }
		  }, {
		    key: '_tick',
		    value: function _tick(currentTime) {
		      this.isRunning = true;

		      if (!this.timeStart) this.timeStart = currentTime;
		      this.timeElapsed = currentTime - this.timeStart;
		      this.next = Math.round(this.ease(this.timeElapsed, this.start, this.end - this.start, this.duration));
		      this.emit('tick', this.next);

		      if (this._shouldTick()) {
		        return requestAnimationFrame(this._tick.bind(this));
		      } else {
		        this.emit('done', null);
		        this.isRunning = false;
		      }
		    }
		  }, {
		    key: '_shouldTick',
		    value: function _shouldTick() {
		      return ({
		        up: this.next < this.end,
		        down: this.next > this.end
		      })[this.direction];
		    }
		  }, {
		    key: '_defaultEase',
		    value: function _defaultEase(t, b, c, d) {
		      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		      return -c / 2 * (--t * (t - 2) - 1) + b;
		    }
		  }]);

		  return Tweezer;
		})();

		exports.default = Tweezer;

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Ez = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.easeInQuad = easeInQuad;
	exports.easeOutQuad = easeOutQuad;
	exports.easeInOutQuad = easeInOutQuad;
	exports.easeInCubic = easeInCubic;
	exports.easeOutCubic = easeOutCubic;
	exports.easeInOutCubic = easeInOutCubic;
	exports.easeInQuart = easeInQuart;
	exports.easeOutQuart = easeOutQuart;
	exports.easeInOutQuart = easeInOutQuart;
	exports.easeInQuint = easeInQuint;
	exports.easeOutQuint = easeOutQuint;
	exports.easeInOutQuint = easeInOutQuint;
	exports.easeInSine = easeInSine;
	exports.easeOutSine = easeOutSine;
	exports.easeInOutSine = easeInOutSine;
	exports.easeInExpo = easeInExpo;
	exports.easeOutExpo = easeOutExpo;
	exports.easeInOutExpo = easeInOutExpo;
	exports.easeInCirc = easeInCirc;
	exports.easeOutCirc = easeOutCirc;
	exports.easeInOutCirc = easeInOutCirc;
	exports.easeInElastic = easeInElastic;
	exports.easeOutElastic = easeOutElastic;
	exports.easeInOutElastic = easeInOutElastic;
	exports.easeInBack = easeInBack;
	exports.easeOutBack = easeOutBack;
	exports.easeInOutBack = easeInOutBack;
	exports.easeInBounce = easeInBounce;
	exports.easeOutBounce = easeOutBounce;
	exports.easeInOutBounce = easeInOutBounce;

	function easeInQuad(t, b, c, d) {
	  return c * (t /= d) * t + b;
	}

	function easeOutQuad(t, b, c, d) {
	  return -c * (t /= d) * (t - 2) + b;
	}

	function easeInOutQuad(t, b, c, d) {
	  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	  return -c / 2 * (--t * (t - 2) - 1) + b;
	}

	function easeInCubic(t, b, c, d) {
	  return c * (t /= d) * t * t + b;
	}

	function easeOutCubic(t, b, c, d) {
	  return c * ((t = t / d - 1) * t * t + 1) + b;
	}

	function easeInOutCubic(t, b, c, d) {
	  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	  return c / 2 * ((t -= 2) * t * t + 2) + b;
	}

	function easeInQuart(t, b, c, d) {
	  return c * (t /= d) * t * t * t + b;
	}

	function easeOutQuart(t, b, c, d) {
	  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	}

	function easeInOutQuart(t, b, c, d) {
	  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}

	function easeInQuint(t, b, c, d) {
	  return c * (t /= d) * t * t * t * t + b;
	}

	function easeOutQuint(t, b, c, d) {
	  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}

	function easeInOutQuint(t, b, c, d) {
	  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	  return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}

	function easeInSine(t, b, c, d) {
	  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	}

	function easeOutSine(t, b, c, d) {
	  return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}

	function easeInOutSine(t, b, c, d) {
	  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}

	function easeInExpo(t, b, c, d) {
	  return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	}

	function easeOutExpo(t, b, c, d) {
	  return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	}

	function easeInOutExpo(t, b, c, d) {
	  if (t == 0) return b;
	  if (t == d) return b + c;
	  if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}

	function easeInCirc(t, b, c, d) {
	  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	}

	function easeOutCirc(t, b, c, d) {
	  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	}

	function easeInOutCirc(t, b, c, d) {
	  if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}

	function easeInElastic(t, b, c, d) {
	  var s = 1.70158;var p = 0;var a = c;
	  if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;

	  if (a < Math.abs(c)) {
	    a = c;var s = p / 4;
	  } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	  return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	}

	function easeOutElastic(t, b, c, d) {
	  var s = 1.70158;var p = 0;var a = c;
	  if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;

	  if (a < Math.abs(c)) {
	    a = c;var s = p / 4;
	  } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	  return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	}

	function easeInOutElastic(t, b, c, d) {
	  var s = 1.70158;var p = 0;var a = c;
	  if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);

	  if (a < Math.abs(c)) {
	    a = c;var s = p / 4;
	  } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	  if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	  return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	}

	function easeInBack(t, b, c, d, s) {
	  if (s == undefined) s = 1.70158;
	  return c * (t /= d) * t * ((s + 1) * t - s) + b;
	}

	function easeOutBack(t, b, c, d, s) {
	  if (s == undefined) s = 1.70158;
	  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	}

	function easeInOutBack(t, b, c, d, s) {
	  if (s == undefined) s = 1.70158;
	  if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	  return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	}

	function easeInBounce(t, b, c, d) {
	  return c - easeOutBounce(d - t, 0, c, d) + b;
	}

	function easeOutBounce(t, b, c, d) {

	  if ((t /= d) < 1 / 2.75) {
	    return c * (7.5625 * t * t) + b;
	  } else if (t < 2 / 2.75) {
	    return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
	  } else if (t < 2.5 / 2.75) {
	    return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
	  } else {
	    return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
	  }
	}

	function easeInOutBounce(t, b, c, d) {
	  if (t < d / 2) return easeInBounce(t * 2, 0, c, d) * .5 + b;
	  return easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}

	},{}]},{},[1])(1)
	});

/***/ }
/******/ ]);