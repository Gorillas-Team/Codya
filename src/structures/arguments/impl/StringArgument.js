const Argument = require('../Argument')

/**
 * @name StringArgument
 * @class
 * @augments Argument
 * @author Acnologla (https://github.com/Acnologla)
 */
class StringArgument extends Argument {
  /**
   * @param {StringArgumentOptions | ArgumentOptions | import('../typings/typedef').StringArgumentOptions | import('../typings/typedef).ArgumentOptions} options
   */
  constructor (options = {}) {
    super(options)
    this.full = 'full' in options ? options.full : true
    this.length = options.length || 1
    this.lengthRequired = options.lengthRequired || this.length
    this.maxLength = options.maxLength || 100
    this.isNumber = options.isNumber || false
  }

  parse (ctx, args) {
    if (args.length === 0) {
      this.missing = true
      return [false, args]
    }

    const string = []

    if (this.full) {
      this.length = args.length
      this.maxLength = args.join(' ').length
    }

    for (let i = 0; i < this.length; i++) {
      if (!args[i]) {
        this.missing = true
        continue
      }

      if ((!isNaN(args[i]) && this.isNumber) || (args[i].length < this.lengthRequired)) {
        this.invalid = true
        continue
      }

      string.push(args[i])
    }

    if (string.join(' ').length > this.maxLength) {
      this.invalid = true
      return [false, args]
    }

    args = args.slice(this.length)

    return [string.join(' ').trim(), args]
  }
}

module.exports = StringArgument
