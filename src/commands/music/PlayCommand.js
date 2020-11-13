const { Command } = require('@Codya/structures')

class PlayCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'play',
      aliases: ['p'],
      category: 'music',
      args: [
        { type: 'string', options: { full: true, required: true } }
      ]
    })
  }

  /**
   * @param {CommandContext} ctx
   * @param {string} song
   * @returns {void}
   */
  async run (ctx, song) {
    const bestNode = await this.client.lavalink.idealNodes[0]

    const player = await this.client.lavalink.join({
      node: bestNode.id,
      channel: ctx.member.voiceState.channelID,
      guild: ctx.message.guildID
    })

    player.setTextChannel(ctx.channel)

    const { loadType, tracks, playlistInfo: { name } } = await this.client.lavalink.fetchTracks(song)

    if (loadType === 'PLAYLIST_LOADED') {
      for (const track of tracks.slice(0, 250)) {
        if (player.queue.length >= 250) {
          return ctx.channel
            .createMessage('A fila está cheia!')
        }
        await player.play(track)
      }

      const tracksAdded = tracks.slice(0, 250).length
      const tracksDiscarded = tracks.length - 250

      const emoji = this.client.getEmoji('music_notes')

      return ctx.channel
        .createMessage(
          tracks.length > 250
            ? `${emoji} | Foram adicionadas \`${tracksAdded}\` e foram descartadas \`${tracksDiscarded}\` das músicas da playlist \`${name}\``
            : `${emoji} | Foram adicionadas \`${tracksAdded}\` das músicas da playlist \`${name}\``
        )
    }

    if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
      await player.play(tracks[0])

      if (!player.queue.empty) {
        return ctx.channel
          .createMessage(`
          ${ctx.client.getEmoji('music_notes')} | Adicionado na fila: \`${tracks[0].title}\`
          `)
      }
    }
  }
}

module.exports = PlayCommand
