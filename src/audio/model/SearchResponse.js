const Track = require('./Track')

class SearchResponse {
  /**
   * @param {TrackResponse} data
   */
  constructor (data) {
    this.loadType = data.loadType
    this.playlistInfo = data.playlistInfo
    this.tracks = data.tracks.map(track => new Track(track))
  }
}

module.exports = SearchResponse
