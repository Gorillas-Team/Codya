module.exports = {
  name: 'queueEnd',
  async run ({ player }) {
    await this.leave(player.guild)
  }
}
