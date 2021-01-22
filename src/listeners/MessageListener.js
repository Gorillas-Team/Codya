const { CommandContext, Listener } = require('@Codya/structures')
const { CommandUtils } = require('@Codya/utils')

class MessageListener extends Listener {
  constructor (client) {
    super({
      name: 'messageCreate'
    }, client)
  }

  /**
   * @param {import('eris').Message} message
   */
  async run (message) {
    if (message.author.bot) return

    if (message.content === 'salve') {
      this.client.createMessage(message.channel.id, 'salve :call_me:')
    }

    await this.client.controllers.users.addXpOnUser(message.author.id)

    const prefix = CommandUtils.getPrefix(message)
    if (!message.content.toLowerCase().startsWith(prefix)) return

    const args = CommandUtils.resolveArgs(message.content, prefix)
    const cmd = args.shift().toLowerCase()
    const command = this.client.commands.find(command => command.name === cmd || command.aliases.includes(cmd))

    const context = new CommandContext(message, this.client, args, cmd, prefix)

    if (command) command.validate(context, args)
  }
}

module.exports = MessageListener
