const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['latency'],
      description: 'Veja a minha latência',
      category: 'Misc',
      usage: '<prefix>ping'
    })
  }

  async run({ channel }) {
    channel.send(
      '📡 | Minha latência é de: `' +
        Number(this.client.ws.ping).toFixed() +
        'ms`.'
    )
  }
}
