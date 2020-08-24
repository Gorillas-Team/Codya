const { Command } = require('../../structures/client')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'paitaon',
      aliases: ['daddy', 'daddyon'],
      category: 'Fun'
    })
  }

  async run ({ channel }) {
    const video = 'https://cdn.glitch.com/cd265589-f2c1-4953-a509-5db887f4af63%2Fpai_ta_on.mp4?v=1583969412106'
    channel.send({ files: [{ attachment: video, name: 'pai_ta_on.mp4' }] })
  }
}
