const {
  CooldownManager
} = require('../../utils')
const CommandImpl = require('./command/CommandImpl')

module.exports = class Command extends CommandImpl {
  constructor (client, opts) {
    super()

    this.client = client
    this.name = opts.name
    this.aliases = opts.aliases || []
    this.category = opts.category || 'Sem categoria.'
    this.usage = opts.usage || 'Sem uso.'

    this.cooldownTime = opts.cooldownTime || 3
    this.cooldown = CooldownManager(this.cooldownTime * 1000, 'map')

    this.description = opts.description || 'Sem descrição.'
    this.dev = opts.dev || false
    this.hide = opts.hide || false
  }

  async preLoad (ctx) {
    // const user = await this.client.repositories.users.get(ctx.author.id)
    // if (!this.client.config.devs.includes(ctx.author.id) && user.blacklist) {
    //   return ctx.channel.send('Você está na blacklist.')
    // }

    if (this.cooldown.has(ctx.author.id)) {
      const now = Date.now()
      const cooldown = this.cooldown.get(ctx.author.id)

      const time = Math.round((cooldown - now) / 1000)

      return ctx.channel.send(
        `${this.client.getEmoji('error')} | Espere ${
          time === 0 ? 'alguns milissegundos' : time + ' segundo(s)'
        } para usar este comando novamente`
      )
    }

    if (
      (this.dev || this.hide) &&
      !this.client.config.devs.includes(ctx.author.id)
    ) {
      return ctx.channel.send(
        `${this.client.getEmoji(
          'bye'
        )} | Apenas os desenvolvedores podem utilizar este comando.`
      )
    }

    if (!this.client.config.devs.includes(ctx.author.id)) {
      this.cooldown.add(ctx.author.id, Date.now() + this.cooldownTime * 1000)
    }

    return this.run(ctx)
  }

  run () {}
}
