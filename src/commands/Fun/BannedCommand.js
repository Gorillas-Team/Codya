const { Command } = require('../../structures')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'banned',
      aliases: ['banido'],
      category: 'Fun'
    })
  }

  async run ({ channel }) {
    const video = 'https://cdn.discordapp.com/attachments/629888697013108756/716342571000922222/video0.mov'
    channel.send('Banido.', {
      files: [{ attachment: video, name: 'banido.mp4' }]
    })
  }
}
