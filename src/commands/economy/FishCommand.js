const { Command, KongError, KongEmbed } = require('@Kong/structures')
const { TimeUtils, CodeUtils } = require('@Kong/utils')

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

      throw new KongError(`Faltam \`${parsedTime}\` para pescar novamente.`)
    }

    const { price, claimedFish } = await fish.claimFish(ctx.author)

    const embed = new KongEmbed()
      .setTitle(`${this.client.getEmoji('fish')} | Pescaria`)
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
