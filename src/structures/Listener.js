module.exports = class Listener {
  constructor (options) {
    this.name = options.name
    this.once = options.once || false
  }

  listen (client) {
    try {
      client[this.once ? 'once' : 'on'](this.name, this.run)

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }

  run () {}
}
