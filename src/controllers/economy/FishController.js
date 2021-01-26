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

    await data.updateOne({
      fish: {
        stats: {
          [fish.rarity]: data.fish.stats[fish.rarity] + 1
        }
      },
      cooldown: {
        ...data.cooldown,
        fish: Date.now() + 20000
      },
      $inc: {
        money: price
      }
    })

    return {
      price,
      claimedFish: fish
    }
  }

  async isInCooldown (user) {
    const data = await this.repository.find(user.id)

    return data.cooldown.fish >= Date.now()
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
