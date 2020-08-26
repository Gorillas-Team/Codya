const { MessageEmbed } = require('discord.js')
const { Constants: { permissions } } = require('../../utils')
const colors = {
  default: '0ED4DA',
  red: 'FF0000'
}

module.exports = class Command {
  constructor (client, opts) {
    this.client = client
    this.name = opts.name
    this.aliases = opts.aliases || []
    this.category = opts.category || 'Sem categoria.'
    this.usage = opts.usage || 'Sem uso.'
    this.permissions = opts.permissions || []

    this.cooldownTime = opts.cooldownTime || 3
    this.cooldown = new Map()

    this.description = opts.description || 'Sem descrição.'
    this.dev = opts.dev || false
    this.hide = opts.hide || false

    this.conf = {
      voiceChannelOnly: false,
      queueOnly: false,
      djOnly: false
    }
  }

  preLoad (ctx) {
    if (this.cooldown.has(ctx.author.id)) {
      const now = Date.now()
      const cooldown = this.cooldown.get(ctx.author.id)

      const time = Math.round((cooldown - now) / 1000)

      return ctx.channel.send(`Espere ${time === 0 ? 'alguns milissegundos' : time + ' segundo(s)'} para usar este comando novamente`)
    }

    if ((this.dev || this.hide) && !this.client.config.devs.includes(ctx.author.id)) {
      return ctx.channel.send('👋 | Apenas os desenvolvedores podem utilizar este comando.')
    }

    if (!this.client.config.devs.includes(ctx.author.id)) {
      this.cooldown.set(ctx.author.id, Date.now() + this.cooldownTime * 1000)
      setTimeout(() => this.cooldown.delete(ctx.author.id), this.cooldownTime * 1000)
    }

    if (this.permissions.length >= 1) {
      const neededPermissions = this.permissions.map(perm => permissions[perm])
      if (!ctx.member.hasPermission(this.permissions)) {
        return ctx.channel.send(`❌ | Você não possui a permissão de \`${neededPermissions.join(', ')}\` para executar este comando.`)
      }

      if (!ctx.guild.me.hasPermission(this.permissions)) {
        return ctx.channel.send(`❌ | Eu não possuo a permissão de \`${neededPermissions.join(', ')}\` para executar o comando \`${this.name}\`.`)
      }
    }

    if (this.conf.voiceChannelOnly && ctx.guild.music) {
      if (!ctx.member.voice.channel || ctx.member.voice.channel !== ctx.guild.music.voiceChannel) {
        return ctx.channel.send('❌ | Você precisa estar em um canal de voz ou no mesmo que eu.')
      }
    }

    if (this.conf.queueOnly) {
      if (!ctx.guild.music?.queue[0]) {
        return ctx.channel.send('❌ | Não há músicas tocando.')
      }
    }

    if (this.conf.djOnly &&
      ctx.guild.data.djRole &&
      !ctx.member.roles.cache.has(ctx.guild.data.djRole)
    ) {
      const role = ctx.guild.roles.cache.get(ctx.guild.data.djRole)
      return ctx.channel.send('❌ | Você precisa ter o cargo `' + role.name + '` para utilizar este comando.')
    }

    return this.run(ctx)
  }

  embed (opts = {}) {
    const embed = new MessageEmbed()
      .setColor(opts.color && typeof opts.color === 'string' ? colors[opts.color.toLowerCase()] : colors.default)
      .setTimestamp()

    if ('author' in opts) {
      embed.setFooter(`Executado por: ${opts.author.username}`, opts.author.displayAvatarURL({
        format: 'png', dynamic: true, size: 2048
      }))
    }

    return embed
  }

  run () {}

  resolvePrefix (prefix) {
    return prefix !== 'codya' ? /<@!?\d+>/.test(prefix) ? '@Codya ' : prefix : prefix + ' '
  }

  getUsage (prefix, cmd) {
    prefix = this.resolvePrefix(prefix)
    return this.usage.replace(/<prefix>/g, prefix).replace(/<cmd>/g, cmd)
  }

  formatTime (s) {
    const ms = s % 1000
    s = (s - ms) / 1000
    const secs = s % 60
    s = (s - secs) / 60
    const mins = s % 60
    const hrs = (s - mins) / 60

    return hrs > 0 ? (this.pad(hrs) + ':') : '' + this.pad(mins) + ':' + this.pad(secs)
  }

  pad (n, z) {
    z = z || 2
    return ('00' + n).slice(-z)
  }
}
