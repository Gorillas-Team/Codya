const { Command } = require('@Codya/structures')

class PingCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'ping'
    })
  }

  async run (ctx, args) {
    const ping = ctx.guild.shard.latency
    await ctx.channel.createMessage(
      `${this.client.getEmoji('satellite')} | Pong! \`${ping}ms\`!`
    )
  }
}

module.exports = PingCommand
