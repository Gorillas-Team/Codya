const { devs } = require('../../config')

class PermissionUtils {
  /**
   * @param {import('eris').Member} member
   * @returns {boolean}
   */
  static isDeveloper (member) {
    return devs.includes(member.id)
  }
}

module.exports = PermissionUtils
