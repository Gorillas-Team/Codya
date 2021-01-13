const { LavalinkNode } = require('lavacord')

module.exports = {
  name: 'Node',
  load () {
    LavalinkNode.prototype.getBaseURL = function () {
      return `http://${this.host}:${this.port}/`
    }
  }
}
