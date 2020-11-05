/**
 * @name CodyaError
 * @class
 * @augments Error
 */

class CodyaError extends Error {
  /**
   * @param {string} message
   * @param {boolean} isEmbed
   */
  constructor (message, isEmbed) {
    super()

    this.message = message
    this.isEmbed = isEmbed || false
  }
}

module.exports = CodyaError
