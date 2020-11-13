const { Controller } = require('@Codya/structures')
const { CooldownManager } = require('@Codya/utils')

const generateXp = () => Math.floor(Math.random() * 3) + 2

class UserController extends Controller {
  constructor (client) {
    super({
      name: 'users',
      repositoryName: 'users'
    }, client)

    this.cooldown = new CooldownManager(5000)
  }

  async addXpOnUser (id) {
    const user = await this.repository.find(id)

    if (this.cooldown.has(id)) return

    const data = user.get()
    const xp = generateXp()

    user.increment('xp', xp)

    if ((data.xp + xp) >= data.level * 60) {
      user.set('xp', 0)
      await user.save()

      user.increment('level', 1)
    }
      
    this.cooldown.add(id)
  }
}

module.exports = UserController
