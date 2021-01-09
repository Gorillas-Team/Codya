const CodyaEmbed = require('./CodyaEmbed')

/**
 * @name CommandContext
 * @constructor
 */
class CommandContext {
  /**
   * @param {import('eris').Message} message
   * @param {import('../../Codya')} client
   * @param {string[]} args
   * @param {string} cmd
   * @param {string} prefix
   */
  constructor (message, client, args, cmd, prefix) {
    this.cmd = cmd
    this.client = client
    this.args = args
    this.prefix = prefix
    this.message = message

    this.member = this.message.member
    this.author = this.message.author
    this.channel = this.message.channel
    this.mentions = this.message.mentions
  }

  /**
   * @param {string | import('./CodyaEmbed')} message
   * @param {string} emoji
   * @returns {Promise<import('eris').Message<import('eris').TextableChannel>>}
   */
  sendMessage (message, emoji = 'star') {
    if (!(message instanceof CodyaEmbed)) {
      const baseMessage = `${this.client.getEmoji(emoji)} | ${message}`
      return this.client.createMessage(this.channel.id, baseMessage)
    }

    return this.sendEmbed(message)
  }

  /**
   *
   * @param {import('eris').Embed} embed
   * @returns {Promise<import('eris').Message<import('eris').TextableChannel>}
   */

  sendEmbed (embed) {
    return this.client.createMessage(this.channel.id, { embed: embed.toJSON() })
  }

  /**
   *
   * @param {string} message
   * @param {string} emoji
   * @param {number} timeout
   */
  sendTemporaryMessage (message, emoji, timeout = 10000) {
    return this.sendMessage(message, emoji).then(msg => setTimeout(() => msg.delete(), timeout))
  }

  /**
   * @returns {import('eris').Guild}
   */
  get guild () {
    return this.client.guilds.get(this.message.guildID)
  }

  /**
   * @returns {import('eris').Member}
   */
  get selfMember () {
    return this.guild.members.get(this.client.user.id)
  }
}

module.exports = CommandContext
