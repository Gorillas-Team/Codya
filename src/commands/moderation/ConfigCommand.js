const { Command, CodyaEmbed } = require('@Codya/structures')

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
    const { channels } = await this.client.repositories.guilds.find(ctx.guild.id).then(d => d.get())

    const logsChannel = channels.logs ? this.client.getChannel(channels.logs).mention : 'Nenhum'

    const embed = new CodyaEmbed()
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