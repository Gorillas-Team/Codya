const getPrefix = message => {
  const content = message.content.toLowerCase()
  return message.client.config.prefixes.find(prefix =>
    content.startsWith(prefix)
  )
}

module.exports = getPrefix
