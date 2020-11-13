const { Player } = require('lavacord')

const Queue = require('./structures/Queue')

class CodyaPlayer extends Player {
  constructor (node, id) {
    super(node, id)

    this.currentVolume = 100
    this.paused = false
    this.playing = false
    this.looping = 0

    this.effects = {
      bassboost: false,
      nightcore: false
    }

    /**
     * @type {TextChannel}
     */
    this.textChannel = null

    this.song = null

    this.queue = new Queue()

    this.on('end', async ({ reason }) => {
      if (reason === 'REPLACED') return
      if (reason !== 'STOPPED') await this.skip()
    })

    this.on('error', async (error) => {
      await this.skip()
      console.error(error)
    })

    this.on('stop', async () => {
      this.song = null
      setTimeout(async () => {
        if (this.playing) return

        await this.textChannel.createMessage('A fila acabou, saindo do canal.')
        await this.manager.leave(this.id)
      }, 60000)
    })
  }

  /**
   * @param {Track} song
   * @param {boolean} force
   * @return {Promise<boolean>}
   */
  async play (song, force = false) {
    if (this.playing && !force) {
      this.queue.add(song)
      return false
    }

    this.song = song
    this.playing = true

    this.lastMessage = await this.textChannel.createMessage(`${this.manager.client.getEmoji('disco')} | Tocando agora: \`${song.title}\``)
    return super.play(this.queue.empty ? song.track : this.queue.first().track, { volume: this.currentVolume })
  }

  volume (volume) {
    this.currentVolume = volume
    return super.volume(volume)
  }

  async stop () {
    this.playing = false

    this.emit('stop')

    await this.lastMessage.delete()
    await super.stop()
  }

  async skip () {
    if (this.looping === 1) this.queue.add(this.song)
    else if (this.looping === 2) this.queue.add(this.queue.shift())

    const next = this.queue.shift()
    if (next) {
      await this.lastMessage.delete()

      await this.play(next, true)
      return next
    } else {
      await this.stop()
    }
  }

  loop (state) {
    this.looping = state
  }

  /**
   * @param {TextChannel | import('eris').TextChannel} channel
   * @returns {void}
   */
  setTextChannel (channel) {
    this.textChannel = channel
  }
}

module.exports = CodyaPlayer