const { Schema, model } = require('mongoose')

module.exports = model('guilds', new Schema({
  _id: { type: String, required: true },
  punishments: { type: Map, default: new Map() },
  djRole: { type: String, default: false }
}))
