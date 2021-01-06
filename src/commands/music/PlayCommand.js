const { Command, CodyaError } = require('@Codya/structures')

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
  async run (ctx, [song]) {
    const memberState = ctx.member.voiceState
    if (!memberState.channelID) {
      throw new CodyaError('Você precisa estar em um canal de voz para executar este comando.')
    }

    const selfState = ctx.selfMember.voiceState

    if (selfState.channelID && memberState.channelID !== selfState.channelID) {
      throw new CodyaError('Você precisa estar no mesmo canal que eu.')
    }

    const bestNode = await this.client.lavalink.idealNodes[0]

    if (!bestNode) {
      throw new CodyaError('Não há nodes disponíveis.')
    }

    const player = await this.client.lavalink.join({
      node: bestNode.id,
      channel: memberState.channelID,
      guild: ctx.message.guildID
    }).catch(err => {
      this.client.logger.error(err)
      throw new CodyaError('Um erro ocorreu ao criar o player.')
    })

    player.setContext(ctx)
    ctx.guild.music = player

    const { loadType, tracks, playlistInfo: { name } } = await this.client.lavalink.fetchTracks(song, ctx.author)

    if (loadType === 'NO_MATCHES') throw new CodyaError('Nenhum resultado encontrado.')

    if (loadType === 'PLAYLIST_LOADED') {
      for (const track of tracks.slice(0, 250)) {
        if (player.queue.length >= 250) {
          throw new CodyaError('A fila está cheia.')
        }
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

    if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
      await player.play(tracks[0])

      if (!player.queue.empty) {
        return ctx
          .sendTemporaryMessage(`Adicionado na fila: \`${tracks[0].title}\``, 'music_notes')
      }
    }
  }
}

module.exports = PlayCommand
