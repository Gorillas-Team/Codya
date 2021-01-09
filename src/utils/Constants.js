module.exports.emojis = {
  bye: '👋',
  picture: '🖼️',
  satellite: '📡',
  right: '✅',
  volumeUp: '🔊',
  volumeDown: '🔉',
  stopped: '⏹️',
  skipped: '⏭️',
  repeatOne: '🔂',
  repeatAll: '🔁',
  sleeping: '😴',
  paused: '⏸️',
  playing: '▶️',
  dvd: '📀',
  lamp: '💡',
  cop: '👮',
  star: '⭐',
  balance: '💰',
  handshake: '🤝'
}

module.exports.permissions = {
  ADMINISTRATOR: 'Administrador',
  CREATE_INSTANT_INVITE: 'Criar convite instantâneo',
  BAN_MEMBERS: 'Banir Membros',
  KICK_MEMBERS: 'Expulsar Membros',
  MANAGE_CHANNELS: 'Gerenciar Canais',
  MANAGE_GUILD: 'Gerenciar Servidor',
  ADD_REACTIONS: 'Adicionar Reações',
  VIEW_AUDIT_LOG: 'Ver registro de auditoria',
  PRIORITY_SPEAKER: 'Voz prioritária',
  MANAGE_MESSAGES: 'Gerenciar Mensagens',
  EMBED_LINKS: 'Inserir Links',
  ATTACH_FILES: 'Anexar Arquivos',
  MENTION_EVERYONE: 'Mencionar todos',
  USE_EXTERNAL_EMOJIS: 'Usar Emojis externos',
  EXTERNAL_EMOJIS: 'Usar Emojis Externos',
  CONNECT: 'Conectar',
  SPEAK: 'Falar',
  USE_VAD: 'Usar detecção de voz',
  CHANGE_NICKNAME: 'Mudar meu nome',
  MANAGE_NICKNAMES: 'Gerenciar Nomes',
  MANAGE_ROLES: 'Gerenciar Roles',
  MANAGE_WEBHOOKS: 'Gerenciar Webhook',
  MANAGE_EMOJIS: 'Gerenciar Emojis'
}

exports.bitfields = {
  modules: {
    logs: (1 << 0),
    autoRole: (1 << 1),
    autoMod: (1 << 2)
  },
  settings: {
    logs: {
      punishment: (1 << 0),
      messages: (1 << 1),
      users: (1 << 2)
    },
    autoMod: {
      spam: (1 << 0),
      flood: (1 << 1),
      accountAge: (1 << 2),
      caps: (1 << 3)
    }
  }
}
