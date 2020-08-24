module.exports = class CommandContext {
  constructor (context, args, cmd, prefix) {
    this.cmd = cmd
    this.args = args
    this.prefix = prefix
    this.message = context

    this.guild = context.guild
    this.member = context.member
    this.author = context.author
    this.channel = context.channel
    this.mentions = context.mentions
    this.client = context.client
    this.lavalink = context.client.lavalink
    this.config = context.client.config
  }
}
