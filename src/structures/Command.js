const { CooldownManager, PermissionUtils } = require('@Codya/utils')
const ParameterTypes = require('./arguments/impl')

class Command {
  /**
   * @param {import('../Codya')} client
   * @param {import('./typings/typedef').CommandOptions} options
   */
  constructor (client, options) {
    this.client = client

    this.name = options.name
    this.aliases = options.aliases || []
    this.category = options.category || 'No category'
    this.usage = options.usage || 'No usage'

    this.parent = options.parent || null
    this.subCommands = [] || {}

    this.cooldownTime = options.cooldownTime || 3
    this.cooldown = new CooldownManager(this.cooldownTime * 1000, 'map')

    this.description = options.description || 'No description'
    this.dev = options.dev || false
    this.hide = options.hide || false

    this.args = options.args || []
  }

  /**
   * @param {import('./command/CommandContext')} ctx
   * @param {any[]} args
   * @returns {void}
   */
  async validate (ctx, args) {
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
        `${this.client.getEmoji(
          'bye'
        )} | Apenas os desenvolvedores podem utilizar este comando.`
      )
    }

    if (!this.client.config.devs.includes(ctx.author.id)) {
      this.cooldown.add(ctx.author.id, Date.now() + this.cooldownTime * 1000)
    }

    const [subCmd] = args
    const subCommand = this.subCommands.find(cmd => cmd.name.toLowerCase() === subCmd || cmd.aliases.includes(subCmd))
    if (subCommand) {
      return subCommand.validate(ctx, args.splice(1))
    }

    const parsedArgs = await this.handleArguments(ctx, args)

    try {
      this.run(ctx, ...parsedArgs)
    } catch (err) {
      this.error(ctx.channel, err)
    }
  }

  async handleArguments (ctx, args) {
    const thisArguments = this.args.map(arg => new ParameterTypes[arg.type](arg.options))
    const parsedArgs = []

    for (const argument of thisArguments) {
      const result = await argument.parse(ctx, args)

      if (argument.required && argument.missing) {
        ctx.channel.createMessage(argument.messages.missing)
        break
      }

      if (argument.invalid) {
        ctx.channel.createMessage(argument.messages.invalid)
        break
      }

      parsedArgs.push(result)
    }

    return parsedArgs
  }

  /**
   * @param {TextableChannel | import('eris').TextableChannel} channel
   * @param {CodyaError | import('./command/CodyaError')} error
   * @returns {Promise<import('eris').Message<import('eris').TextableChannel>> | void}
   */
  async error (channel, error) {
    if (error instanceof CodyaError) {
      return channel.createMessage(error.message)
    }

    console.error(error)
  }

  /**
   * @param {import('./command/CommandContext')} ctx
   * @param {string[]} [args]
   */
  run (ctx, args) {}

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
