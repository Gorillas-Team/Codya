class CodyaError extends Error {
  constructor (message, embed) {
    super(message, embed)
    this.message = message
    this.embed = embed || false
  }
}

module.exports = CodyaError
