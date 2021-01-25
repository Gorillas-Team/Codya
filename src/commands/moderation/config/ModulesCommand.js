const { Command, CodyaEmbed, CodyaError } = require('@Codya/structures')
const { Constants: { bitfields }, BitField } = require('@Codya/utils')

const capitalize = (text) => text && (text[0].toUpperCase() + text.slice(1))
const toLowerCase = (text) => text.toLowerCase()
const MODULES = Object.keys(bitfields.modules)

class ModulesCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'modules',
      parent: 'config',
      args: [{
        type: 'string',
        options: {
          length: 1,
          full: false,
          required: false,
          messages: {
            missing: 'Você precisa informar o nome do módulo que quer habilitar ou desabilitar'
          }
        }
      }]
    })
  }

  /**
   * @param {import('../../../structures/command/CommandContext')} ctx
   * @param {string} moduleName
   */
  async run (ctx, moduleName) {
    const data = await this.client.repositories.guilds.find(ctx.guild.id)
    const bitField = new BitField(data.modules)

    if (!moduleName) {
      const enabledModules = this.getModules(bitField) || 'Nenhum'
      const disabledModules = this.getModules(bitField, false) || 'Nenhum'

      const embed = new CodyaEmbed()
        .setAuthor(`Módulos - ${ctx.guild.name}`, ctx.guild.iconURL)
        .addField(`${this.client.getEmoji('on')} | Habilitados:`, enabledModules)
        .addField(`${this.client.getEmoji('off')} | Desabilitados:`, disabledModules)
        .setColor(0x0ED4DA)

      return ctx.sendMessage(embed)
    }

    const mod = this.findModule(moduleName)
    if (!mod.fetchedModule) throw new CodyaError(`Módulo inexistente: \`${MODULES.map(capitalize).join('`, `')}\`.`)

    const modStatus = bitField.has(mod.fetchedModule)
    modStatus ? bitField.remove(mod.fetchedModule) : bitField.add(mod.fetchedModule)

    const state = modStatus ? 'desativado' : 'ativado'

    data.set('modules', bitField.bits)

    await data.save()
    ctx.sendMessage(`O módulo \`${mod.name}\` foi \`${state}\` com sucesso.`, modStatus ? 'off' : 'on')
  }

  /**
   *
   * @param {string} argument
   */
  findModule (argument) {
    const check = (mod) => toLowerCase(mod) === toLowerCase(argument)
    const moduleName = MODULES.find(check)

    return {
      name: capitalize(moduleName),
      fetchedModule: bitfields.modules[moduleName]
    }
  }

  getModules (bitField, active = true, join = true) {
    const map = (modules, separator) => modules.map(key => ' - ' + capitalize(key)).join(separator)
    const modules = MODULES.filter(mod => active ? bitField.has(bitfields.modules[mod]) : !bitField.has(bitfields.modules[mod]))

    return (join ? map(modules, '\n') : modules)
  }
}

module.exports = ModulesCommand
