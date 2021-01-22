const { Command } = require('@Codya/structures')
const { CodyaError } = require('@Codya/structures/command')

class SkipCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'skip'
    })
  }

  async run (ctx) {
    if (!ctx.guild.music) throw new CodyaError('n tem player')

    await ctx.guild.music.stop()
    ctx.sendMessage('skip?')
  }
}

module.exports = SkipCommand
