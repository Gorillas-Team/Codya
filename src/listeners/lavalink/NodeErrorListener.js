const { Listener } = require('../../structures/client')

module.exports = class NodeErrorListener extends Listener {
  constructor () {
    super({
      name: 'nodeError'
    })
  }

  async run (node, error) {
    console.error('Erro ao conectar no node ' + node.tag + ':', error)
  }
}
