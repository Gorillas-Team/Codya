const { MusicCommand } = require('../../music')

module.exports = class extends MusicCommand {
  constructor (client) {
    super(client, {
      name: 'nowplaying',
      aliases: ['np'],
      category: 'Music',
      usage: '<prefix>np',
      description: 'Veja a música atual.',
      requirements: {
        voiceChannelOnly: true,
        queueOnly: true
      }
    })
  }

  async run ({ channel, guild }) {
    const { track, state } = guild.music

    const embed = this.embed()
      .setDescription(
        `${this.client.getEmoji('dancing')} **| Tocando agora:** [${
          track.info.title
        }](${track.info.uri})
      ${this.client.getEmoji('disco')} **| Autor:** \`${track.info.author}\`
      ${this.client.getEmoji('time')} **| Duração:** \`${this.formatTime(
          state.position
        )}\` de \`${this.formatTime(track.info.length)}\`
      `
      )
      .setThumbnail(track.info.thumbnail)
      .setColor(guild.me.displayHexColor)

    channel.send(embed)
  }
}
