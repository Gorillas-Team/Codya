module.exports = class Listener {
  constructor (options) {
    this.name = options.name
    this.once = options.once || false
  }

  run () {}
}
