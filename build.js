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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var animatedHeight = document.querySelector('#animate-height');
	var shouldGrow = true;
	var isRunning = false;
	function grow(b) {
	  if (b) return animatedHeight.getBoundingClientRect().height * 3;else return animatedHeight.getBoundingClientRect().height / 3;
	}

	document.querySelector('#animate-height-button').onclick = function () {
	  if (!isRunning) {
	    new _tweezer2.default({
	      start: animatedHeight.getBoundingClientRect().height,
	      end: grow(shouldGrow)
	    }).on('tick', function (v) {
	      return animatedHeight.style.height = v + 'px';
	    }).on('done', function () {
	      shouldGrow = !shouldGrow;
	      isRunning = false;
	    }).begin();
	    isRunning = true;
	  }
	};

	var countUp = document.querySelector('#count-up');
	var shouldCount = true;
	var cIsRunning = false;
	function counter(shouldCount) {
	  if (shouldCount) return { start: 0, end: 123456 };else return { start: 123456, end: 0 };
	}
	document.querySelector('#count-up-button').onclick = function () {
	  if (!cIsRunning) {
	    new _tweezer2.default(counter(shouldCount)).on('done', function () {
	      shouldCount = !shouldCount;
	      cIsRunning = false;
	    }).on('tick', function (v) {
	      return countUp.textContent = v;
	    }).begin();
	    cIsRunning = true;
	  }
	};

	var moveAcrossScreen = document.querySelector('#move-across-screen');
	var moveAcrossScreenButton = document.querySelector('#move-across-screen-button');
	var shouldMove = true;
	var isMoving = false;
	var leftEdge = window.innerWidth - moveAcrossScreen.getBoundingClientRect().left;
	function move(shouldMove) {
	  if (shouldMove) {
	    return {
	      start: 0,
	      end: leftEdge - moveAcrossScreen.getBoundingClientRect().width
	    };
	  } else {
	    return {
	      end: 0,
	      start: parseInt(moveAcrossScreen.style.transform.split('(')[1])
	    };
	  }
	}

	moveAcrossScreenButton.onclick = function () {
	  if (!isMoving) {
	    var m = new _tweezer2.default(move(shouldMove)).on('tick', function (v) {
	      return moveAcrossScreen.style.transform = 'translateX(' + v + 'px)';
	    }).on('done', function () {
	      shouldMove = !shouldMove;console.log(shouldMove);isMoving = false;
	    });
	    m.begin();
	    isMoving = true;
	  }
	};

	var jump = document.querySelector('#jump-button');
	var footer = document.querySelector('footer');
	jump.onclick = function () {
	  new _tweezer2.default({
	    start: window.scrollY,
	    end: footer.getBoundingClientRect().top + window.scrollY
	  }).on('tick', function (v) {
	    return window.scrollTo(0, v);
	  }).begin();
	};

	document.querySelector('#jump-to-top').onclick = function () {
	  new _tweezer2.default({
	    start: window.scrollY,
	    end: 0
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

		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

		var Tweezer = function () {
		  function Tweezer() {
		    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		    _classCallCheck(this, Tweezer);

		    this.duration = opts.duration || 1000;
		    this.ease = opts.easing || this._defaultEase;
		    this.start = opts.start;
		    this.end = opts.end;

		    this.frame = null;
		    this.next = null;
		    this.isRunning = false;
		    this.events = {};
		    this.direction = this.start < this.end ? 'up' : 'down';
		  }

		  _createClass(Tweezer, [{
		    key: 'begin',
		    value: function begin() {
		      if (!this.isRunning && this.next !== this.end) {
		        this.frame = requestAnimationFrame(this._tick.bind(this));
		      }
		      return this;
		    }
		  }, {
		    key: 'stop',
		    value: function stop() {
		      cancelAnimationFrame(this.frame);
		      this.isRunning = false;
		      this.frame = null;
		      this.timeStart = null;
		      this.next = null;
		      return this;
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

		      var lastTick = this.next || this.start;

		      if (!this.timeStart) this.timeStart = currentTime;
		      this.timeElapsed = currentTime - this.timeStart;
		      this.next = Math.round(this.ease(this.timeElapsed, this.start, this.end - this.start, this.duration));

		      if (this._shouldTick(lastTick)) {
		        this.emit('tick', this.next);
		        this.frame = requestAnimationFrame(this._tick.bind(this));
		      } else {
		        this.emit('tick', this.end);
		        this.emit('done', null);
		      }
		    }
		  }, {
		    key: '_shouldTick',
		    value: function _shouldTick(lastTick) {
		      return {
		        up: this.next < this.end && lastTick <= this.next,
		        down: this.next > this.end && lastTick >= this.next
		      }[this.direction];
		    }
		  }, {
		    key: '_defaultEase',
		    value: function _defaultEase(t, b, c, d) {
		      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		      return -c / 2 * (--t * (t - 2) - 1) + b;
		    }
		  }]);

		  return Tweezer;
		}();

		exports.default = Tweezer;

	/***/ }
	/******/ ])
	});
	;

/***/ }
/******/ ]);