const models = require('./models')
const { connect } = require('mongoose')

module.exports = class Database {
  constructor (client) {
    this.client = client
    this.models = models

    this.start()
  }

  start () {
    return connect(this.client.config.database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => console.log('[MONGO] Conectado com Sucesso.'))
      .catch(err => console.error('[MONGO] Erro ao conectar: ', err))
  }

  async findDocument (id, type) {
    const model = this.models[type]
    const doc = (await model.findById(id)) || (await model.create({ _id: id }))
    return doc
  }
}
