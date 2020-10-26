const { Structures } = require('discord.js')

Structures.extend('User', User => {
  class CodyaUser extends User {
    // eslint-disable-next-line no-useless-constructor
    constructor (...data) {
      super(...data)
    }
  }

  return CodyaUser
})
