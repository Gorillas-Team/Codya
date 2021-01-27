class Listener {
  /**
   * @param {import('./typings/typedef').ListenerOptions} options
   * @param {import('../Kong')} client
   */
  constructor (options, client) {
    this.name = options.name
    this.once = options.once || false

    this.client = client
  }

  listen () {
    try {
      this.client[this.once ? 'once' : 'on'](this.name, (...param) => this.run(...param))

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }

  run () {}
}

module.exports = Listener
