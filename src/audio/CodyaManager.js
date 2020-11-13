const { Manager } = require('lavacord')

const fetch = require('node-fetch')
const SearchResponse = require('./model/SearchResponse')

class CodyaManager extends Manager {
  /**
   * @param {Codya} client
   * @param {LavalinkNodeOptions[]} nodes
   * @param {ManagerOptions | import('lavacord').ManagerOptions} options
   */
  constructor (client, nodes, options) {
    super(nodes, options)

    this.client = client
    this.user = client.user.id
    this.send = packet => {
      const guild = this.client.guilds.get(packet.d.guild_id)
      if (guild) guild.shard.sendWS(packet.op, packet.d)
    }

    client
      .once('ready', () => {
        this.shards = client.shards.size || 1
      })
      .on('rawWS', async packet => {
        switch (packet.t) {
          case 'VOICE_SERVER_UPDATE': {
            await this.voiceServerUpdate(packet.d)
            break
          }
          case 'VOICE_STATE_UPDATE': {
            await this.voiceStateUpdate(packet.d)
            break
          }
          case 'GUILD_CREATE': {
            for (const state of packet.d.voice_states) await this.voiceStateUpdate({ ...state, guild_id: packet.d.id })
            break
          }
        }
      })
  }

  /**
   * @param {string} query
   * @param {string} source?
   * @returns {Promise<SearchResponse>}
   */
  async fetchTracks (query, source) {
    const node = this.idealNodes[0]

    if (!/^https?:\/\//.test(query)) {
      query = `${source || 'yt'}search:${query}`
    }

    const params = new URLSearchParams({ identifier: query })

    const result = await fetch(`http://${node.host}:${node.port}/loadtracks?${params}`, {
      headers: {
        Authorization: node.password
      }
    }).then(res => res.json())
      .catch(error => {
        throw new Error('Fail to fetch tracks' + error)
      })

    return new SearchResponse(result)
  }
}

module.exports = CodyaManager
