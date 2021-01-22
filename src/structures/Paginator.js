/**
 * @name Paginator
 * @constructor
 */
class Paginator {
  /**
   *
   * @param {object} options
   * @param {any[]} options.elements
   * @param {number} options.size
   */
  constructor (options = {}) {
    this.elements = options.elements

    this.pages = {
      actual: 1,
      total: Math.ceil(options.elements.length / options.size),
      size: options.size
    }
  }

  /**
   * @returns {Paginator}
   */
  nextPage () {
    const { actual, total } = this.pages
    if (actual < total) this.pages.actual++

    return this
  }

  /**
   * @returns {Paginator}
   */
  prevPage () {
    const { actual } = this.pages
    if (actual > 1) this.pages.actual--

    return this
  }

  /**
   * @param {boolean} removeFirst
   * @returns {any[]}
   */
  get (removeFirst = false) {
    if (typeof removeFirst !== 'boolean') {
      throw new TypeError('Expected boolean but received ' + typeof removeFirst)
    }
    const { actual, size } = this.pages

    const first = (actual - 1) * size
    const second = actual * size

    return this.elements.slice(first + removeFirst, second)
  }
}

module.exports = Paginator
