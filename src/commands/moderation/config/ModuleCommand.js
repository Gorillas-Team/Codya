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
          options: { length: 1, full: false }
        },
        {
          type: 'string'
        }
      ]
    })
  }

  async run (ctx, moduleName, setting) {
    const embed = new CodyaEmbed()
    if (!moduleName) {
      embed.setAuthor('FODA SE!!!')
        .setColor(0xED4DA)
        .addField('Auto Mod', mapSettings(settings.autoMod))
        .addField('Logs', mapSettings(settings.logs))
        .setFooter(`Uso: ${ctx.prefix}${ctx.cmd} module autoMod accountAge`)

      return ctx.sendMessage(embed)
    }

    const data = await this.client.repositories.guilds.find(ctx.guild.id)
    const moduleSetting = this.findModuleAndSetting(moduleName, setting)

    if (!moduleSetting) throw new CodyaError('acho q vc tá maluco')

    const dataSetting = data.get().settings[moduleName]

    const bitField = new BitField(dataSetting)

    const settingStatus = bitField.has(moduleSetting)
    settingStatus ? bitField.remove(moduleSetting) : bitField.add(moduleSetting)

    data.set(`settings.${moduleName}`, bitField.bits)

    await data.save()

    console.log(data.get())

    return ctx.sendMessage('fodase n perguntei :call_me:', settingStatus ? 'off' : 'on')
  }

  findModuleAndSetting (moduleName, setting) {
    if (!(moduleName in settings)) return null

    const moduleSettings = settings[moduleName]

    if (!(setting in moduleSettings)) return null

    return moduleSettings[setting]
  }
}

module.exports = ModuleCommand
