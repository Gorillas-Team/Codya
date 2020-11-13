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
   * @returns {Promise<Message<TextableChannel>> | Promise<import('eris').Message<import('eris').TextableChannel>>}
   */
  sendMessage (message) {
    return this.client.createMessage(this.channel.id, message)
  }

  /**
   * @returns {Eris.Guild}
   */
  getGuild () {
    return this.client.guilds.get(this.message.guildID)
  }

  /**
   * @returns {CodyaPlayer | Player}
   */
  getPlayer () {
    return this.client.lavalink.players.get(this.message.guildID)
  }
}

module.exports = CommandContext
