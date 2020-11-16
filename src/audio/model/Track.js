class Track {
  /**
   * @param {TrackData} data
   * @param {import('eris').User} requester
   */
  constructor (data, requester) {
    this.uri = data.info.uri

    this.requester = requester
    this.title = data.info.title
    this.author = data.info.author

    this.duration = data.info.length

    this.identifier = data.info.identifier

    this.isStream = data.info.isStream
    this.isSeekable = data.info.isSeekable

    this.track = data.track
  }
}

module.exports = Track
