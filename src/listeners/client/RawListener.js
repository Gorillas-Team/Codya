const { Listener } = require('../../structures/client')
const EMOJIS = ['👍', '👎']

module.exports = class RawListener extends Listener {
  constructor () {
    super({
      name: 'raw'
    })
  }

  async run (packet) {
    if (!packet.d || !packet.d?.guild_id) return
    if (packet.d.guild_id !== '748606071836246208') return

    const guild = await this.guilds.cache.get(packet.d.guild_id)

    const channel = await guild.channels.cache
      .get('748649432903581749')

    const message = channel.messages.cache.get(packet.d.id)

    if (!message || message.content.startsWith('^')) return

    for (const emoji of EMOJIS) {
      await message.react(emoji)
    }
  }
}
