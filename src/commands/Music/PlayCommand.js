const { Command } = require('../../structures')

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

    guild.music = await lavalink.join({
      guild: guild.id,
      voiceChannel: member.voice.channel.id,
      textChannel: channel
    }, { selfDeaf: true })

    guild.music.dj = author

    const { tracks, loadType, playlistInfo } = await lavalink.fetchTracks(args.join(' '))

    switch (loadType) {
      case 'NO_MATCHES': {
        channel.send(this.client.botEmojis.error + ' | Não encontrei a música.')
          .then(x => x.delete({ timeout: 5000 }))
        break
      }

      case 'PLAYLIST_LOADED': {
        for (const track of tracks) {
          track.info.requester = author
          track.info.thumbnail = `https://img.youtube.com/vi/${track.info.identifier}/hqdefault.jpg`

          if (tracks.length >= 250) return channel.send('Não posso adicionar mais que 250 músicas.')
          if (guild.music.queue.length >= 250) return channel.send('A fila está cheia.')

          guild.music.queue.add(track)
        }

        channel.send(this.client.botEmojis.musicNotes + ' | Foram adicionadas `' + tracks.length + '` músicas da playlist `' + playlistInfo.name + '`. Requisitado por: `' + author.tag + '`.')
          .then(x => x.delete({ timeout: 10000 }))

        if (!guild.music.playing) return guild.music.play()

        break
      }

      case 'SEARCH_RESULT':
      case 'TRACK_LOADED': {
        tracks[0].info.requester = author
        tracks[0].info.thumbnail = `https://img.youtube.com/vi/${tracks[0].info.identifier}/hqdefault.jpg`

        if (guild.music.queue.length >= 250) return channel.send('A fila está cheia.')

        guild.music.queue.add(tracks[0])

        if (guild.music.queue.length === 1) {
          if (!guild.music.playing) return guild.music.play()
        }

        channel.send(this.client.botEmojis.musicNotes + ' | Adicionado na fila: `' + tracks[0].info.title + '`. Requisitado por: `' + author.tag + '`')
          .then(x => x.delete({ timeout: 10000 }))

        if (!guild.music.playing) return guild.music.play()

        break
      }
    }
  }
}
