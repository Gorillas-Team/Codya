const Argument = require('../Argument')

/**
 * @name StringArgument
 * @class
 * @augments Argument
 * @author Acnologla
 */
class StringArgument extends Argument {
  /**
   * @param {StringArgumentOptions | ArgumentOptions | import('../typings/typedef').StringArgumentOptions | import('../typings/typedef).ArgumentOptions} options
   */
  constructor (options = {}) {
    super()
    this.full = options.full || true
    this.length = options.length || 1
    this.lengthRequired = options.lengthRequired || this.length
    this.maxLength = options.maxLength || 100
    this.isNumber = options.isNumber || false
  }

  parse (args) {
    const string = []

    if (this.full) {
      this.length = args.length
      this.maxLength = args.join(' ').length
    }

    for (const arg of args) {
      if (!arg) {
        this.missing = true
        continue
      }

      if ((!isNaN(arg) && this.isNumber) || (arg.length < this.lengthRequired)) {
        this.invalid = true
        continue
      }

      string.push(arg)
    }

    args = args.slice(this.length)

    if (string.join(' ').length > this.maxLength) this.invalid = true

    return string.join(' ').trim()
  }
}

module.exports = StringArgument
