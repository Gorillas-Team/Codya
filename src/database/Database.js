const Mongoose = require('mongoose')

class Database {
  constructor (options, client) {
    this.options = options
    this.client = client

    this.connection = null
    this.models = {}

    this.enabled = false
    this.start()
  }

  /**
   * @private
   */
  onConnect () {
    this.enabled = true
    this.client.logger.createGroup('[DATABASE]')
    this.client.logger.log('> Connection started with success.', 'green')
    this.client.logger.closeGroup()
  }

  start () {
    this.connection = Mongoose.connect(this.options.connectionUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(this.onConnect.bind(this))

    return this
  }

  register (name, model) {
    if (model in this.models) return

    this.models[name] = model
    return model
  }
}

module.exports = Database
