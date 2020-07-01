module.exports = {
  name: 'queueEnd',
  async run (player) {
    player.textChannel.send(player.manager.client.botEmojis.stopped + ' | A fila acabou...')

    await this.leave(player.guild)
  }
}
