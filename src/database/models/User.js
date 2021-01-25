const { Schema } = require('mongoose')

module.exports = {
  name: 'users',
  schema: new Schema({
    id: String,
    money: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    work: { type: Object, default: null },
    cooldown: {
      daily: { type: Number, default: 0 },
      fish: { type: Number, default: 0 },
      work: { type: Number, default: 0 }
    },
    fish: {
      stats: {
        common: { type: Number, default: 0 },
        uncommon: { type: Number, default: 0 },
        rare: { type: Number, default: 0 },
        legendary: { type: Number, default: 0 }
      }
    },
    playlists: { type: Array, default: [] },
    machines: { type: Array, default: [] }
  }, { versionKey: false })
}
