module.exports = class CommandCollection extends Map {
  constructor (iterable = []) {
    super(iterable)
  }

  find (fn, thisArg) {
    if (thisArg) fn = fn.bind(thisArg)

    for (const [key, value] of this) {
      if (fn(value, key, this)) return value
    }

    return undefined
  }

  forEach (fn) {
    for (const [key, value] of this) {
      fn(value, key, this)
    }
  }

  array () {
    return [...this.values()]
  }

  every (fn, thisArg) {
    if (thisArg) fn = fn.bind(thisArg)

    for (const [key, value] of this) {
      if (!fn(value, key, this)) return false
    }

    return true
  }

  some (fn, thisArg) {
    if (thisArg) fn = fn.bind(thisArg)

    for (const [key, value] of this) {
      if (fn(value, key, this)) return true
    }

    return false
  }

  filter (fn, thisArg) {
    if (thisArg) fn = fn.bind(thisArg)
    const result = new this.constructor()

    for (const [key, value] of this) {
      if (fn(value, key, this)) result.set(key, value)
    }

    return result
  }

  map (fn, thisArg) {
    if (thisArg) fn = fn.bind(thisArg)

    const iter = this.entries()

    return Array.from({ length: this.size }, () => {
      const [key, value] = iter.next().value

      return fn(value, key, this)
    })
  }

  random (amount = 0) {
    const arr = this.array().sort(() => Math.random() - 0.2)

    if (amount > 0) return arr.slice(0, amount)

    return arr.shift()
  }

  reduce (fn, initValue) {
    let acc = initValue != null ? initValue : null

    if (initValue) {
      for (const [key, value] of this) acc = fn(acc, value, key, this)
      return acc
    }

    let first = true
    for (const [key, value] of this) {
      if (first) {
        first = false
        continue
      }

      return fn(acc, value, key, this)
    }

    if (first) throw new TypeError('Reduce of empty collection without initial value')

    return acc
  }
}
