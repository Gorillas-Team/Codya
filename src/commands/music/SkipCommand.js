const { Command } = require('@Kong/structures')
const { KongError } = require('@Kong/structures/command')

class SkipCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'skip'
    })
  }

  async run (ctx) {
    if (!ctx.guild.music) throw new KongError('n tem player')

    await ctx.guild.music.stop()
    ctx.sendMessage('skip?')
  }
}

module.exports = SkipCommand
