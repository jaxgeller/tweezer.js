import { SingleTweener } from './single-tweener'

export default class Tweezer {
  constructor (opts = {}) {
    this.duration = opts.duration || 1000
    this.ease = opts.easing || this._defaultEase
    this.tweener = opts.tweener || new SingleTweener(opts)
    this.start = this.tweener.start
    this.end = this.tweener.end

    this.frame = null
    this.next = null
    this.isRunning = false
    this.events = {}
    this.direction = this.start < this.end ? 'up' : 'down'
  }

  begin () {
    if (!this.isRunning && this.next !== this.end) {
      this.frame = window.requestAnimationFrame(this._tick.bind(this))
    }
    return this
  }

  stop () {
    window.cancelAnimationFrame(this.frame)
    this.isRunning = false
    this.frame = null
    this.timeStart = null
    this.next = null
    return this
  }

  on (name, handler) {
    this.events[name] = this.events[name] || []
    this.events[name].push(handler)
    return this
  }

  _emit (name, val) {
    let e = this.events[name]
    e && e.forEach(handler => handler.call(this, val))
  }

  _tick (currentTime) {
    this.isRunning = true

    let lastTick = this.next || this.start

    if (!this.timeStart) this.timeStart = currentTime
    this.timeElapsed = currentTime - this.timeStart
    this.next = this.ease(this.timeElapsed, this.start, this.end - this.start, this.duration)

    if (this._shouldTick(lastTick)) {
      this._emit('tick', this.tweener.getIntermediateValue(this.next))
      this.frame = window.requestAnimationFrame(this._tick.bind(this))
    } else {
      this._emit('tick', this.tweener.getFinalValue())
      this._emit('done', null)
    }
  }

  _shouldTick (lastTick) {
    return {
      up: this.next < this.end && lastTick <= this.next,
      down: this.next > this.end && lastTick >= this.next
    }[this.direction]
  }

  _defaultEase (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b
    return -c / 2 * ((--t) * (t - 2) - 1) + b
  }
}
