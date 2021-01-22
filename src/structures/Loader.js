/**
 * @name Loader
 * @class
 * @abstract
 */
class Loader {
  /**
   * @param {import('../Codya')} client
   */
  constructor (client) {
    this.client = client

    this.critical = false
  }

  /**
   * @returns {Loader}
   * @abstract
   */
  load () {}
}

module.exports = Loader
