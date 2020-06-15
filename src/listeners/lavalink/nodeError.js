module.exports = {
  name: 'nodeError',
  async run ({ node, error }) {
    console.error('Erro ao conectar no node ' + node.tag + ':', error)
  }
}
