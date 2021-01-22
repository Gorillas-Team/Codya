const CodeUtils = require('./CodeUtils')

class TimeUtils {
  static compareTime (time) {
    return this.formatTime(time - Date.now())
  }

  /**
   * @param {number} ms
   * @returns {object}
   */
  static parseTime (ms) {
    const mod = remainder => quotient => quotient % remainder

    const modSecondAndMinutes = mod(60)
    const modHours = mod(24)
    const modDays = mod(30)

    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    return {
      seconds: modSecondAndMinutes(seconds),
      minutes: modSecondAndMinutes(minutes),
      hours: modHours(hours),
      days: modDays(days)
    }
  }

  /**
   * @param {number} time
   * @returns {string}
   */
  static formatTime (time) {
    const toString = n => String(n)
    const pad = n => n.padStart(2, 0)
    const parseNumber = CodeUtils.pipe(toString, pad)

    const { seconds, minutes, hours, days } = this.parseTime(time)
    const times = [parseNumber(minutes), parseNumber(seconds)]
    if (hours > 0) times.unshift(parseNumber(hours))

    return (days > 0 ? `${days} dia(s), ` : '') + times.join(':')
  }
}

module.exports = TimeUtils
