const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'serverinfo',
      aliases: ['server-info', 'infoserver', 'sinfo'],
      usage: '<prefix>serverinfo | <prefix>serverinfo 653629619634831360',
      description: 'Veja as informações de uma determinada guild.',
      category: 'Utils'
    })
  }

  run ({ channel, guild, args, author }) {
    const guildInfo = args[0] ? this.client.guilds.cache.get(args[0]) : guild
    const regions = {
      brazil: 'Brasil',
      southafrica: 'África do Sul',
      russia: 'Rússia',
      japan: 'Japão',
      'us-south': 'Sul dos Estados Unidos',
      singapore: 'Singapura',
      europe: 'Europa',
      sydney: 'Sydney',
      'us-east': 'Leste dos Estados Unidos',
      'hong-kong': 'Hong Kong',
      'us-west': 'Oeste dos Estados Unidos',
      'us-central': 'Central dos Estados Unidos',
      india: 'India'
    }

    const embed = this.embed({ author })
      .addField('| Nome:', `\`${guildInfo.name}\``, true)
      .addField('| ID:', `\`${guildInfo.id}\``, true)
      .addField('| Região:', `\`${regions[guildInfo.region]}\``)
      .addField('| Dono:', `\`${guildInfo.owner.user.username} (${guildInfo.owner.user.id})\``)

    channel.send(embed)
  }
}
