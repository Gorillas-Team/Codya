const { MusicCommand } = require('../../music')

module.exports = class extends MusicCommand {
  constructor (client) {
    super(client, {
      name: 'skip',
      aliases: ['s', 'pular'],
      description: 'Pule uma música da fila.',
      usage: '<prefix>skip <index>',
      category: 'Music',
      requirements: {
        voiceChannelOnly: true,
        queueOnly: true
      }
    })
  }

  async run ({ channel, guild, member }) {
    const memberCount = member.voice.channel.members.filter(x => !x.user.bot).size
    const required = Math.ceil(memberCount / 2)

    const guildDocument = await guild.data

    if (!guild.music.queue[0].skipVotes) guild.music.queue[0].skipVotes = []

    if (guildDocument.djRole && member.roles.cache.has(guildDocument.djRole)) {
      guild.music.stop()
      return channel.sendTempMessage(this.client.getEmoji('skipped') + ' | Música pulada com sucesso.')
    }

    if (guild.music.queue[0].skipVotes.includes(member.id)) {
      return channel.sendTempMessage(this.client.getEmoji('error') + ' | Você já votou.')
    }

    guild.music.queue[0].skipVotes.push(member.id)

    if (guild.music.queue[0].skipVotes.length >= required) {
      guild.music.stop()
      return channel.sendTempMessage(this.client.getEmoji('skipped') + ' | A votação venceu! A música foi pulada com sucesso.')
    }

    const voteLength = guild.music.queue[0].skipVotes.length

    return channel.sendTempMessage(this.client.getEmoji('correct') + ' | Você votou com sucesso! ' + voteLength + '/' + required + '.')
  }
}
