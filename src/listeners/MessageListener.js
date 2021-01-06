const { CommandContext, Listener } = require('@Codya/structures')
const { CommandUtils } = require('@Codya/utils')

class MessageListener extends Listener {
  constructor (client) {
    super({
      name: 'messageCreate'
    }, client)
  }

  /**
   * @param {Message | import('eris').Message} message
   */
  async run (message) {
    if (message.author.bot) return

    await this.client.controllers.users.addXpOnUser(message.author.id)

    const prefix = await CommandUtils.getPrefix(this.client, message)
    if (!message.content.toLowerCase().startsWith(prefix)) return

    const args = CommandUtils.resolveArgs(message.content, prefix)
    const cmd = args.shift().toLowerCase()
    const command = this.client.commands.find(command => command.name === cmd || command.aliases.includes(cmd))

    const context = new CommandContext(message, this.client, args, cmd, prefix)

    if (command) this.runCommand(command, context, args)
  }

  runCommand (command, context, args) {
    const deepSubCommand = (cmd, a) => {
      const [arg] = a
      const subCommand = cmd.subCommands
        ? cmd.subCommands.find(c => c.name.toLowerCase() === arg || c.aliases.includes(arg))
        : null

      // eslint-disable-next-line no-unused-vars
      return subCommand ? deepSubCommand(subCommand, args.slice(1)) : cmd
    }

    return command.validate(context, args)
  }
}

module.exports = MessageListener
