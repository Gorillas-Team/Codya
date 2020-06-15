const { Command } = require('../../structures')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'adm',
      aliases: ['admin'],
      category: 'Fun'
    })
  }

  async run ({ channel }) {
    const video = 'https://cdn.glitch.com/cd265589-f2c1-4953-a509-5db887f4af63%2Fadmtemfimose.mp4?v=1583541777658'
    channel.send({ files: [{ attachment: video, name: 'Adm_tem_fimose.mp4' }] })
  }
}
