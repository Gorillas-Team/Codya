const { Listener } = require('../../structures/client')

module.exports = class TrackEndListener extends Listener {
  constructor () {
    super({
      name: 'trackEnd'
    })
  }

  async run (player, track) {
    player.volume(100)

    player.bassboost(false)
    player.nightcore(false)
  }
}
