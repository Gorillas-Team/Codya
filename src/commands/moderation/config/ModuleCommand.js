const { Command, CodyaEmbed, CodyaError } = require('@Codya/structures')
const { BitField, Constants: { bitfields: { settings } } } = require('@Codya/utils')

const capitalize = (text) => text && (text[0].toUpperCase() + text.slice(1))
const mapSettings = (setting) => Object.keys(setting).map(capitalize).join('\n')

class ModuleCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'module',
      parent: 'config',
      args: [
        {
          type: 'string',
          options: { length: 1, full: false, lowerCase: true }
        },
        {
          type: 'string',
          options: { lowerCase: true }
        }
      ]
    })
  }

  async run (ctx, moduleName, setting) {
    const embed = new CodyaEmbed()
    if (!moduleName) {
      embed.setAuthor('Configurações dos módulos')
        .setColor(0xED4DA)
        .addField('Auto Mod', mapSettings(settings.automod))
        .addField('Logs', mapSettings(settings.logs))
        .setFooter(`Uso: ${ctx.prefix}${ctx.cmd} module autoMod accountAge`)

      return ctx.sendMessage(embed)
    }

    const data = await this.client.repositories.guilds.find(ctx.guild.id)
    const moduleSetting = this.findModuleAndSetting(moduleName, setting)

    if (!moduleSetting) throw new CodyaError('Essa configuração ou módulo não existe.')

    const dataSetting = data.get().settings[moduleName]

    const bitField = new BitField(dataSetting)

    const settingStatus = bitField.has(moduleSetting)
    settingStatus ? bitField.remove(moduleSetting) : bitField.add(moduleSetting)

    data.set(`settings.${moduleName}`, bitField.bits)

    await data.save()

    return ctx.sendMessage('fodase n perguntei :call_me:', settingStatus ? 'off' : 'on')
  }

  findModuleAndSetting (moduleName, setting) {
    const moduleSettings = settings[moduleName]

    return moduleSettings && moduleSettings[setting]
  }
}

module.exports = ModuleCommand
