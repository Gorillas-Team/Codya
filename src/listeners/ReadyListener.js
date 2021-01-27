const { Listener } = require('@Kong/structures')
const { KongManager, KongPlayer } = require('@Kong/audio')

class ReadyListener extends Listener {
  constructor (client) {
    super({
      name: 'ready',
      once: true
    }, client)
  }

  run () {
    this.client.lavalink = new KongManager(this.client, this.client.config.nodes, {
      player: KongPlayer
    })

    this.client.lavalink.connect().then(() => {
      this.client.logger.createGroup('[LAVALINK]')
      this.client.logger.log(' > Started with successfully!')
      this.client.logger.closeGroup()
    }).catch()

    this.client.logger.log('[Kong] Kong started with success.')
  }
}

module.exports = ReadyListener
