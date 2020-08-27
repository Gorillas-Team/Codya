const { GorilinkManager } = require('gorilink')

module.exports = class CodyaManager extends GorilinkManager {
  constructor(client, nodes, options) {
    super(client, nodes, options)

    this.Player = options.Player
  }
}
