const { Model } = require('mongorito')
const { Machine } = require('./associations/Machine')

class User extends Model { }

User.embeds('mechines', Machine)

module.exports = User
