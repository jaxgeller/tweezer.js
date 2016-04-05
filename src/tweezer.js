export default class Tweezer {
  constructor (opts = {}) {
    this.duration = opts.duration || 1000
    this.ease = opts.easing || defaultEase
    this.start = opts.start
    this.end = opts.end

    this.frame = null
    this.next = null
    this.isRunning = false
    this.events = {}
    this._tick = this._tick.bind(this)
    this._shouldTick = this.start < this.end ? shouldTickUp : shouldTickDown
  }

  begin () {
    if (!this.isRunning && this.next !== this.end) {
      this.frame = requestAnimationFrame(this._tick)
    }
    return this
  }

  stop () {
    cancelAnimationFrame(this.frame)
    this.isRunning = false
    this.frame = null
    this.timeStart = null
    this.next = null
    return this
  }

  on (name, handler) {
    const e = this.events[name]
    if (e) e.push(handler)
    else this.events[name] = [handler]
    return this
  }

  emit (name, val) {
    const e = this.events[name]
    if (e) e.forEach(handler => handler.call(this, val))
    return this
  }

  _tick (currentTime) {
    this.isRunning = true
    const lastTick = this.next === null ? this.start : this.next // this.next can be 0

    if (!this.timeStart) this.timeStart = currentTime
    this.timeElapsed = currentTime - this.timeStart
    this.next = Math.round(this.ease(this.timeElapsed, this.start, this.end - this.start, this.duration))

    if (this._shouldTick(lastTick)) {
      this.emit('tick', this.next).frame = requestAnimationFrame(this._tick)
    } else {
      this.emit('tick', this.end).emit('done', null)
    }
  }
}

function defaultEase (t, b, c, d) {
  return (t /= d / 2) < 1
    ? c / 2 * t * t + b
    : -c / 2 * ((--t) * (t - 2) - 1) + b
}

function shouldTickUp (lastTick) {
  return this.next < this.end && lastTick <= this.next
}

function shouldTickDown (lastTick) {
  return this.next > this.end && lastTick >= this.next
}
