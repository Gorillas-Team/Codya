const { Command } = require('../../structures')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'skip',
      aliases: ['s', 'pular'],
      description: 'Pule uma música da fila.',
      usage: '<prefix>skip <index>',
      category: 'Music'
    })

    this.conf = {
      voiceChannelOnly: true,
      queueOnly: true
    }
  }

  run ({ channel, guild, member }) {
    const memberCount = member.voice.channel.members.filter(x => !x.user.bot).size
    const required = Math.ceil(memberCount / 2)

    if (!guild.music.queue[0].skipVotes) guild.music.queue[0].skipVotes = []

    if (guild.data.djRole.length > 1 && member.roles.cache.has(guild.data.djRole)) {
      guild.music.stop()
      return channel.send(this.client.botEmojis.skipped + ' | Música pulada com sucesso.')
    }

    if (guild.music.queue[0].skipVotes.includes(member.id)) {
      return channel.send(this.client.botEmojis.error + ' | Você já votou.')
    }

    guild.music.queue[0].skipVotes.push(member.id)

    if (guild.music.queue[0].skipVotes.length >= required) {
      guild.music.stop()
      return channel.send(this.client.botEmojis.skipped + ' | A votação venceu! A música foi pulada com sucesso.')
        .then(x => x.delete({ timeout: 10000 }))
    }

    const voteLength = guild.music.queue[0].skipVotes.length

    return channel.send(this.client.botEmojis.right + ' | Você votou com sucesso! ' + voteLength + '/' + required + '.')
  }
}
