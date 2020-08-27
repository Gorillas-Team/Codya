const { Console } = require('console')
const chalk = require('chalk')

module.exports = class Logger extends Console {
  constructor(client) {
    super({
      stdout: process.stdout,
      stderr: process.stderr,
      groupIndentation: 4
    })

    this.client = client
  }

  log(message, color = 'blue') {
    return super.log(chalk[color](message))
  }
}
