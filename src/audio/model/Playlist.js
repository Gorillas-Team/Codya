class Playlist {
  /**
   * @param {string} name
   */
  constructor (name) {
    this.name = name

    /**
     * @type {import('./Track')[]}
     */
    this.tracks = []
  }
}

module.exports = Playlist
