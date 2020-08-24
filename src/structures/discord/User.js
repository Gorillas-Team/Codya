const { Structures } = require('discord.js')

Structures.extend('User', User => {
  class CodyaUser extends User {
    // eslint-disable-next-line no-useless-constructor
    constructor (client, data) {
      super(client, data)
    }

    get document () {
      return this.client.database.findDocument(this.id, 'users').then(document => document)
    }
  }

  return CodyaUser
})
