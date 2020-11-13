/**
 * @name Argument
 * @class
 * @abstract
 */
class Argument {
  /**
   * @param {ArgumentOptions | import('./typings/typedef').ArgumentOptions} options
   */
  constructor (options = {}) {
    this.required = options.required || false
    this.missing = options.missing || false
    this.invalid = options.invalid || false
    this.messages = options.messages || {
      invalid: 'Argumento inválido.',
      missing: 'Um argumento está faltando.'
    }
  }

  parse () {
    throw new Error('Parse method don\'t implemented.')
  }
}

module.exports = Argument
