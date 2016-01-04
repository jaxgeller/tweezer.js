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

/***/ }
/******/ ]);