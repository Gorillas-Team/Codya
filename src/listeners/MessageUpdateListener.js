const { Listener } = require('@Kong/structures')

class MessageUpdateListener extends Listener {
  constructor (client) {
    super({
      name: 'messageUpdate'
    }, client)
  }

  /**
   * @param {Message | import('eris').Message} message
   * @param {OldMessage | import('eris').OldMessage} oldMessage
   * @returns {void}
   */
  run (message, oldMessage) {
    if (!message || !oldMessage) return
    if (oldMessage.content !== message.content) return this.client.emit('messageCreate', message)
  }
}

module.exports = MessageUpdateListener
