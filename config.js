/**
 * @type {import('eris').ClientOptions}
 */
module.exports = {
  // Discord options
  restMode: true,

  // Bot options
  /**
   * @type {string}
   */
  token: process.env.TOKEN,

  /**
   * @type {import('lavacord/dist/lib/Types').LavalinkNodeOptions[]}
   */
  nodes: JSON.parse(process.env.LAVALINK_NODES || [{}]),

  /**
   * @type {string[]}
   */
  devs: JSON.parse(process.env.DEVELOPERS || []),

  /**
   * @type {string[]}
   */
  prefixes: JSON.parse(process.env.PREFIXES || []),

  /**
   * @type {object}
   * @property {string} connectionUri
   */
  database: {
    connectionUri: process.env.DATABASE_URI
  }
}
