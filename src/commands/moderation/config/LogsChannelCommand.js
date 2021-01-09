const { Command } = require('@Codya/structures')

class LogsChannelCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'logs',
      parent: 'config'
    })
  }
}

module.exports = LogsChannelCommand
