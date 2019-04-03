
export class MultiTweener {
  constructor (opts = {}) {
    if (opts.starts.length !== opts.ends.length) {
      throw new Error('Starts and ends arrays must have equal length')
    }
    this.starts = opts.starts
    this.ends = opts.ends
    const greatestDelta = this.starts.reduce((greatestDelta, start, i) => Math.max(greatestDelta, Math.abs(this.ends[i] - start)), 0)
    this.start = 0
    this.end = greatestDelta
    this.decimal = opts.decimal
  }

  getIntermediateValue (tick) {
    return this.ends.map((end, i) => {
      const start = this.starts[i]
      const progress = (tick - this.start) / (this.end - this.start)
      let next = ((end - start) * progress) + start
      if (!this.decimal) {
        next = Math.round(next)
      }
      return next
    })
  }

  getFinalValue () {
    return this.ends
  }
}
