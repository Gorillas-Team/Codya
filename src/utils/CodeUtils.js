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
}

module.exports = CodeUtils
