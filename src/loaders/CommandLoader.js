const { Loader } = require('@Codya/structures')
const { FileUtils } = require('@Codya/utils')

class CommandLoader extends Loader {
  constructor (client) {
    super(client)

    this.posLoad = []
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
    FileUtils.requireDir(path, (error, Command) => {
      if (error) {
        this.client.logger.log('  > Error: ' + error.message, 'red')
      }

      const command = this.addCommand(new Command(this.client))

      if (command) this.client.logger.log(`  > (${command.category}) ${command.name} loaded.`, 'yellow')
    })

    this.posLoad.forEach(subCommand => this.addSubCommand(subCommand))
  }

  /**
   * @param {Command | import('../structures/Command.js)} command
   * @returns {Command | import('../structures/Command.js') | boolean}
   */
  addCommand (command) {
    if (command.parent) {
      this.posLoad.push(command)
      return false
    } else {
      this.client.commands.set(command.name, command)
      return command
    }
  }

  /**
   * @param {import('../structures/Command')} subCommand
   */
  addSubCommand (subCommand) {
    let parentCommand
    if (subCommand.parent) {
      parentCommand = this.client.commands.find(cmd => cmd.name === subCommand.parent)
    }

    if (!parentCommand) return

    parentCommand.subCommands.push(subCommand)
    subCommand.parent = parentCommand
    subCommand.category = parentCommand.category
  }
}

module.exports = CommandLoader
