
export class SingleTweener {
  constructor (opts = {}) {
    this.start = opts.start
    this.end = opts.end
    this.decimal = opts.decimal
  }

  getIntermediateValue (tick) {
    if (this.decimal) {
      return tick
    } else {
      return Math.round(tick)
    }
  }

  getFinalValue () {
    return this.end
  }
}
