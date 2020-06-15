const Models = require('./model')
const { connect } = require('mongoose')

module.exports = class Mongo {
  constructor (connection) {
    this.connection = connection

    this.start()
  }

  start () {
    return connect(this.connection, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('[MONGO] Conectado com Sucesso.'))
      .catch(err => console.error('[MONGO] Erro ao conectar: ', err))
  }

  async add ({ type, id }) {
    const doc = await Models[type].create({ _id: id })
    return doc
  }

  async find ({ type, id }) {
    const doc = id ? await Models[type].findOne({ _id: id }) : await Models[type].find()
    return doc || (id ? this.add({ type, id }) : null)
  }

  async delete ({ type, id }) {
    const doc = await Models[type].deleteOne({ _id: id }).catch(e => e)
    return doc || false
  }
}
