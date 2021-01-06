const { Command } = require('@Codya/structures')

class ConfigCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'config'
    })
  }

  /**
   *
   * @param {import('../../structures/command/CommandContext')} ctx
   */
  async run (ctx) {
    const data = await this.client.repositories.guilds.find(ctx.guild.id)

    const prefix = data.get().prefix || ctx.prefix

    ctx.sendEmbed({
      color: 0x0ED4DA,
      author: {
        name: 'Central de fodase',
        url: ctx.selfMember.user.avatarURL
      },
      fields: [{
        name: `
    ${this.client.getEmoji('gear')} **| Logs**:
**Atual:** ${data.get().prefix || 'Nenhum'}
        `,
        value: `\`\`\`${prefix + ctx.cmd} prefix <prefix>\`\`\``
      }]
    })
  }
}

module.exports = ConfigCommand
