const { Controller } = require('@Kong/structures')
const { Playlist } = require('@Kong/audio')
const { CooldownManager } = require('@Kong/utils')

const generateXp = () => Math.floor(Math.random() * 3) + 2

class UserController extends Controller {
  constructor (client) {
    super({
      name: 'users',
      repositoryName: 'users'
    }, client)

    this.cooldown = new CooldownManager(60000)
  }

  async createPlaylist (user, name) {
    const document = await this.repository.find(user.id)
    const playlist = new Playlist(name)

    await document.updateOne({ $push: { playlists: playlist } })

    return playlist
  }

  async addTrackOnPlaylist (user, name, track) {
    const { document, playlist } = await this.findPlaylist(user, name)

    playlist.tracks.push(track)
    await document.save()

    return playlist.tracks
  }

  async findPlaylist (user, name) {
    const document = await this.repository.find(user.id)
    const playlist = document.playlists.find(playlist => playlist.name === name)

    return {
      document,
      playlist
    }
  }

  async hasPlaylistWithSameName (user, name) {
    const document = await this.repository.find(user.id)
    const playlist = document.playlists.find(playlist => playlist.name === name)

    return playlist != null
  }

  async addXpOnUser (id) {
    const user = await this.repository.find(id)

    if (this.cooldown.has(id)) return
    const xp = generateXp()

    await user.updateOne({ $inc: { xp } })

    if ((user.xp + xp) >= user.level * 60) {
      await user.updateOne({ xp: 0, $inc: { level: 1 } })
    }

    this.cooldown.add(id)
  }
}

module.exports = UserController
