const { devs } = require('../../config')

class PermissionUtils {
  /**
   * @param {Member | import('eris').Member} member
   * @returns {boolean}
   */
  static isDeveloper (member) {
    return devs.includes(member.id)
  }
}

module.exports = PermissionUtils
