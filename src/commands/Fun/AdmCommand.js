const { Command } = require('../../structures/client')
const { admin } = require('../../../assets')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'adm',
      aliases: ['admin'],
      category: 'Fun'
    })
  }

  async run({ channel }) {
    channel.send({ files: [{ attachment: admin, name: 'Admin.mp4' }] })
  }
}
