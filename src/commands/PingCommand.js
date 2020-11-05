const { Command } = require('@Codya/structures')

class PingCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'ping'
    })
  }

  async run (ctx, [arg]) {
    const ping = Date.now() - ctx.message.timestamp
    await ctx.channel.createMessage(`Pong! ${ping}`)
  }
}

module.exports = PingCommand
