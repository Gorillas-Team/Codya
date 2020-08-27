const { MessageEmbed } = require('discord.js')
const colors = {
  default: '0ED4DA',
  red: 'FF0000'
}

module.exports = class CommandImpl {
  embed (opts = {}) {
    const embed = new MessageEmbed()
      .setColor(
        opts.color && typeof opts.color === 'string'
          ? colors[opts.color.toLowerCase()]
          : colors.default
      )
      .setTimestamp()

    if ('author' in opts) {
      embed.setFooter(
        `Executado por: ${opts.author.username}`,
        opts.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
          size: 2048
        })
      )
    }

    return embed
  }

  run () {}

  resolvePrefix (prefix) {
    return prefix !== 'codya'
      ? /<@!?\d+>/.test(prefix)
        ? '@Codya '
        : prefix
      : prefix + ' '
  }

  getUsage (prefix, cmd) {
    prefix = this.resolvePrefix(prefix)
    return this.usage.replace(/<prefix>/g, prefix).replace(/<cmd>/g, cmd)
  }

  parseTime (ms) {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    return { seconds: seconds % 60, minutes: minutes % 60, hours: hours % 24 }
  }

  formatTime (time) {
    const { seconds, minutes, hours } = this.parseTime(time)
    const resolvedTime =
      minutes.toString().padStart(2, 0) +
      ':' +
      seconds.toString().padStart(2, 0)
    return hours > 0
      ? hours.toString().padStart(2, 0) + ':' + resolvedTime
      : resolvedTime
  }
}
