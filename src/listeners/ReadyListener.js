const { Listener } = require('@Codya/structures')
const { CodyaManager, CodyaPlayer } = require('@Codya/audio')

class ReadyListener extends Listener {
  constructor (client) {
    super({
      name: 'ready',
      once: true
    }, client)
  }

  run () {
    this.client.lavalink = new CodyaManager(this.client, this.client.config.nodes, {
      player: CodyaPlayer
    })

    this.client.lavalink.connect().then(() => {
      this.client.logger.createGroup('[LAVALINK]')
      this.client.logger.log(' > Started with successfully!')
      this.client.logger.closeGroup()
    }).catch()

    this.client.logger.log('[CODYA] Codya started with success.')
  }
}

module.exports = ReadyListener
