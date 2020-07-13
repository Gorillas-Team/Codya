const { Listener } = require('../../structures')

module.exports = class TrackEndListener extends Listener {
  constructor () {
    super({
      name: 'trackEnd'
    })
  }

  async run (player, track) {
    player.volume(100)
    player.setEQ(Array(3).fill('').map((_, n) => ({ band: n, gain: 0 })))
  }
}
