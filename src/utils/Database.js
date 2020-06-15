const { Schema, model, connect } = require('mongoose')

connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function (err) {
  if (err) { return console.log('[MONGO] - Erro ao conectar ao banco de dados!\n' + err.stack) }
  console.log('[MONGO] - Conectado com sucesso!')
})

const users = model('Users', new Schema({
  _id: { type: String, required: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  daily: { type: Number, default: 0 }
}))

exports.users = users
