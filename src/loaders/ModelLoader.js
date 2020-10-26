const { Loader } = require('../structures/client/')
const { FileUtils } = require('../utils/')

module.exports = class ModelLoader extends Loader {
  constructor (client) {
    super(client)
    this.success = 0
    this.failed = 0
    this.critical = true
  }

  load () {

  }

  initModels (dir = 'src/database/models') {
    return FileUtils.requireDir(dir, (error, file) => {
      if (error) {
        this.client.logger.error(error)
      }

      const sequelize = this.client.database.sequelize
      const { name, attributes, options } = file

      const model = sequelize.define(name, attributes, options)
      if (!this.client.database.models[name]) this.client.database.models[name] = model
    })
  }
}
