const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'say',
      aliases: ['falar'],
      category: 'Utils',
      hide: true
    })
  }

  async run({ channel, args, message, mentions }) {
    const channelTarget =
      mentions.channels.first() ||
      this.client.channels.cache.get(args[0]) ||
      channel

    message.delete()

    if (!/(<#)?\d+(>)?/.test(args[0]) || args[0] !== channelTarget.toString())
      return channel.send(args.join(' '))

    const content = args.slice(1).join(' ')
    channelTarget.send(content)
  }
}
