const { Listener } = require('../../structures/client')

module.exports = class NodeConnectListener extends Listener {
  constructor () {
    super({
      name: 'nodeConnect'
    })
  }

  async run (node) {
    this.client.logger.info('Node: ' + node.tag + ' conectado com sucesso.')
  }
}
