const { GorilinkManager } = require('gorilink')
const { CodyaPlayer } = require('./')

module.exports = class CodyaManager extends GorilinkManager {
  constructor (client, nodes, options) {
    super(client, nodes, options)

    this.Player = CodyaPlayer
  }
}
