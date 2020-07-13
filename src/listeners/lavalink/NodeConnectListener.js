const { Listener } = require('../../structures')

module.exports = class NodeConnectListener extends Listener {
  constructor () {
    super({
      name: 'nodeConnect'
    })
  }

  async run (node) {
    console.log('Node: ' + node.tag + ' conectado com sucesso.')
  }
}
