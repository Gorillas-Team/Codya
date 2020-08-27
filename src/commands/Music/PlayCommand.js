const { MusicCommand } = require('../../music')

module.exports = class extends MusicCommand {
  constructor(client) {
    super(client, {
      name: 'play',
      aliases: ['tocar', 'p'],
      usage: '<prefix>play <args>',
      description: 'Ouça músicas em algum canal de voz.',
      category: 'Music',
      requirements: { voiceChannelOnly: true }
    })
  }

  async run({ channel, args, lavalink, member, guild, author }) {
    if (!args.join(' ')) {
      return channel.sendTempMessage(
        this.client.getEmoji('error') +
          ' | Você precisa informar um nome ou um link de uma música.'
      )
    }

    const player = await lavalink.join(
      {
        guild,
        voiceChannel: member.voice.channel,
        textChannel: channel
      },
      { selfDeaf: true }
    )

    const { tracks, loadType, playlistInfo } = await lavalink.fetchTracks(
      args.join(' ')
    )

    switch (loadType) {
      case 'NO_MATCHES': {
        channel.sendTempMessage(
          this.client.getEmoji('error') + ' | Não encontrei a música.',
          5000
        )
        break
      }

      case 'PLAYLIST_LOADED': {
        for (const track of tracks.slice(0, 250)) {
          if (player.queue.length >= 250)
            return channel.sendTempMessage('A fila está cheia.')

          player.addToQueue(track, author)
        }

        const trackQuantity =
          tracks.length > 250
            ? `Foram adicionadas \`${
                tracks.slice(0, 250).length
              }\` e descartadas \`${tracks.length - 250}\``
            : `Foram adicionadas \`${tracks.slice(0, 250).length}\``

        channel.sendTempMessage(
          `${this.client.getEmoji(
            'music_notes'
          )} | ${trackQuantity} das músicas da playlist \`${
            playlistInfo.name
          }\`. Requisitado por: \`${author.tag}\`.'`
        )
        if (!player.playing) return player.play()
        break
      }

      case 'SEARCH_RESULT':
      case 'TRACK_LOADED': {
        if (player.queue.length >= 250)
          return channel.send('A fila está cheia.')

        player.addToQueue(tracks[0], author)

        if (player.queue.length === 1) {
          if (!player.playing) return player.play()
        }

        channel.sendTempMessage(
          this.client.getEmoji('music_notes') +
            ' | Adicionado na fila: `' +
            tracks[0].info.title +
            '`. Requisitado por: `' +
            author.tag +
            '`'
        )

        if (!player.playing) return player.play()

        break
      }
    }
  }
}
