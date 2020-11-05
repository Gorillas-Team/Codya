const { prefixes } = require('../../config')

const CodeUtils = require('./CodeUtils')

/**
 * @name CommandUtils
 * @class
 */
class CommandUtils {
  /**
   * @param {import('eris').Message} message
   * @returns {string}
   */
  static getPrefix (message) {
    const content = message.content.toLowerCase()
    return prefixes.find(prefix =>
      content.toLowerCase().startsWith(prefix)
    )
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

    return CodeUtils.pipe(slice, trim, split)(content)
  }
}

module.exports = CommandUtils
