const { Command, CodyaError } = require('@Codya/structures')

class PlaylistPlayCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'play',
      parent: 'playlist',
      args: [{
        type: 'string',
        options: {
          required: true,
          messages: {
            missing: 'Você precisa informar o nome de sua playlist.'
          }
        }
      }]
    })
  }

  async run (ctx, name) {
    const memberState = ctx.member.voiceState
    if (!memberState.channelID) {
      throw new CodyaError('Você precisa estar em um canal de voz para executar este comando.')
    }

    const selfState = ctx.selfMember.voiceState

    if (selfState.channelID && memberState.channelID !== selfState.channelID) {
      throw new CodyaError('Você precisa estar no mesmo canal que eu.')
    }

    const { playlist } = await this.client.controllers.users.findPlaylist(ctx.author, name)
    if (!playlist) throw new CodyaError('Essa playlist não existe.')

    if (playlist.tracks.length <= 0) throw new CodyaError(`Sua playlist não tem músicas, utilize o comando \`${ctx.prefix}playlist add\` para adicionar.`)

    const bestNode = await this.client.lavalink.idealNodes[0]

    if (!bestNode) {
      throw new CodyaError('Não há nodes disponíveis.')
    }

    const player = await this.client.lavalink.join({
      node: bestNode.id,
      channel: memberState.channelID,
      guild: ctx.message.guildID
    }).catch(err => {
      this.client.logger.error(err)
      throw new CodyaError('Um erro ocorreu ao criar o player.')
    })

    if (player.queue.length >= 250) {
      throw new CodyaError('A fila está cheia.')
    }

    player.setContext(ctx)
    ctx.guild.music = player

    const tracks = await this.client.lavalink.decodeTracks(playlist.tracks, ctx.author)

    const sliceTracks = tracks.slice(0, 250)

    ctx.sendMessage(`Adicionado um total de \`${sliceTracks.length}\` músicas da sua playlist \`${playlist.name}\``)
    for (const track of sliceTracks) {
      await player.play(track)
    }
  }
}

module.exports = PlaylistPlayCommand
