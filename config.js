module.exports = {
  // Discord options
  fetchAllMembers: true,

  // Bot options
  token: process.env.TOKEN,
  devs: JSON.parse(process.env.DEVELOPERS),
  prefixes: JSON.parse(process.env.PREFIXES),

  database: {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD
  }
}
