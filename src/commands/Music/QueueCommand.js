const { Command, Paginator } = require('../../structures')

module.exports = class extends Command {
  constructor (client) {
    super(client, {
      name: 'queue',
      aliases: ['fila'],
      usage: '<prefix><cmd>',
      description: 'Veja a fila de músicas de sua guild.',
      category: 'Music'
    })

    this.conf = {
      voiceChannelOnly: true,
      queueOnly: true
    }
  }

  async run ({ channel, guild, author }) {
    const queue = guild.music.queue

    const embeds = {
      error: this.embed({ author, color: 'red' }), default: this.embed({ author })
    }

    const paginator = new Paginator({ elements: queue, length: 10 })

    const embed = embeds.default
      .setAuthor('Fila de músicas.', author.displayAvatarURL())
      .setDescription(`**Tocando agora:** \`${queue[0].info.title}\``)
      .setFooter('Página ' + paginator.pages.actual + ' de ' + paginator.pages.total + ' | ' + embeds.default.footer.text)

    if (queue.length > 1) {
      embed.setDescription(`${embed.description}
            
                **Próximas músicas: [${queue.length - 1}]**
            
                ${paginator.get(true).map(mapSongs.bind(null, paginator)).join('\n')} 
              `)
    }

    const msg = await channel.send(embed)

    if (queue.length <= 10) return

    const emojis = ['⬅️', '⛔', '➡️']

    for (const emoji of emojis) {
      await msg.react(emoji)
    }

    const filter = (reaction, user) => user.id === author.id

    const collector = msg.createReactionCollector(filter, { time: 120000 })

    collector.on('collect', async (r) => {
      switch (r.emoji.name) {
        case emojis[0]: {
          paginator.prevPage()

          const isFirstPage = paginator.pages.actual === 1
          const songs = paginator.get(isFirstPage)

          embed.setDescription(`**Tocando agora:** \`${queue[0].info.title}\`
            
                    **Próximas músicas: [${queue.length - 1}]**

                    ${songs.map(mapSongs.bind(null, paginator)).join('\n')}`)

          embed.setFooter('Página ' + paginator.pages.actual + ' de ' + paginator.pages.total)

          r.users.remove(author.id).catch(console.error)
          msg.edit(embed)
          break
        }
        case emojis[1]:
          collector.stop()
          break

        case emojis[2]: {
          const songs = paginator.nextPage().get()
          embed.setDescription(`**Tocando agora:** \`${queue[0].info.title}\`
            
                    **Próximas músicas: [${queue.length - 1}]**

                    ${songs.map(mapSongs.bind(null, paginator)).join('\n')}`)
          embed.setFooter('Página ' + paginator.pages.actual + ' de ' + paginator.pages.total)

          r.users.remove(author.id).catch(console.error)
          msg.edit(embed)
          break
        }
      }
    })

    collector.on('end', msg.delete)
  }
}

function getIndexSong ({ actual, length }) {
  return actual === 1 ? (actual - 1) * length + 1 : (actual - 1) * length
}

function mapSongs (paginator, song, index) {
  return `**${getIndexSong(paginator.pages) + index}). **\`${song.info.title}\` - **Requisitado por: \`${song.info.requester.username}\`**`
}
