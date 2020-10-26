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
      this.initCommands()
      this.log(
        this.failed
          ? this.success +
              ' carregaram com sucesso e ' +
              this.failed +
              ' falharam'
          : 'Todos carregados com sucesso',
        'Commands'
      )
      return true
    } catch (err) {
      this.logError(err.stack, 'commands')
    }
    return false
  }

  initCommands (dir = 'src/commands') {
    this.log('Carregando comandos', 'commands')
    return FileUtils.requireDir(dir, (error, Command) => {
      if (error) {
        this.logError('    [ERRO] Erro: ' + error.message)
        return this.failed++
      }

      const cmd = new Command(this.client)
      this.client.commands.set(cmd.name, cmd)
      console.info('|    [' + cmd.category + '] [' + cmd.name + '] carregado.')
      this.success++
    })
  }
}
