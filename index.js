const Client = require('./src/Codya.js')

const Codya = new Client({
  fetchAllMembers: true,
  presence: {
    activity: {
      name: '@Codya help 😳',
      type: 'WATCHING'
    }
  }
})

Codya.login()
