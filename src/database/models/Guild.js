const { Schema } = require('mongoose')

module.exports = {
  name: 'guilds',
  schema: new Schema({
    id: String,
    modules: { type: Number, default: 0 },
    settings: {
      automod: { type: Number, default: 0 },
      logs: { type: Number, default: 0 }
    },
    channels: Object
  }, { versionKey: false })
}
