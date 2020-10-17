const { Command } = require('../structures/client')

module.exports = class MusicCommand extends Command {
  constructor (client, options) {
    super(client, options)

    this.requirements = options.requirements || {
      voiceChannelOnly: false,
      queueOnly: false,
      djOnly: false
    }

    this.options = options
  }

  async preLoad (ctx) {
    return super.preLoad(ctx)
  }
}
