const { GorilinkPlayer } = require('gorilink')

module.exports = class LavaPlayer extends GorilinkPlayer {
  constructor (node, options, manager) {
    super(node, options, manager)

    this.node = node
    this.manager = manager
  }

  addToQueue (track, user) {
    track.info.requester = user
    track.info.thumbnail = `https://img.youtube.com/vi/${track.info.identifier}/hqdefault.jpg`

    return this.queue.add(track)
  }
}
