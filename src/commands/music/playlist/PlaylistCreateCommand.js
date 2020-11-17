const { Command, CommandUtils: { CodyaError } } = require('@Codya/structures')

class PlaylistCreateCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'create',
      parent: 'playlist',
      args: [{
        type: 'string',
        options: {
          required: true,
          messages: {
            missing: 'Você precisa informar o nome de sua playlist.'
          }
        }
      }]
    })
  }

  async run (ctx, [name]) {
    const { users } = this.client.controllers

    if (await users.hasPlaylistWithSameName(ctx.author, name)) {
      throw new CodyaError('Você já possui uma playlist com este nome.')
    }

    const playlist = await users.createPlaylist(ctx.author, name)

    return ctx.sendMessage(
      `A playlist \`${playlist.get().name}\` foi criada com sucesso!`,
      'dancing'
    )
  }
}

module.exports = PlaylistCreateCommand
