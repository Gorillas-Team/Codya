const cooldownTypes = {
  get set () {
    return new Set()
  },
  get map () {
    return new Map()
  }
}

/**
 * @name CooldownManager
 * @class
 */
class CooldownManager {
  /**
   * @param {number} time
   * @param {('set'|'map')} [type='set']
   */
  constructor (time, type = 'set') {
    this.time = time
    this.type = type

    this.cooldown = cooldownTypes[type] || new Set()
  }

  has (key) {
    return this.cooldown.has(key)
  }

  get (key) {
    if (!(this.cooldown instanceof Map)) return 0
    return this.cooldown.get(key)
  }

  add (key, value) {
    setTimeout(() => this.delete(key), this.time)

    if (this.cooldown instanceof Map) return this.cooldown.set(key, value)

    return this.cooldown.add(key)
  }

  delete (key) {
    return this.cooldown.delete(key)
  }
}

module.exports = CooldownManager
