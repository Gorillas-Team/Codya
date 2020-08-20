const { Schema, model } = require('mongoose')

module.exports = model('guilds', new Schema({
  _id: { type: String, required: true },
  punishments: { type: Array, default: [] },
  djRole: { type: String, default: '' }
}))
