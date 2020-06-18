const xp = new Set()

module.exports = {
  name: 'message',
  async run (message) {
    if (message.author.bot || message.channel.type === 'dm') return

    const authorData = await this.database.find({ type: 'users', id: message.author.id })
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

    const prefix = getPrefix.call(this, message)
    if (!message.content.toLowerCase().startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    const command = this.commands.find(({ name, aliases }) => name === cmd || aliases.includes(cmd))

    if (command) return command._run(createCtx(message, args, prefix, cmd))
  }
}

function createCtx (ctx, args, prefix, cmd) {
  return {
    guild: ctx.guild,
    me: ctx.guild.me,
    member: ctx.member,
    author: ctx.author,
    channel: ctx.channel,
    mentions: ctx.mentions,
    client: ctx.client,
    config: ctx.client.config,
    lavalink: ctx.client.lavalink,
    message: ctx,
    prefix: prefix,
    args,
    cmd
  }
}

function getPrefix (message) {
  const content = message.content.toLowerCase()
  return this.config.prefix.find(prefix => content.startsWith(prefix))
}
