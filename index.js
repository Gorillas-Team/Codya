const Client = require('./src/Codya.js')
const config = require('./config')

const Codya = new Client(config.token, config)

Codya.start().then(() => {
  console.log('Bot initialized with success.')
})
