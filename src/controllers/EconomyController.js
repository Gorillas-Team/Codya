const { Controller } = require('@Codya/structures')
const { works } = require('../../assets/')

class EconomyController extends Controller {
  constructor (client) {
    super({
      name: 'economy',
      repositoryName: 'users'
    }, client)
  }

  /**
   * @param {import('eris').User} user
   * @returns {import('../database/models/associations/Machine')[]}
   */
  async getUserMachines (user) {
    const document = await this.repository.find(user.id)

    return document.get().machines
  }

  /**
   * @param {import('eris').User} user
   * @returns {number}
   */
  async work (user) {
    const document = await this.repository.find(user.id)

    const { work } = document.get()
    const { minimumBudget, maximumBudget, workCooldown } = work

    const amount = minimumBudget + (Math.floor(Math.random() * (maximumBudget - minimumBudget)))

    document.set('workCooldown', Date.now() + workCooldown)
    await document.save()

    document.increment('money', amount)

    return amount
  }

  /**
   * @param {import('eris').User} user
   * @param {string} workName
   * @returns {object}
   */
  async chooseWork (user, workName) {
    const document = await this.repository.find(user.id)

    if (!(workName in works)) return

    const work = works[workName]

    document.set('work', work)
    await document.save()

    return work
  }

  /**
   * @param {import('eris').User} user
   * @returns {boolean}
   */
  async isInWorkCooldown (user) {
    const document = await this.repository.find(user.id)

    const { workCooldown } = document.get()

    return workCooldown >= Date.now()
  }

  /**
   * @param {import('eris').User} user
   * @returns {boolean}
   */
  async hasWork (user) {
    const document = await this.repository.find(user.id)

    const { work } = document.get()

    return work != null
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
    const amount = Math.floor(Math.random() * 5000)

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

    const { dailyCooldown } = document.get()

    return dailyCooldown >= Date.now()
  }
}

module.exports = EconomyController
