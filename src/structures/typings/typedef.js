/**
 * @typedef ListenerOptions
 * @property {string} name
 * @property {boolean} [once=false]
 * @property {Codya | import('../../Codya')} [client]
 */

/**
 * @typedef CommandOptions
 * @property {string} name
 * @property {string} description
 * @property {string[]} [aliases=[]]
 * @property {string} [category]
 * @property {string} [usage]
 * @property {import('../arguments/Argument')[]} args
 * @property {number} [cooldownTime=3]
 * @property {import('../../utils/CooldownManager')} cooldown
 * @property {boolean} [dev=false]
 * @property {boolean} [hide=false]
 */
module.exports = {}
