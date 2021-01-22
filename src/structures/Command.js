const { CooldownManager, PermissionUtils } = require('@Codya/utils')
const { CodyaError } = require('./command/')
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

    /**
     * @type {import('./arguments/Argument')[]}
     */
    this.args = options.args || []
  }

  /**
   * @param {import('./command/CommandContext')} ctx
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

    let parsedArgs = []

    try {
      if (this.args.length > 0) parsedArgs = await this.handleArguments(ctx, args)
    } catch (err) {
      return this.error(ctx, err)
    }

    try {
      await this.run(ctx, ...parsedArgs)
    } catch (err) {
      this.error(ctx, err)
    }
  }

  /**
   * @param {import('./command/CommandContext')} ctx
   * @param {string[]} commandArgs
   * @returns {Promise<string[]>}
   */
  async handleArguments (ctx, commandArgs) {
    const thisArguments = this.args.map(arg => {
      return new ParameterTypes[arg.type](arg.options)
    })
    const parsedArgs = []

    const parseArgument = async (args, rawArgs) => {
      const [argument] = args

      const parsed = await argument.parse(ctx, rawArgs)

      if (argument.required && argument.missing) {
        throw new CodyaError(argument.messages.missing)
      }

      if (argument.required && argument.invalid) {
        throw new CodyaError(argument.messages.invalid)
      }

      parsedArgs.push(parsed[0])

      if (args.length > 1) return parseArgument(args.slice(1), parsed[1])
      return thisArguments
    }

    await parseArgument(thisArguments, commandArgs)

    return parsedArgs
  }

  /**
   * @param {import('./command/CommandContext')} ctx
   * @param {string[]} [args]
   */
  run (ctx, args) {}

  error (context, error) {
    if (error instanceof CodyaError) {
      return context.sendMessage(error.message, 'error')
    }

    this.client.logger.error(error.stack)
  }
}

module.exports = Command
