const { Command, KongError } = require('@Kong/structures')
const { LoadType } = require('lavacord')

class PlayCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'play',
      aliases: ['p'],
      category: 'music',
      args: [
        {
          type: 'string',
          options: {
            full: true,
            required: true,
            messages: { missing: 'Você precisa informar o nome ou um link de uma música.' }
          }
        }
      ]
    })
  }

  /**
   * @param {CommandContext} ctx
   * @param {string} song
   * @returns {void}
   */
  async run (ctx, song) {
    const memberState = ctx.member.voiceState
    if (!memberState.channelID) {
      throw new KongError('Você precisa estar em um canal de voz para executar este comando.')
    }

    const selfState = ctx.selfMember.voiceState

    if (selfState.channelID && memberState.channelID !== selfState.channelID) {
      throw new KongError('Você precisa estar no mesmo canal que eu.')
    }

    const bestNode = await this.client.lavalink.idealNodes[0]

    if (!bestNode) {
      throw new KongError('Não há nodes disponíveis.')
    }

    const player = await this.client.lavalink.join({
      node: bestNode.id,
      channel: memberState.channelID,
      guild: ctx.message.guildID
    }).catch(err => {
      this.client.logger.error(err)
      throw new KongError('Um erro ocorreu ao criar o player.')
    })

    player.setContext(ctx)
    ctx.guild.music = player

    if (player.queue.length >= 250) {
      throw new KongError('A fila está cheia.')
    }

    const { loadType, tracks, playlistInfo: { name } } = await this.client.lavalink.fetchTracks(song, ctx.author)

    if (loadType === LoadType.NO_MATCHES) throw new KongError('Nenhum resultado encontrado.')

    if (loadType === LoadType.PLAYLIST_LOADED) {
      for (const track of tracks.slice(0, 250)) {
        await player.play(track)
      }

      const tracksAdded = tracks.slice(0, 250).length
      const tracksDiscarded = tracks.length - 250

      return ctx.sendTemporaryMessage(
        tracks.length > 250
          ? `Foram adicionadas \`${tracksAdded}\` e foram descartadas \`${tracksDiscarded}\` das músicas da playlist \`${name}\``
          : `Foram adicionadas \`${tracksAdded}\` das músicas da playlist \`${name}\``,
        'music_notes'
      )
    }

    if ([LoadType.SEARCH_RESULT, LoadType.TRACK_LOADED].some(type => loadType === type)) {
      await player.play(tracks[0])

      if (!player.queue.empty) {
        return ctx
          .sendTemporaryMessage(`Adicionado na fila: \`${tracks[0].title}\``, 'music_notes')
      }
    }
  }
}

module.exports = PlayCommand
