const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'play',
      aliases: ['tocar', 'p'],
      usage: '<prefix>play <args>',
      description: 'Ouça músicas em algum canal de voz.',
      category: 'Music'
    })
    this.conf = {
      voiceChannelOnly: true
    }
  }

  async run ({ channel, args, lavalink, member, guild, author }) {
    if (!args.join(' ')) {
      return channel.send(this.client.botEmojis.error + ' | Você precisa informar um nome ou um link de uma música.')
        .then(x => x.delete({ timeout: 10000 }))
    }

    const player = await lavalink.join({
      guild,
      voiceChannel: member.voice.channel,
      textChannel: channel
    }, { selfDeaf: true })

    const { tracks, loadType, playlistInfo } = await lavalink.fetchTracks(args.join(' '))

    switch (loadType) {
      case 'NO_MATCHES': {
        channel.send(this.client.botEmojis.error + ' | Não encontrei a música.')
          .then(x => x.delete({ timeout: 5000 }))
        break
      }

      case 'PLAYLIST_LOADED': {
        for (const track of tracks) {
          if (tracks.length >= 250) return channel.send('Não posso adicionar mais que 250 músicas.')
          if (player.queue.length >= 250) return channel.send('A fila está cheia.')

          player.addToQueue(track, author)
        }

        channel.send(this.client.botEmojis.musicNotes + ' | Foram adicionadas `' + tracks.length + '` músicas da playlist `' + playlistInfo.name + '`. Requisitado por: `' + author.tag + '`.')
          .then(x => x.delete({ timeout: 10000 }))

        if (!player.playing) return player.play()

        break
      }

      case 'SEARCH_RESULT':
      case 'TRACK_LOADED': {
        if (player.queue.length >= 250) return channel.send('A fila está cheia.')

        player.addToQueue(tracks[0], author)

        if (player.queue.length === 1) {
          if (!player.playing) return player.play()
        }

        channel.send(this.client.botEmojis.musicNotes + ' | Adicionado na fila: `' + tracks[0].info.title + '`. Requisitado por: `' + author.tag + '`')
          .then(x => x.delete({ timeout: 10000 }))

        if (!player.playing) return player.play()

        break
      }
    }
  }
}
