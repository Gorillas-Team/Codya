/**
 * @typedef ListenerOptions
 * @property {string} name
 * @property {boolean} [once=false]
 * @property {Kong | import('../../Kong')} [client]
 */

/**
 * @typedef CommandOptions
 * @property {string} name
 * @property {string} description
 * @property {string[]} [aliases=[]]
 * @property {string} [category]
 * @property {string} [usage]
 * @property {string} [parent]
 * @property {Argument[] | import('../arguments/Argument')[]} args
 * @property {number} [cooldownTime=3]
 * @property {import('../../utils/CooldownManager')} cooldown
 * @property {boolean} [dev=false]
 * @property {boolean} [hide=false]
 */

/**
 * @typedef ControllerOptions
 * @property {string} name
 * @property {import('../Repository')} repository
 */
module.exports = {}
