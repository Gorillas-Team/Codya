class CodeUtils {
  /**
   * @param {...Function} functions
   * @returns {function(*=): *}
   */
  static pipe (...functions) {
    return x => {
      return functions.reduce((arg, f) => f(arg), x)
    }
  }

  /**
   * @param {string} text
   * @returns {string}
   */
  static clean (text) {
    return typeof text === 'string'
      ? text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
      : text
  }

  /**
   * @param {string} prefix
   * @returns {string}
   */
  static resolvePrefix (prefix) {
    const isEqualsCodya = p => p === 'codya'
    const isMention = p => /<@!?\d+>/.test(p)

    return isEqualsCodya(prefix) ? (prefix + ' ') : isMention(prefix) ? ('@Codya ') : prefix
  }

  /**
   * @param {string} prefix
   * @param {string} cmd
   * @returns {string}
   */
  static getUsage (prefix, cmd) {
    prefix = this.resolvePrefix(prefix)
    return this.usage.replace(/<prefix>/g, prefix).replace(/<cmd>/g, cmd)
  }

  /**
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */

  static random (min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min
  }

  /**
   * @param {string} text
   * @returns {string}
   */
  static capitalize (text) {
    return text[0].toUpperCase() + text.slice(1)
  }
}

module.exports = CodeUtils
