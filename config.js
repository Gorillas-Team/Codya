module.exports = {
  // Discord options
  fetchAllMembers: true,

  // Bot options
  database: process.env.DATABASE_URI,
  token: process.env.TOKEN,
  devs: JSON.parse(process.env.DEVELOPERS),
  prefixes: JSON.parse(process.env.PREFIXES),
  nodes: JSON.parse(process.env.LAVALINK_NODES)
}
