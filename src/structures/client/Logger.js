const { Console } = require('console')
const chalk = require('chalk')

const groups = []

module.exports = class Logger extends Console {
  constructor (client) {
    super({
      stdout: process.stdout,
      stderr: process.stderr,
      groupIndentation: 4
    })

    this.client = client
  }

  createGroup (groupName) {
    super.group(groupName)
    return groups.push(groupName)
  }

  log (message, color = 'blue') {
    return super.log(chalk[color](message))
  }

  closeGroup () {
    super.groupEnd()
    this.log(groups.pop())
  }

  logWithGroupArray (groups = []) {
    for (const group of groups) {
      super.group(group)
    }
  }
}
