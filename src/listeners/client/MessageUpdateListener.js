const { Listener } = require('../../structures')

module.exports = class MessageUpdateListener extends Listener {
  constructor () {
    super({
      name: 'messageUpdate'
    })
  }

  run (oldMessage, newMessage) {
    if (oldMessage.content !== newMessage.content) return this.emit('message', newMessage)
  }
}
