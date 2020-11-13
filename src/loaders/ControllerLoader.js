const { Loader } = require('@Codya/structures')
const { FileUtils } = require('@Codya/utils')

class ControllerLoader extends Loader {
  constructor (client) {
    super(client)

    this.critical = true
  }

  load () {
    this.client.logger.createGroup('[CONTROLLERS]')
    this.client.logger.log('| Loading controllers...')
    this.loadControllers()
    this.client.logger.log('| All loaded with successfully!')
    this.client.logger.closeGroup()
  }

  loadControllers (path = 'src/controllers') {
    return FileUtils.requireDir(path, (error, Controller) => {
      if (error) {
        this.client.logger.log(' > Error: ' + error.message, 'red')
      }

      const controller = new Controller(this.client)

      this.addControllerOnClient(controller)
      this.client.logger.log(`  > ${controller.name} loaded.`, 'yellow')
    })
  }

  addControllerOnClient (controller) {
    if (controller.name in this.client.controllers) return

    this.client.controllers[controller.name] = controller
  }
}

module.exports = ControllerLoader
