const CodeUtils = require('./CodeUtils')

class TimeUtils {
  /**
   * @param {number} ms
   * @returns {object}
   */
  parseTime (ms) {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    return { seconds: seconds % 60, minutes: minutes % 60, hours: hours % 24 }
  }

  /**
   * @param {number} time
   * @returns {string}
   */
  formatTime (time) {
    const toString = n => String(n)
    const pad = n => n.padStart(2, 0)
    const parseNumber = CodeUtils.pipe(toString, pad)

    const { seconds, minutes, hours } = this.parseTime(time)
    const times = [parseNumber(minutes), parseNumber(seconds)]
    if (hours > 0) times.unshift(parseNumber(hours))

    return times.join(':')
  }
}

module.exports = TimeUtils
