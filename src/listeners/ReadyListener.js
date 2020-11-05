const { Listener } = require('@Codya/structures')

class ReadyListener extends Listener {
  constructor (client) {
    super({
      name: 'ready',
      once: true
    }, client)
  }

  run () {
  }
}

module.exports = ReadyListener
