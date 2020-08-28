const { Command } = require('../structures/client')
const {
  Constants: { permissions }
} = require('../utils')

module.exports = class ModerationCommand extends Command {
  constructor (client, options) {
    super(client, options)

    this.permissions = options.permissions || {
      names: [],
      verify: false
    }
  }

  preLoad (ctx) {
    if (this.permissions.names >= 1) {
      const neededPermissions = this.permissions.names.map(perm => permissions[perm])
      if (!ctx.member.hasPermission(this.permissions.names)) {
        return ctx.channel.send(
          `${this.client.getEmoji('error')} | Você não possui a permissão de \`${neededPermissions.join(', ')}\` para executar este comando.`
        )
      }

      if (this.permissions.verify &&
        !ctx.guild.me.hasPermission(this.permissions.names)
      ) {
        return ctx.channel.send(
          `${this.client.getEmoji('error')} | Eu não possuo a permissão de \`${neededPermissions.join(', ')}\` para executar este comando.`
        )
      }
    }

    return this.run(ctx)
  }
}
