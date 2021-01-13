const fetch = require('node-fetch')

class LavalinkRest {
  /**
   * @param {import('lavacord').LavalinkNode} node
   */
  static request (node) {
    const _request = (url, headers) => (endpoint, body, method = 'GET') => {
      return fetch(url + endpoint, { headers, method, body }).then(res => res.json())
    }

    return _request(node.getBaseURL(), { user_id: node.manager.user, Authorization: node.password })
  }

  /**
   * @param {import('lavacord').LavalinkNode} node
   * @param {string} params
   * @returns {import('lavacord').TrackResponse}
   */
  static requestTracks (node, params) {
    return this.request(node)('loadtracks?' + params)
  }

  /**
   * @param {import('lavacord').LavalinkNode} node
   * @param {string[]} tracks
   * @returns {import('lavacord').TrackData[]}
   */

  static decodeTracks (node, tracks) {
    return this.request(node)('decodetracks', JSON.stringify(tracks), 'POST')
  }
}

module.exports = LavalinkRest
