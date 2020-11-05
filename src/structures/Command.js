const { CooldownManager, PermissionUtils } = require('@Codya/utils')
const { CodyaError } = require('./command/')

class Command {
  /**
   * @param {Codya | import('../Codya')} client
   * @param {CommandOptions} options
   */
  constructor (client, options) {
    this.client = client

    this.name = options.name
    this.aliases = options.aliases || []
    this.category = options.category || 'No category'
    this.usage = options.usage || 'No usage'

    this.cooldownTime = options.cooldownTime || 3
    this.cooldown = new CooldownManager(this.cooldownTime * 1000, 'map')

    this.description = options.description || 'No description'
    this.dev = options.dev || false
    this.hide = options.hide || false

    this.args = options.args || []
  }

  /**
   * @param {CommandContext | import('./command/CommandContext')} ctx
   * @returns {void}
   */
  async preLoad (ctx) {
    if (this.cooldown.has(ctx.author.id)) {
      const now = Date.now()
      const cooldown = this.cooldown.get(ctx.author.id)

      const time = Math.round((cooldown - now) / 1000)

      return ctx.sendMessage(
        `${this.client.getEmoji('error')} | Espere ${
          time === 0 ? 'alguns milissegundos' : time + ' segundo(s)'
        } para usar este comando novamente`
      )
    }

    if ((this.dev || this.hide) && !PermissionUtils.isDeveloper(ctx.member)) {
      return ctx.sendMessage(
        `${await this.client.getEmoji(
          'bye'
        )} | Apenas os desenvolvedores podem utilizar este comando.`
      )
    }

    if (!this.client.config.devs.includes(ctx.author.id)) {
      this.cooldown.add(ctx.author.id, Date.now() + this.cooldownTime * 1000)
    }

    const args = []
    for (const argument of this.args) {
      if (argument.missing) {
        return ctx.channel.createMessage(argument.messages.missing)
      }
      if (argument.invalid) {
        return ctx.channel.createMessage(argument.messages.invalid)
      }
      args.push(argument.parse(ctx.args))
    }

    try {
      this.run(ctx, args)
    } catch (err) {
      this.error(ctx.channel, err)
    }
  }

  /**
   * @param {TextableChannel | import('eris').TextableChannel} channel
   * @param {CodyaError | import('./command/CodyaError')} error
   * @returns {void}
   */
  async error (channel, error) {
    if (error instanceof CodyaError) {
      await channel.createMessage(error.message)
      return
    }

    console.error(error)
  }

  /**
   * @param {CommandContext | import('./command/CommandContext')} ctx
   */
  run (ctx) {}

  /**
   * @param {string} prefix
   * @returns {string}
   */
  resolvePrefix (prefix) {
    const isEqualsCodya = p => p === 'codya'
    const isMention = p => /<@!?\d+>/.test(p)

    return isEqualsCodya(prefix) ? (prefix + ' ') : isMention(prefix) ? ('@Codya ') : prefix
  }

  /**
   * @param {string} prefix
   * @param {string} cmd
   * @returns {string}
   */
  getUsage (prefix, cmd) {
    prefix = this.resolvePrefix(prefix)
    return this.usage.replace(/<prefix>/g, prefix).replace(/<cmd>/g, cmd)
  }
}

module.exports = Command
