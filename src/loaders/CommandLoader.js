const { Loader } = require('@Codya/structures')
const { FileUtils } = require('@Codya/utils')

class CommandLoader extends Loader {
  constructor (client) {
    super(client)

    this.critical = true
  }

  load () {
    this.client.logger.createGroup('[COMMANDS]')
    this.client.logger.log('| Loading commands...')
    this.loadCommands()
    this.client.logger.log('| All loaded with successfully!')
    this.client.logger.closeGroup()

    return this
  }

  loadCommands (path = 'src/commands') {
    return FileUtils.requireDir(path, (error, Command) => {
      if (error) {
        this.client.logger.log('  > Error: ' + error.message, 'red')
      }

      const command = new Command(this.client)

      this.client.commands.set(command.name, command)
      this.client.logger.log(`  > ${command.name} loaded.`, 'yellow')
    })
  }
}

module.exports = CommandLoader
