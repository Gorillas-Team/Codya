const { Listener, CommandContext } = require('../../structures/client')
const { getPrefix } = require('../../utils')

module.exports = class MessageListener extends Listener {
  constructor () {
    super({
      name: 'message'
    })
  }

  async run (message) {
    if (message.author.bot || message.channel.type === 'dm') return

    message.guild.data = await this.database.findDocument(message.guild.id, 'guilds')

    const prefix = getPrefix(message)
    if (!message.content.toLowerCase().startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    const command = this.commands.find(({ name, aliases }) => name === cmd || aliases.includes(cmd))

    const context = new CommandContext(message, args, cmd, prefix)

    if (command) return command.preLoad(context)
  }
}
