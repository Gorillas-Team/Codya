const { readFileSync } = require('fs')

module.exports = {
  machines: require('./machines.json'),

  admin: readFileSync('./assets/admin.mp4'),
  banned: readFileSync('./assets/banned.mp4'),
  daddyon: readFileSync('./assets/daddyon.mp4'),
  djAzeitona: readFileSync('./assets/dj_azeitona.mp4')
}
