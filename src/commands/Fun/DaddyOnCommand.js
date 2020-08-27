const { Command } = require('../../structures/client')
const { daddyon } = require('../../../assets')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'paitaon',
      aliases: ['daddy', 'daddyon'],
      category: 'Fun'
    })
  }

  async run ({ channel }) {
    channel.send({ files: [{ attachment: daddyon, name: 'daddy.mp4' }] })
  }
}
