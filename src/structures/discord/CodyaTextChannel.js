const { Structures } = require('discord.js')

Structures.extend('TextChannel', TextChannel => {
  class CodyaTextChannel extends TextChannel {
    // eslint-disable-next-line no-useless-constructor
    constructor(...data) {
      super(...data)
    }

    sendTempMessage(message, timeout = 10000) {
      return this.send(message).then(msg => msg.delete({ timeout }))
    }
  }

  return CodyaTextChannel
})
