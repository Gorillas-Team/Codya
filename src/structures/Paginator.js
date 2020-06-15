module.exports = function Paginator ({ elements, length }) {
  this.pages = {
    actual: 1,
    total: Math.ceil(elements.length / length),
    length
  }

  this.nextPage = function nextPage () {
    const { actual, total } = this.pages
    if (actual < total) this.pages.actual++

    return this
  }

  this.prevPage = function prevPage () {
    const { actual } = this.pages
    if (actual > 1) this.pages.actual--

    return this
  }

  this.get = function get (removeFirst = false) {
    if (typeof removeFirst !== 'boolean') throw new TypeError('The "path" argument must be of type boolean. Received ' + typeof removeFirst)
    const { actual, length } = this.pages

    const [first, second] = getIndexs({ actual, length })
    const result = elements.slice(first + removeFirst, second)

    return result
  }
}

function getIndexs ({ actual, length }) {
  if (typeof actual !== 'number' || typeof length !== 'number') throw new TypeError(':pensive:')

  const first = (actual - 1) * length
  const second = actual * length
  return [first, second]
}
