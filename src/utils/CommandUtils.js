const { prefixes } = require('../../config')

const CodeUtils = require('./CodeUtils')

/**
 * @name CommandUtils
 * @class
 */
class CommandUtils {
  /**
   * @param {import('../Codya')} client
   * @param {import('eris').Message} message
   * @returns {string}
   */
  static async getPrefix (client, message) {
    const guildData = await client.repositories.guilds.find(message.guildID)
    const { prefix: guildPrefix } = guildData.get()

    const toLowerCase = str => str.toLowerCase()
    const startsWith = str => prefix => str.startsWith(prefix) && prefix

    const content = toLowerCase(message.content)
    const pipe = CodeUtils.pipe(toLowerCase, startsWith(content))

    const prefix = (guildPrefix ? pipe(guildPrefix) : prefixes.find(pipe))

    return prefix
  }

  /**
   * @param {string} content
   * @param {string} prefix
   * @returns {string[]}
   */
  static resolveArgs (content, prefix) {
    const slice = str => str.slice(prefix.length)
    const trim = str => str.trim()

    const split = str => str.split(/ +/g)
    const filter = str => str.filter(Boolean)

    return CodeUtils.pipe(slice, trim, split, filter)(content)
  }
}

module.exports = CommandUtils
