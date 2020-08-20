const { Listener, CommandContext } = require('../../structures')
const { getPrefix } = require('../../utils')
const xp = new Set()

module.exports = class MessageListener extends Listener {
  constructor () {
    super({
      name: 'message'
    })
  }

  async run (message) {
    if (message.author.bot || message.channel.type === 'dm') return

    const authorData = await this.database.find({ type: 'users', id: message.author.id })
    message.guild.data = await this.database.find({
      type: 'guilds',
      id: message.guild.id
    })
    message.author.data = authorData
    authorData.xp += Math.floor(Math.random() * 5) + 5

    const XP = authorData.xp
    const level = Number(authorData.level) + 1

    if (XP >= level * 60) authorData.level += 1

    if (!xp.has(message.author.id)) {
      await authorData.save()
      xp.add(message.author.id)
    }

    setTimeout(() => xp.delete(message.author.id), 60000)

    const prefix = getPrefix(message)
    if (!message.content.toLowerCase().startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    const command = this.commands.find(({ name, aliases }) => name === cmd || aliases.includes(cmd))

    const context = new CommandContext(message, args, cmd, prefix)

    if (command) return command.preLoad(context)
  }
}
