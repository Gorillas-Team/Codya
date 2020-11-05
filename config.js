/**
 * @type {ClientOptions | import('eris').ClientOptions | object}
 */
module.exports = {
  // Discord options
  restMode: true,

  // Bot options
  /**
   * @type {string}
   */
  token: process.env.TOKEN,
  /**
   * @type {string[]}
   */
  devs: JSON.parse(process.env.DEVELOPERS || []),

  /**
   * @type {string[]}
   */
  prefixes: JSON.parse(process.env.PREFIXES || []),

  /**
   * @type {Options | import('sequelize/types').Options}
   */
  database: {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    logging: false
  }
}
