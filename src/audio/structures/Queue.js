class Queue extends Array {
  get duration () {
    return this.reduce((acc, val) => acc + val.info.length, 0)
  }

  get empty () {
    return this.length < 1
  }

  first () {
    return this[0]
  }

  add (prop) {
    return this.push(prop)
  }

  removeFirst () {
    return this.shift()
  }

  remove (index) {
    return this.splice(index, 1)[0]
  }
}

module.exports = Queue
