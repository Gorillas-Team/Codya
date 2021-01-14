const Argument = require('../Argument')

class NumberArgument extends Argument {
  constructor (options = {}) {
    super(options)
    this.minimum = options.minimum || 0
    this.maximum = options.maximum || Infinity
  }

  parse (context, args) {
    if (!args[0]) this.missing = true
    if (isNaN(args[0])) this.invalid = true

    const number = Number(args[0])
    if (number < this.minimum || number > this.maximum) {
      this.invalid = true
      return
    }

    args = args.slice(1)
    return [number, args]
  }
}

module.exports = NumberArgument
