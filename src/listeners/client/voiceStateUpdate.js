/* eslint-disable no-unused-vars */

module.exports = {
  name: 'voiceStateUpdate',
  async run (oldMember, newMember) {
    const guild = this.guilds.cache.get(oldMember.guild.id)
    if (guild.me.voice.channel &&
      guild.me.voice.channel.members.size < 2
    ) {
      guild.music.textChannel.send(this.botEmojis.sleeping + ' | Saindo do canal por inatividade.')
      await this.lavalink.leave(oldMember.guild.id)
    }
  }
}
