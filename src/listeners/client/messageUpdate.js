module.exports = {
  name: 'messageUpdate',
  run (oldMessage, newMessage) {
    if (oldMessage.content !== newMessage.content) return this.emit('message', newMessage)
  }
}
