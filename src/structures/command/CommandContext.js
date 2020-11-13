/**
 * @name CommandContext
 * @class
 */
class CommandContext {
  /**
   * @param {Message} message
   * @param {Codya | import('../../Codya')} client
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
   * @param {string} message
   * @param {string} emoji
   * @returns {Promise<Message<TextableChannel>> | Promise<import('eris').Message<import('eris').TextableChannel>>}
   */
  sendMessage (message, emoji) {
    const baseMessage = `${this.client.getEmoji(emoji)} | ${message}`
    return this.client.createMessage(this.channel.id, baseMessage)
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
   * @returns {Eris.Guild}
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

  /**
   * @returns {CodyaPlayer | Player}
   */
  get player () {
    return this.client.lavalink.players.get(this.message.guildID)
  }
}

module.exports = CommandContext
