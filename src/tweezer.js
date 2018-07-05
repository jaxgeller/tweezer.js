
class Tweezer {
  constructor (opts = {}) {
    this.duration = opts.duration || 1000
    this.ease = opts.easing || this._defaultEase
    this.multi = Boolean(opts.starts)
    this.starts = opts.starts || [opts.start]
    this.ends = opts.ends || [opts.end]
    const greatestDelta = this.starts.reduce((greatestDelta, start, i) => Math.max(greatestDelta, Math.abs(this.ends[i] - start)), 0)
    this.start = 0
    this.end = greatestDelta
    this.decimal = opts.decimal || false

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

  emit (name, val) {
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
      const nexts = this.ends.map((end, i) => {
        const start = this.starts[i]
        const progress = (this.next - this.start) / (this.end - this.start)
        let next = ((end - start) * progress) + start
        if (!this.decimal) {
          next = Math.round(next)
        }
        return next
      })
      if (this.multi) {
        this.emit('tick', nexts)
      } else {
        this.emit('tick', nexts[0])
      }
      this.frame = window.requestAnimationFrame(this._tick.bind(this))
    } else {
      if (this.multi) {
        this.emit('tick', this.ends)
      } else {
        this.emit('tick', this.ends[0])
      }
      this.emit('done', null)
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

export default Tweezer
