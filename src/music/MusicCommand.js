const { Command } = require('../structures/client')

module.exports = class MusicCommand extends Command {
  constructor(client, options) {
    super(client, options)

    this.requirements = options.requirements || {
      voiceChannelOnly: false,
      queueOnly: false,
      djOnly: false
    }

    this.options = options
  }

  async preLoad(ctx) {
    if (this.options.requirements.voiceChannelOnly) {
      if (!ctx.member.voice.channel) {
        return ctx.channel.send(`
          ${this.client.getEmoji(
            'error'
          )} | Você precisa estar em um canal de voz ou no mesmo que eu.
        `)
      }
    }

    if (this.options.requirements.queueOnly && !ctx.guild.music?.queue[0]) {
      return ctx.channel.send(`
        ${this.client.getEmoji('error')} | Não há músicas tocando.
      `)
    }

    const guildDocument = await ctx.guild.data

    if (
      this.options.requirements.djOnly &&
      guildDocument.djRole &&
      !ctx.member.roles.cache.has(guildDocument.djRole)
    ) {
      const role = ctx.guild.roles.cache.get(guildDocument.djRole)
      return ctx.channel.send(`
        ${this.client.getEmoji('error')} | Você precisa ter o cargo \`${
        role.name
      }\` para utilizar este comando.
      `)
    }

    return this.run(ctx)
  }
}
