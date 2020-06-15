const { Schema, model } = require('mongoose')

const users = model('users', new Schema({
  _id: { type: String, required: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  daily: { type: Number, default: 0 }
}))

module.exports = users
