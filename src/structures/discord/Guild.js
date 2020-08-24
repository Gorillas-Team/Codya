const { Structures } = require('discord.js')

Structures.extend('Guild', Guild => {
  class CodyaGuild extends Guild {
    // eslint-disable-next-line no-useless-constructor
    constructor (client, data) {
      super(client, data)
    }

    get document () {
      return this.client.database.findDocument(this.id, 'guilds')
    }
  }

  return CodyaGuild
})
