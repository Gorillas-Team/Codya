const { Controller } = require('@Codya/structures')
const { CodeUtils } = require('@Codya/utils')
const { works } = require('../../../assets')

class EconomyController extends Controller {
  constructor (client) {
    super({
      name: 'economy',
      repositoryName: 'users'
    }, client)
  }

  /**
   * @param {import('eris').User} user
   * @returns {import('../../database/models/associations/Machine')[]}
   */
  async getUserMachines (user) {
    const document = await this.repository.find(user.id)

    return document.machines
  }

  /**
   * @param {import('eris').User} user
   * @returns {number}
   */
  async work (user) {
    const document = await this.repository.find(user.id)

    const { work } = document
    const { cooldown, budget: { min, max } } = work

    const amount = CodeUtils.random(min, max)

    await document.updateOne({
      cooldown: { work: Date.now() + cooldown },
      $inc: { money: amount }
    })

    return amount
  }

  /**
   * @param {import('eris').User} user
   * @param {string} workName
   * @returns {object}
   */
  async chooseWork (user, workName) {
    const document = await this.repository.find(user.id)
    const work = works[workName]

    if (!work) return

    await document.updateOne({ work })

    return work
  }

  /**
   * @param {import('eris').User} user
   * @returns {boolean}
   */
  async isInWorkCooldown (user) {
    const { cooldown } = await this.repository.find(user.id)

    return cooldown.work >= Date.now()
  }

  /**
   * @param {import('eris').User} user
   * @returns {boolean}
   */
  async hasWork (user) {
    const document = await this.repository.find(user.id)

    return document.work !== null
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

    await document.updateOne({ $inc: { money: -amount } })
    await targetDocument.updateOne({ $inc: { money: amount } })

    if (document.money < 0) {
      await document.updateOne({ money: 0 })
    }
  }

  /**
   *
   * @param {import('eris').User} user
   * @param {number} amount
   * @returns {boolean}
   */
  async canPay (user, amount) {
    const { money } = await this.repository.find(user.id)

    return money >= amount
  }

  /**
   * @param {import('eris').User} user
   * @returns {number | void}
   */
  async claimDaily (user) {
    const document = await this.repository.find(user.id)
    const amount = CodeUtils.random(1, 5000)

    await document.updateOne({
      money: amount,
      cooldown: {
        daily: Date.now() + 86400000
      }
    })

    return amount
  }

  /**
   * @param {import('eris').User} user
   * @returns {boolean}
   */
  async isInDailyCooldown (user) {
    const { cooldown: { daily } } = await this.repository.find(user.id)

    return daily >= Date.now()
  }
}

module.exports = EconomyController
