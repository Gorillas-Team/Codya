const { Command } = require('../../structures/client')
const { banned } = require('../../../assets')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'banned',
      aliases: ['banido'],
      category: 'Fun'
    })
  }

  async run ({ channel }) {
    channel.send('Banido.', {
      files: [{ attachment: banned, name: 'Banned.mp4' }]
    })
  }
}
