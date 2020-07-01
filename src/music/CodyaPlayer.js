const { GorilinkPlayer } = require('gorilink')

module.exports = class CodyaPlayer extends GorilinkPlayer {
  constructor (node, options, manager) {
    super(node, options, manager)

    this.node = node
    this.manager = manager

    this.dj = options.dj
  }

  addToQueue (track, user) {
    track.info.requester = user
    track.info.thumbnail = `https://img.youtube.com/vi/${track.info.identifier}/hqdefault.jpg`

    return this.queue.add(track)
  }
}
