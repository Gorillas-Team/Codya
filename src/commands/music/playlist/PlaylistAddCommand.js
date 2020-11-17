const { Command } = require('@Codya/structures')

class PlaylistAddCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'add',
      parent: 'playlist',
      args: [
        { type: 'string', options: { required: true } },
        { type: 'string', options: { required: true } }
      ]
    })
  }

  async run (ctx, [name, song]) {
    console.log(name, song)
    ctx.sendMessage(`nome: ${name} musica: ${song}`)
  }
}

module.exports = PlaylistAddCommand
