const { KongError } = require('../../command/')
const Argument = require('../Argument')

class UserArgument extends Argument {
  constructor (options = {}) {
    super(options)

    this.isMember = options.isMember || false
    this.canBeAuthor = options.canBeAuthor || false
  }

  findMember (context, args) {
    return context.guild.members.get(args[0]) || context.guild.members.get(context.mentions[0].id)
  }

  async findUser (context, args) {
    return context.client.getRESTUser(args[0]).catch(() => context.mentions[0])
  }

  async parse (context, args) {
    let user

    if (args[0]) {
      user = this.isMember ? this.findMember(context, args) : await this.findUser(context, args)

      if (!user) this.missing = true
      if (!this.canBeAuthor && user === context.author) throw new KongError('O usuário não pode ser você mesmo.')
    } else {
      user = this.canBeAuthor ? this.isMember ? context.member : context.author : this.missing = true
    }

    return [user, args]
  }
}

module.exports = UserArgument
