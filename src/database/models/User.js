const { Model } = require('mongorito')
const Playlist = require('./associations/Playlist')
const Machine = require('./associations/Machine')

class User extends Model { }

User.embeds('playlist', Playlist)
User.embeds('machines', Machine)

module.exports = User
