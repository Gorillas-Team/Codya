module.exports = {
  name: 'trackEnd',
  async run ({ player }) {
    player.volume(100)
    player.setEQ(Array(3).fill('').map((_, n) => ({ band: n, gain: 0 })))
  }
}
