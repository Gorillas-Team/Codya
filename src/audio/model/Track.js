class Track {
  /**
   * @param {import('lavacord').TrackData} data
   * @param {import('eris').User} requester
   */
  constructor (data, requester) {
    /**
     * @type {string}
     */
    this.uri = data.info.uri

    /**
     * @type {import('eris').User}
     */
    this.requester = requester

    /**
     * @type {string}
     */
    this.title = data.info.title

    /**
     * @type {string}
     */
    this.author = data.info.author

    /**
     * @type {number}
     */
    this.duration = data.info.length

    /**
     * @type {string}
     */
    this.identifier = data.info.identifier

    /**
     * @type {boolean}
     */
    this.isStream = data.info.isStream

    /**
     * @type {boolean}
     */
    this.isSeekable = data.info.isSeekable

    /**
     * @type {string}
     */
    this.track = data.track
  }
}

module.exports = Track
