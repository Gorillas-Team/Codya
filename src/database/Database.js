const { Database: MongoritoDatabase } = require('mongorito')

class Database {
  constructor (options, client) {
    this.options = options
    this.client = client

    this.mongorito = null
    this.models = {}
    this.start()
  }

  /**
   * @private
   */
  onConnect () {
    this.client.logger.createGroup('[DATABASE]')
    this.client.logger.log('> Connection started with success.', 'green')
    this.client.logger.closeGroup()
  }

  start () {
    this.mongorito = new MongoritoDatabase(this.options.connectionUri, {
      autoReconnect: true,
      logger: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    this.mongorito.connect()
      .then(this.onConnect.bind(this))
      .catch(err => this.client.logger.error(err))

    return this
  }

  register (model) {
    return this.mongorito.register(model)
  }
}

module.exports = Database
