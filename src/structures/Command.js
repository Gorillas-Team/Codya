const { MessageEmbed } = require('discord.js')
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

    if (this.dev && !this.client.config.devs.includes(ctx.author.id)) {
      return ctx.channel.send('👋 | Apenas os desenvolvedores podem utilizar este comando.')
    }

    if (this.hide && !this.client.config.devs.includes(ctx.author.id)) return

    if (!this.client.config.devs.includes(ctx.author.id)) {
      this.cooldown.set(ctx.author.id, Date.now() + this.cooldownTime * 1000)
      setTimeout(() => this.cooldown.delete(ctx.author.id), this.cooldownTime * 1000)
    }

    if (this.conf.voiceChannelOnly) {
      if (!ctx.member.voice.channel) {
        return ctx.channel.send('❌ | Você precisa estar em um canal de voz ou no mesmo que eu.')
      }
    }

    if (this.conf.queueOnly) {
      if (!ctx.guild.music || !ctx.guild.music.queue[0]) {
        return ctx.channel.send('❌ | Não há músicas tocando.')
      }
    }

    if (this.conf.djOnly && ctx.author.id !== ctx.guild.music.dj.id) {
      return ctx.channel.send('❌ | Apenas o DJ `' + ctx.guild.music.dj.username + '` pode utilizar este comando.')
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

  _format (obj) {
    obj = Object.entries(obj)
    const result = []
    const [[, days], [, hours]] = obj
    let n = 1
    let str = ''
    if (!days === 0) str = days > 1 ? days + ' dias' : days + ' dia'
    if (!hours) n = 2
    for (const x of obj.slice(n)) result.push(x[1] < 10 & x[1] >= 0 ? '0' + x[1] : x[1])
    return str ? str + ', ' + result.join(':') : result.join(':')
  }

  formatTime (ms) {
    if (ms < 0) return
    const diff = {}
    for (diff.days = 0; ms >= 86400000; diff.days++, ms -= 86400000);
    for (diff.hours = 0; ms >= 3600000; diff.hours++, ms -= 3600000);
    for (diff.minutes = 0; ms >= 60000; diff.minutes++, ms -= 60000);
    for (diff.seconds = 0; ms >= 1000; diff.seconds++, ms -= 1000);
    return this._format(diff)
  }
}
