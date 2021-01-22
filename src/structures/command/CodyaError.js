class CodyaError extends Error {
  /**
   * @param {string} message
   * @param {boolean} embed
   */
  constructor (message, embed) {
    super(message, embed)
    this.message = message
    this.embed = embed || false
  }
}

module.exports = CodyaError
