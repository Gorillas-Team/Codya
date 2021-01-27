const { Command, KongEmbed } = require('@Kong/structures')

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

    const logsChannel = data.channels.logs ? this.client.getChannel(data.channels.logs).mention : 'Nenhum'

    const embed = new KongEmbed()
      .setColor(0x0ED4DA)
      .setAuthor(`Central de configurações - ${ctx.guild.name}`, ctx.guild.iconURL)
      .addFields([
        {
          name: `
        ${this.client.getEmoji('gear')} **| Logs**:
    **Atual:** ${logsChannel}
            `,
          value: `\`\`\`${ctx.prefix + ctx.cmd} logs <id/mention/name/disable>\`\`\``
        }
      ])

    ctx.sendMessage(embed)
  }
}

module.exports = ConfigCommand
