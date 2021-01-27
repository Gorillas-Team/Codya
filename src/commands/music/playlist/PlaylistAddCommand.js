const { Command, KongError } = require('@Kong/structures')
const { LoadType } = require('lavacord')

class PlaylistAddCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'add',
      parent: 'playlist',
      args: [
        {
          type: 'string',
          options: {
            full: false,
            length: 1,
            required: true,
            messages: {
              missing: 'Você precisa informar o nome de sua playlist.'
            }
          }
        },
        {
          type: 'string',
          options: {
            full: true,
            required: true,
            messages: {
              missing: 'Você precisa informar o nome ou um link de uma música.'
            }
          }
        }
      ]
    })
  }

  async run (ctx, name, song) {
    const { playlist } = await this.client.controllers.users.findPlaylist(ctx.author, name)
    if (!playlist) throw new KongError('Essa playlist não existe.')

    if (playlist.tracks.length >= 250) throw new KongError('Sua playlist está cheia.')

    const { loadType, tracks, playlistInfo } = await this.client.lavalink.fetchTracks(song, ctx.author)

    if (loadType === LoadType.NO_MATCHES) throw new KongError('Nenhum resultado encontrado.')

    if (loadType === LoadType.PLAYLIST_LOADED) {
      const sliceTracks = tracks.slice(0, 250)
      for (const { track } of sliceTracks) {
        await this.client.controllers.users.addTrackOnPlaylist(ctx.author, playlist.name, track)
      }

      return ctx.sendMessage(`Foram adicionadas um total de \`${sliceTracks.length}\` da playlist \`${playlistInfo.name}\`.`, '')
    }

    if ([LoadType.SEARCH_RESULT, LoadType.TRACK_LOADED].some(type => loadType === type)) {
      const { track, title } = tracks[0]
      await this.client.controllers.users.addTrackOnPlaylist(ctx.author, playlist.name, track)

      return ctx.sendMessage('fodase adicioando ' + title)
    }
  }
}

module.exports = PlaylistAddCommand
