const Track = require('./Track')

class SearchResponse {
  /**
   * @param {import('lavacord').TrackResponse} data
   * @param {import('eris').User} user
   */
  constructor (data, user) {
    /**
     * @type {import('lavacord').LoadType}
     */
    this.loadType = data.loadType
    /**
     * @type {import('lavacord').PlaylistInfo}
     */
    this.playlistInfo = data.playlistInfo
    /**
     * @type {Track[]}
     */
    this.tracks = data.tracks.map(track => new Track(track, user))
  }
}

module.exports = SearchResponse
