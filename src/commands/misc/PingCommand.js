const { Command } = require('@Codya/structures')

class PingCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'ping'
    })
  }

  async run (ctx, args) {
    const ping = ctx.getGuild().shard.latency
    await ctx.channel.createMessage(
      `${this.client.getEmoji('satellite')} | Pong! \`${ping}ms\`!`
    )
  }
}

module.exports = PingCommand
