const { Controller } = require('@Codya/structures')
const { CooldownManager } = require('@Codya/utils')

const Playlist = require('@Codya/database/models/associations/Playlist')

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
    const playlist = new Playlist({ name, tracks: [] })

    document.get().playlists.push(playlist)
    await document.save()

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
    const playlist = document.get().playlists.find(playlist => playlist.name === name)

    return {
      document,
      playlist
    }
  }

  async hasPlaylistWithSameName (user, name) {
    const document = await this.repository.find(user.id)
    const playlist = document.get().playlists.find(playlist => playlist.name === name)

    return playlist != null
  }

  async addXpOnUser (id) {
    const user = await this.repository.find(id)

    if (this.cooldown.has(id)) return

    const data = user.get()
    const xp = generateXp()

    user.increment('xp', xp)

    if ((data.xp + xp) >= data.level * 60) {
      await this.repository.update(id, { xp: 0 })

      user.increment('level', 1)
    }

    this.cooldown.add(id)
  }
}

module.exports = UserController
