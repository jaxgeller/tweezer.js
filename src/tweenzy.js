export default class Tweenzy {
  constructor(opts = {}) {
    this.duration = opts.duration || 1000;
    this.ease = opts.easing || this._defaultEase;
    this.start = opts.start;
    this.end = opts.end;

    this.events = {};
  }

  begin() {
    requestAnimationFrame(this._tick.bind(this));
  }

  on(name, handler) {
    this.events[name] = this.events[name] || [];
    this.events[name].push(handler);
    return this;
  }

  _tick(currentTime) {
    if(!this.timeStart) this.timeStart = currentTime;
    this.timeElapsed = currentTime - this.timeStart;
    let next = Math.round(this.ease(this.timeElapsed, this.start, this.end - this.start, this.duration));

    this.events['tick'][0].call(this, next)

    if (this.end < this.start) {
      if (next > this.end)
        return requestAnimationFrame(this._tick.bind(this));
    } else {
      if (next < this.end)
        return requestAnimationFrame(this._tick.bind(this));
    }
  }

  _defaultEase(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  }
}
