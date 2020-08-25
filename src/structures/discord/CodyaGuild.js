const { Structures } = require('discord.js')

Structures.extend('Guild', Guild => {
  class CodyaGuild extends Guild {
    // eslint-disable-next-line no-useless-constructor
    constructor (...data) {
      super(...data)

      this.data = this.client.database.findDocument(this.id, 'guilds')
    }

    get music () {
      return this.client.lavalink.players.get(this.id) || null
    }
  }

  return CodyaGuild
})
