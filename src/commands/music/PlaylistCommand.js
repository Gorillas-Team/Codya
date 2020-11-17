const { Command } = require('@Codya/structures')

class PlaylistCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'playlist',
      aliases: ['pl']
    })
  }

  /**
   *
   * @param {import('../../structures/command/CommandContext')} ctx
   */
  async run (ctx) {
    ctx.sendEmbed({
      embed: {
        title: 'fodase'
      }
    })
  }
}

module.exports = PlaylistCommand
