const { Schema, model } = require('mongoose')

module.exports = model('users', new Schema({
  _id: { type: String, required: true },
  xp: { type: Number, default: 1 },
  level: { type: Number, default: 1 },
  money: { type: Number, default: 0 },
  daily: { type: Number, default: 0 }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}))
