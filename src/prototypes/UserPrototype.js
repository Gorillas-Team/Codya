const { User } = require('eris')

module.exports = {
  name: 'UserPrototype',
  load () {
    User.prototype.getAsTag = function () {
      return `${this.username}#${this.discriminator}`
    }
  }
}
