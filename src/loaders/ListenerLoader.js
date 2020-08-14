const { Loader } = require('../structures')
const { FileUtils } = require('../utils')

module.exports = class ListenerLoader extends Loader {
  constructor (client) {
    super(client)
    this.success = 0
    this.failed = 0
    this.critical = true
  }

  load () {
    try {
      this.initListeners()
      this.log(this.failed ? this.success + ' carregaram com sucesso e ' + this.failed + ' falharam' : 'Todos carregados com sucesso', 'Listeners')
      return true
    } catch (err) {
      this.logError(err.message, 'listeners')
    }
    return false
  }

  initListeners (dir = 'src/listeners/client') {
    this.log('Carregando eventos', 'listeners')
    return FileUtils.requireDir({ dir }, (err, Listener) => {
      if (err) {
        this.logError('    Erro: ' + err.message)
        return this.failed++
      }

      const listener = new Listener()

      listener.listen(this.client)
      console.info('|    [' + listener.name + '] carregado')
      this.success++
    })
  }
}
