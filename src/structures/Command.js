const { CooldownManager, PermissionUtils } = require('@Codya/utils')
const { CodyaError } = require('./command/')
const ParameterTypes = require('./arguments/impl')

class Command {
  /**
   * @param {Codya | import('../Codya')} client
   * @param {CommandOptions | import('./typings/typedef').CommandOptions} options
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

    /**
     * @type {Argument | Argument[]}
     */
    this.args = options.args || []
  }

  /**
   * @param {CommandContext} ctx
   * @param {string[]} args
   * @returns {void}
   */
  async validate (ctx, args) {
    if (this.cooldown.has(ctx.author.id)) {
      const now = Date.now()
      const cooldown = this.cooldown.get(ctx.author.id)

      const time = Math.round((cooldown - now) / 1000)

      return ctx.sendMessage(
        `Espere ${
          time === 0 ? 'alguns milissegundos' : time + ' segundo(s)'
        } para usar este comando novamente`,
        'error'
      )
    }

    if ((this.dev || this.hide) && !PermissionUtils.isDeveloper(ctx.member)) {
      return ctx.sendMessage(
        'Apenas os desenvolvedores podem utilizar este comando.',
        'bye'
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
      await this.run(ctx, ...parsedArgs)
    } catch (err) {
      this.error(ctx, err)
    }
  }

  /**
   * @param {CommandContext} ctx
   * @param {string[]} args
   * @returns {Promise<Message<TextableChannel>|import('eris').Message<import('eris').TextableChannel>|string[]>}
   */
  async handleArguments (ctx, args) {
    /**
     * @type {Argument[]}
     */
    const thisArguments = this.args.map(arg => new ParameterTypes[arg.type](arg.options))
    const parsedArgs = []

    for (const argument of thisArguments) {
      const result = await argument.parse(ctx, args)

      if (argument.required && argument.missing) {
        return ctx.sendMessage(argument.messages.missing, 'error')
      }

      if (argument.invalid) {
        return ctx.sendMessage(argument.messages.invalid, 'error')
      }

      parsedArgs.push(result)
    }

    return parsedArgs
  }

  /**
   * @param {CommandContext} ctx
   * @param {string[]} [args]
   */
  run (ctx, args) {}

  error (context, error) {
    if (error instanceof CodyaError) {
      return context.sendMessage(error.message, 'error')
    }

    this.client.logger.error(error.stack)
  }

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
