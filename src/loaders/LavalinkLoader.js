const { Loader } = require('../structures/client')

module.exports = class LavalinkLoader extends Loader {
  constructor (client) {
    super(client)
    this.success = 0
    this.failed = 0

    this.critical = true
  }

  load () {
    return this
  }

  initLavalink (dir = 'src/listeners/lavalink') {
    /*
    this.log('Carregando eventos', 'lavalink')
    return FileUtils.requireDir({ dir }, (error, Listener) => {
      if (error) {
        this.logError('    Erro: ' + error.message)
        return this.failed++
      }

      const listener = new Listener()

      listener.listen(this.client)
      console.info('|    [' + listener.name + '] carregado')
      this.success++
    })
    */
  }
}
