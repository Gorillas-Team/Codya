module.exports = {
  name: 'trackStart',
  async run (player, track) {
    player.textChannel.send(this.client.botEmojis.disco + ' | Tocando agora: `' + track.info.title + '`. Requisitado por: `' + track.info.requester.tag + '`')
      .then(x => x.delete({ timeout: track.info.length }))
  }
}
