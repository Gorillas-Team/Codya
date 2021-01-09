const { Loader } = require('@Codya/structures')
const { FileUtils } = require('@Codya/utils')

class PrototypeLoader extends Loader {
  constructor (client) {
    super(client)

    this.critical = true
  }

  load () {
    this.client.logger.createGroup('[Prototypes]')
    this.client.logger.log('| Loading prototypes...')
    this.loadPrototypes()
    this.client.logger.log('| All loaded with successfully!')
    this.client.logger.closeGroup()
  }

  loadPrototypes (path = 'src/prototypes') {
    return FileUtils.requireDir(path, (error, prototype) => {
      if (error) {
        this.client.logger.log(' > Error: ' + error.message, 'red')
      }

      prototype.load()
      this.client.logger.log(`  > ${prototype.name} loaded.`, 'yellow')
    })
  }
}

module.exports = PrototypeLoader
