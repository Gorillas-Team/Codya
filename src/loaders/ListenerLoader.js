const { Loader } = require('@Codya/structures')
const { FileUtils } = require('@Codya/utils')

class ListenerLoader extends Loader {
  constructor (client) {
    super(client)

    this.critical = true
  }

  load () {
    this.client.logger.createGroup('[LISTENERS]')
    this.client.logger.log('| Loading listeners...')
    this.loadListeners()
    this.client.logger.log('| All loaded with successfully!')
    this.client.logger.closeGroup()

    return this
  }

  loadListeners (path = 'src/listeners') {
    return FileUtils.requireDir(path, (error, Listener) => {
      if (error) {
        this.client.logger.log('  > Error: ' + error.message, 'red')
      }

      const listener = new Listener(this.client)

      listener.listen()
      this.client.logger.log(`  > ${listener.name} loaded.`, 'yellow')
    })
  }
}

module.exports = ListenerLoader
