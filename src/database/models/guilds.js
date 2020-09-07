const { Schema, model } = require('mongoose')

module.exports = model(
  'guilds',
  new Schema({
    _id: { type: String, required: true },
    punishments: { type: Array, default: [] },
    punishmentChannel: { type: String, default: null },
    logChannel: { type: String, default: null },
    djRole: { type: String, default: null },
    language: { type: String, default: 'pt-BR' }
  })
)
