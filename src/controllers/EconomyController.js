const { Controller } = require('@Codya/structures')

class EconomyController extends Controller {
  constructor (client) {
    super({
      name: 'economy',
      repositoryName: 'users'
    }, client)
  }

  /**
   * @param {import('eris').User} user
   * @param {import('eris').User} target
   * @param {number} amount
   * @returns {void}
   */
  async pay (user, target, amount) {
    const document = await this.repository.find(user.id)
    const targetDocument = await this.repository.find(target.id)

    document.increment('money', -amount)
    targetDocument.increment('money', amount)

    if (document.get().money < 0) {
      document.set('money', 0)
      await document.save()
    }
  }

  /**
   *
   * @param {import('eris').User} user
   * @param {number} amount
   * @returns {boolean}
   */
  async canPay (user, amount) {
    const document = await this.repository.find(user.id)

    const money = document.get().money

    return money >= amount
  }

  /**
   * @param {import('eris').User} user
   * @returns {number | void}
   */
  async claimDaily (user) {
    const document = await this.repository.find(user.id)
    const amount = Math.floor(Math.random() * 500)

    document.set('dailyCooldown', Date.now() + 86400000)
    await document.save()

    document.increment('money', amount)

    return amount
  }

  /**
   * @param {import('eris').User} user
   * @returns {boolean}
   */
  async isInDailyCooldown (user) {
    const document = await this.repository.find(user.id)

    const dailyCooldown = document.get().dailyCooldown

    return dailyCooldown >= Date.now()
  }
}

module.exports = EconomyController
