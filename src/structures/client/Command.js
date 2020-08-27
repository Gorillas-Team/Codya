const { Constants: { permissions }, CooldownManager } = require('../../utils')
const CommandImpl = require('./command/CommandImpl')

module.exports = class Command extends CommandImpl {
  constructor (client, opts) {
    super()

    this.client = client
    this.name = opts.name
    this.aliases = opts.aliases || []
    this.category = opts.category || 'Sem categoria.'
    this.usage = opts.usage || 'Sem uso.'
    this.permissions = opts.permissions || []

    this.cooldownTime = opts.cooldownTime || 3
    this.cooldown = CooldownManager(this.cooldownTime * 1000, 'map')

    this.description = opts.description || 'Sem descrição.'
    this.dev = opts.dev || false
    this.hide = opts.hide || false
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
      this.cooldown.add(ctx.author.id, Date.now() + this.cooldownTime * 1000)
    }

    if (this.permissions.length >= 1) {
      const neededPermissions = this.permissions.map(perm => permissions[perm])
      if (!ctx.member.hasPermission(this.permissions)) {
        return ctx.channel.send(`❌ | Você não possui a permissão de \`${neededPermissions.join(', ')}\` para executar este comando.`)
      }
    }

    return this.run(ctx)
  }

  run () {}
}
