export default class Tweezer {
  constructor(opts = {}) {
    this.duration = opts.duration || 1000;
    this.ease = opts.easing || this._defaultEase;
    this.start = opts.start;
    this.end = opts.end;

    this.next = null;
    this.isRunning = false;
    this.events = {};
    this.direction = this.start < this.end ? 'up' : 'down'
  }

  begin() {
    if (!this.isRunning && this.next !== this.end) {
      requestAnimationFrame(this._tick.bind(this));
    }
  }

  on(name, handler) {
    this.events[name] = this.events[name] || [];
    this.events[name].push(handler);
    return this;
  }

  emit(name, val) {
    let e = this.events[name];
    e && e.forEach(handler=> handler.call(this, val));
  }

  _tick(currentTime) {
    this.isRunning = true

    if(!this.timeStart) this.timeStart = currentTime;
    this.timeElapsed = currentTime - this.timeStart;
    this.next = Math.round(this.ease(this.timeElapsed, this.start, this.end - this.start, this.duration));
    this.emit('tick', this.next);

    if (this._shouldTick()) {
      return requestAnimationFrame(this._tick.bind(this))
    } else {
      this.emit('done', null)
      this.isRunning = false;
    }
  }

  _shouldTick() {
    return {
      up: this.next < this.end,
      down: this.next > this.end
    }[this.direction];
  }

  _defaultEase(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  }
}
