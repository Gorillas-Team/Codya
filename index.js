const Client = require('./src/Codya.js')
const config = require('./config')

const Codya = new Client(config)

Codya.start()
