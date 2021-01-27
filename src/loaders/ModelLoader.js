const { Loader } = require('@Kong/structures')
const { FileUtils } = require('@Kong/utils')

const { model: registerModel } = require('mongoose')

class ModelLoader extends Loader {
  constructor (client) {
    super(client)

    this.critical = true
  }

  load () {
    this.client.logger.createGroup('[Models]')
    this.client.logger.log('| Loading database models...')
    this.loadModels()
    this.client.logger.log('| All loaded with successfully!')
    this.client.logger.closeGroup()
  }

  loadModels (path = 'src/database/models') {
    return FileUtils.requireDir(path, (error, model) => {
      if (error) {
        this.client.logger.log(' > Error: ' + error.message, 'red')
      }

      this.client.database.register(model.name, registerModel(model.name, model.schema))
      this.client.logger.log(`  > ${model.name} loaded.`, 'yellow')
    })
  }
}

module.exports = ModelLoader
