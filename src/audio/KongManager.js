const { Manager } = require('lavacord')

const Track = require('./model/Track')
const SearchResponse = require('./model/SearchResponse')
const LavalinkRest = require('./LavalinkRest')

class KongManager extends Manager {
  /**
   * @param {Kong} client
   * @param {LavalinkNodeOptions[]} nodes
   * @param {ManagerOptions | import('lavacord').ManagerOptions} options
   */
  constructor (client, nodes, options) {
    const nodesResumable = nodes.map(n => Object.assign({ resumeKey: Math.random().toString(36).slice(2) }, n))
    super(nodesResumable, options)

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
      .on('rawWS', this.sendPackets.bind(this))
  }

  /**
   * @param {string} query
   * @param {import('eris').User} requester
   * @param {string} [source]
   * @returns {Promise<SearchResponse>}
   */
  async fetchTracks (query, requester, source) {
    const node = this.idealNodes[0]

    if (!/^https?:\/\//.test(query)) {
      query = `${source || 'yt'}search:${query}`
    }

    const params = new URLSearchParams({ identifier: query })
    const result = await LavalinkRest.requestTracks(node, params)

    return new SearchResponse(result, requester)
  }

  async decodeTracks (tracks, requester) {
    const node = this.idealNodes[0]

    const results = await LavalinkRest.decodeTracks(node, tracks)

    return results.map(track => new Track(track, requester))
  }

  async sendPackets (packet) {
    const typePackets = {
      GUILD_CREATE: async (data) => {
        for (const state of packet.d.voice_states) {
          await this.voiceStateUpdate({ ...state, guild_id: packet.d.id })
        }
      },
      VOICE_STATE_UPDATE: async (data) => (await this.voiceStateUpdate(packet.d)),
      VOICE_SERVER_UPDATE: async (data) => (await this.voiceServerUpdate(packet.d))
    }
    return (typePackets[packet.t]) && (typePackets[packet.t])(packet.d)
  }
}

module.exports = KongManager
