const Track = require('./Track')

class SearchResponse {
  /**
   * @param {TrackResponse} data
   * @param {import('eris').User} user
   */
  constructor (data, user) {
    this.loadType = data.loadType
    this.playlistInfo = data.playlistInfo
    this.tracks = data.tracks.map(track => new Track(track, user))
  }
}

module.exports = SearchResponse
