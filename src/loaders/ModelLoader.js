const { Loader } = require('@Codya/structures')
const { FileUtils } = require('@Codya/utils')

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

      this.addModelOnDatabase(model)
      this.client.logger.log(`  > ${model.name} loaded.`, 'yellow')
    })
  }

  addModelOnDatabase (model) {
    if (model in this.client.database) return

    const modelName = model.name.toLowerCase() + 's'

    this.client.database.register(model)
    this.client.database.models[modelName] = model
  }
}

module.exports = ModelLoader
