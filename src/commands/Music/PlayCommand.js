const MusicCommand = require('../../impl/MusicCommand')

module.exports = class extends MusicCommand {
  constructor (client) {
    super(client, {
      name: 'play',
      aliases: ['tocar', 'p'],
      usage: '<prefix>play <args>',
      description: 'Ouça músicas em algum canal de voz.',
      category: 'Music',
      requirements: { voiceChannelOnly: true }
    })
  }

  async run ({ t, channel, args, lavalink, member, guild, author }) {
    if (!args.join(' ')) {
      return channel.sendTempMessage(t('commands:play.noSongProvided', {
        emoji: this.client.getEmoji('error')
      }))
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
          t('commands:play.noSongFound', {
            emoji: this.client.getEmoji('error')
          }),
          5000
        )
        break
      }

      case 'PLAYLIST_LOADED': {
        for (const track of tracks.slice(0, 250)) {
          if (player.queue.length >= 250) {
            return channel.sendTempMessage(t('commands:play.queueFull', {
              emoji: this.client.getEmoji('error')
            }))
          }

          player.addToQueue(track, author)
        }

        channel.sendTempMessage(
          tracks.length > 250 ? t('commands:play.playlist.discarded', {
            emoji: this.client.getEmoji('music_notes'),
            tracksAdded: tracks.slice(0, 250).length,
            tracksDiscarded: tracks.length - 250,
            playlistName: playlistInfo.name,
            username: author.tag
          })
            : t('commands:play.playlist.all', {
              emoji: this.client.getEmoji('music_notes'),
              tracksAdded: tracks.slice(0, 250).length,
              playlistName: playlistInfo.name,
              username: author.tag
            })
        )
        if (!player.playing) return player.play()
        break
      }

      case 'SEARCH_RESULT':
      case 'TRACK_LOADED': {
        if (player.queue.length >= 250) {
          return channel.sendTempMessage(t('commands:play.queueFull', {
            emoji: this.client.getEmoji('error')
          }))
        }

        player.addToQueue(tracks[0], author)

        if (player.queue.length === 1) {
          if (!player.playing) return player.play()
        }

        channel.sendTempMessage(
          t('commands:play.songAdded', {
            emoji: this.client.getEmoji('music_notes'),
            track: tracks[0].info.title,
            username: author.tag
          })
        )

        if (!player.playing) return player.play()

        break
      }
    }
  }
}
