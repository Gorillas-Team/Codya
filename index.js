const Client = require('./src/Kong.js')
const config = require('./config')

const Kong = new Client(config.token, config)

Kong.start()
