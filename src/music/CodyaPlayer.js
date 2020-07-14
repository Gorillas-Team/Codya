const { GorilinkPlayer } = require('gorilink')

module.exports = class CodyaPlayer extends GorilinkPlayer {
  constructor (node, options, manager) {
    super(node, options, manager)

    this.node = node
    this.manager = manager

    this.dj = options.dj

    this.nightcoreMode = false
    this.bassboosted = false
  }

  addToQueue (track, user) {
    track.info.requester = user
    track.info.thumbnail = `https://img.youtube.com/vi/${track.info.identifier}/hqdefault.jpg`

    return this.queue.add(track)
  }

  bassboost (mode) {
    this.bassboosted = mode

    this.bassboosted ? this.setGain(1) : this.setGain(0)
  }

  nightcore (mode) {
    this.nightcoreMode = mode

    this.nightcoreMode ? this.setTimescale({ speed: 1.1, pitch: 1.3, rate: 1.3 })
      : this.setTimescale({ speed: 1.0, pitch: 1.0, rate: 0 })
  }

  setGain (number) {
    return this.setEQ(Array(3)
      .fill('')
      .map((value, index) => ({ band: index, gain: number })))
  }

  setTimescale ({ speed, pitch, rate }) {
    return this.node.send({
      op: 'filters',
      guildId: this.guild,
      timescale: { speed, pitch, rate }
    })
  }
}
