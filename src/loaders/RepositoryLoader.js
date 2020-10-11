const { Loader } = require('../structures/client')
const { FileUtils } = require('../utils')

module.exports = class CommandLoader extends Loader {
  constructor (client) {
    super(client)
    this.success = 0
    this.failed = 0
    this.critical = true
  }

  load () {
    try {
      this.initRepositories()
      this.log(
        'Todos carregados com sucesso.',
        'repositories'
      )
      return true
    } catch (err) {
      this.logError(err.stack, 'commands')
    }
    return false
  }

  initRepositories (dir = 'src/repositories/impl') {
    this.log('Carregando repositórios', 'repositories')
    return FileUtils.requireDir({ dir }, (error, Repository) => {
      if (error) {
        this.logError('    [ERRO] Erro: ' + error.message)
        return this.failed++
      }

      const repository = new Repository(this.client)
      if (!this.client.repositories[repository.name]) this.client.repositories[repository.name] = repository
      repository.load()
      console.info('|    [' + repository.name + '] carregado.')
    })
  }
}
