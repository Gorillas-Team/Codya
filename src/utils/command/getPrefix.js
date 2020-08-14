module.exports = (message) => {
  const content = message.content.toLowerCase()
  return message.client.config.prefixes.find(prefix => content.startsWith(prefix))
}
