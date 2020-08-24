module.exports = {
  // Discord options
  fetchAllMembers: true,

  // Bot options
  token: process.env.TOKEN,
  database: process.env.DATABASE_URI,
  devs: JSON.parse(process.env.DEVELOPERS),
  prefixes: JSON.parse(process.env.PREFIXES),
  nodes: JSON.parse(process.env.LAVALINK_NODES)
}
