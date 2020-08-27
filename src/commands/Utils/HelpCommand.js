const { Command } = require('../../structures/client')

const mapCommandsByCategory = (commands, category) => commands
  .filter(command => command.category === category)
  .map(command => '`' + command.name + '`')
  .join(', ')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'help',
      aliases: ['ajuda', 'comandos', 'commands'],
      usage: '<prefix>help <args> | <prefix>help',
      description: 'Mostra meus comandos e seus funções.',
      category: 'Utils'
    })
  }

  async run ({ channel, args, prefix, author, cmd }) {
    const commands = this.client.commands.filter(({ hide, dev }) => !hide && !dev)
    const commandPerCategory = (category) => commands.filter(cmd => cmd.category === category)
    const opts = args[0] ? args[0].toLowerCase() : ''

    if (!opts) {
      const embed = this.embed({ author })
        .setTitle('**Central de ajuda**')
        .setDescription(`**Comandos [${commands.filter(x => !x.dev).size}]**`)
        .addFields(
          [
            {
              name: `${this.client.botEmojis.gear} **| Utilitários: [${commandPerCategory('Utils').size}]**`,
              value: mapCommandsByCategory(commands, 'Utils')
            },
            {
              name: `${this.client.botEmojis.dancing} **| Música: [${commandPerCategory('Music').size}]**`,
              value: mapCommandsByCategory(commands, 'Music')
            },
            {
              name: `${this.client.botEmojis.star} **| Diversão: [${commandPerCategory('Fun').size}]**`,
              value: mapCommandsByCategory(commands, 'Fun')
            },
            {
              name: `${this.client.botEmojis.lamp} **| Misc: [${commandPerCategory('Misc').size}]**`,
              value: mapCommandsByCategory(commands, 'Misc')
            },
            {
              name: `👮 **| Moderação: [${commandPerCategory('moderation').size}]**`,
              value: mapCommandsByCategory(commands, 'moderation')
            }
          ]
        )
        .setFooter(this.resolvePrefix(prefix) + cmd + ' <comando> | Executado por ' + author.username, author.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }))
        .setTimestamp()

      return channel.send(embed)
        .then(m => m.delete({ timeout: 60 * 1000 }))
    }

    const command = commands.find(c => c.name === opts || c.aliases.includes(opts))

    if (!command) return channel.send('❌ | Este comando não existe.')

    const embed = this.embed()
      .addField('Nome:', `\`${command.name}\``)
      .addField('Descrição:', `\`${command.description}\``)
      .addField('Como usar:', `\`${command.getUsage(prefix, cmd)}\``)
      .addField('Alternativas:', `\`${command.aliases.join(', ')}\``)

    channel.send(embed)
  }
}
