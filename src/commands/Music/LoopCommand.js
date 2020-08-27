const { MusicCommand } = require('../../music')

module.exports = class extends MusicCommand {
  constructor(client) {
    super(client, {
      name: 'loop',
      aliases: ['repeat'],
      category: 'Music',
      usage: '<prefix>loop <all/single>',
      description: 'Determine o tipo de loop que está na queue.',
      requirements: {
        voiceChannelOnly: true,
        queueOnly: true,
        djOnly: true
      }
    })
  }

  async run({ channel, guild, args }) {
    const track = guild.music.track
    switch (args[0]) {
      case 'single': {
        guild.music.loop(guild.music.looped === 0 ? 1 : 0)
        channel.sendTempMessage(
          `${this.client.getEmoji('repeatOne')} | Loop na música \`${
            track.info.title
          }\` foi \`${
            guild.music.looped === 1 ? 'ativado' : 'desativado'
          }\` com sucesso.`,
          5000
        )
        break
      }
      case 'all': {
        guild.music.loop(guild.music.looped === 0 ? 2 : 0)
        channel.sendTempMessage(
          `${this.client.getEmoji('repeatAll')} | Loop na fila foi \`${
            guild.music.looped === 2 ? 'ativado' : 'desativado'
          }\` com sucesso.`,
          5000
        )
        break
      }
      default: {
        channel.sendTempMessage(
          this.client.getEmoji('error') +
            ' | Você não informou o tipo de loop. `<single/all>`'
        )
      }
    }
  }
}
