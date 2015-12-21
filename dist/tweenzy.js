(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tweenzy = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tweenzy = (function () {
  function Tweenzy() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Tweenzy);

    this.duration = opts.duration || 1000;
    this.ease = opts.easing || this._defaultEase;
    this.start = opts.start;
    this.end = opts.end;

    this.isRunning = false;

    this.events = {};
  }

  _createClass(Tweenzy, [{
    key: 'begin',
    value: function begin() {
      if (!this.isRunning) requestAnimationFrame(this._tick.bind(this));
    }
  }, {
    key: 'on',
    value: function on(name, handler) {
      this.events[name] = this.events[name] || [];
      this.events[name].push(handler);
      return this;
    }
  }, {
    key: '_tick',
    value: function _tick(currentTime) {
      this.isRunning = true;

      if (!this.timeStart) this.timeStart = currentTime;
      this.timeElapsed = currentTime - this.timeStart;
      var next = Math.round(this.ease(this.timeElapsed, this.start, this.end - this.start, this.duration));

      this.events['tick'][0].call(this, next);

      if (this.end < this.start) {
        if (next > this.end) return requestAnimationFrame(this._tick.bind(this));
      } else {
        if (next < this.end) return requestAnimationFrame(this._tick.bind(this));
      }
    }
  }, {
    key: '_defaultEase',
    value: function _defaultEase(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * (--t * (t - 2) - 1) + b;
    }
  }]);

  return Tweenzy;
})();

exports.default = Tweenzy;
module.exports = exports['default'];

},{}]},{},[1])(1)
});