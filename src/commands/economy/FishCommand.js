const { Command, CodyaError, CodyaEmbed } = require('@Codya/structures')
const { TimeUtils, CodeUtils } = require('@Codya/utils')

class FishCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'fish',
      aliases: ['pescar'],
      category: 'economy'
    })
  }

  async run (ctx) {
    const { fish } = this.client.controllers

    if (await fish.isInCooldown(ctx.author)) {
      const user = await this.client.repositories.users.find(ctx.author.id)
      const parsedTime = TimeUtils.compareTime(user.cooldown.fish)

      throw new CodyaError(`Faltam \`${parsedTime}\` para pescar novamente.`)
    }

    const { price, claimedFish } = await fish.claimFish(ctx.author)

    const embed = new CodyaEmbed()
      .setTitle('CODYA PESCAS')
      .setDescriptionFromArray([
        `Peixe: \`${claimedFish.name}\``,
        `Raridade: \`${CodeUtils.capitalize(claimedFish.rarity)}\``,
        `Preço: \`${price}\``
      ])
      .setColor(0xff7700)
      .setThumbnail(claimedFish.image)

    return ctx.sendMessage(embed)
  }
}

module.exports = FishCommand
