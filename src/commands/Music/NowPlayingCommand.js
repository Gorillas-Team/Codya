const { Command } = require('../../structures')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'nowplaying',
      aliases: ['np'],
      category: 'Music',
      usage: '<prefix>np',
      description: 'Veja a música atual.'
    })

    this.conf = {
      voiceChannelOnly: true,
      queueOnly: true
    }
  }

  async run ({ channel, guild, member }) {
    const { track, state } = guild.music

    const embed = this.embed()
      .setDescription(`${this.client.botEmojis.dancing} **| Tocando agora:** [${track.info.title}](${track.info.uri})
      ${this.client.botEmojis.dvd} **| Autor:** \`${track.info.author}\`
      ${this.client.botEmojis.time} **| Duração:** \`${this.formatTime(state.position)}\` de \`${this.formatTime(track.info.length)}\`
      `)
      .setThumbnail(track.info.thumbnail)
      .setColor(member.displayHexColor)

    channel.send(embed)
  }
}
