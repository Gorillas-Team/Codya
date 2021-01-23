const { fishs } = require('../../../assets')
const { Constants: { fishChances, fishPrices } } = require('@Codya/utils')
const { Controller, CodyaError } = require('@Codya/structures')

class FishController extends Controller {
  constructor (client) {
    super({
      name: 'fish',
      repositoryName: 'users'
    }, client)
  }

  async claimFish (user) {
    const fish = this.getFish()
    if (!fish) throw new CodyaError('Infelizmente nenhum peixe foi encontrado, tente novamente.')

    const data = await this.repository.find(user.id)
    const price = fishPrices[fish.rarity]

    data.set('cooldown.fish', Date.now() + 20)
    data.set(`fish.stats.${fish.rarity}`, data.get(`fish.stats.${fish.rarity}`) + 1)
    await data.save()

    data.increment('money', price)

    return {
      price,
      claimedFish: fish
    }
  }

  async isInCooldown (user) {
    const data = await this.repository.find(user.id)

    const cooldown = data.get('cooldown.fish')

    return cooldown >= Date.now()
  }

  getFish () {
    const percentage = Math.random()
    const checkChance = (rarityValue) => (percentage < (rarityValue / 100))

    for (const rarity in fishChances) {
      if (checkChance(fishChances[rarity])) return this.getRandomFishFromRarity(rarity)
    }

    return null
  }

  getRandomFishFromRarity (rarity) {
    const filter = (fish) => fish.rarity === rarity
    const fishsFromRarity = fishs.filter(filter)

    return fishsFromRarity[Math.floor(Math.random() * fishsFromRarity.length)]
  }
}

module.exports = FishController
