/**
 * @name CodyaEmbed
 * @constructor
 */

class CodyaEmbed {
  /**
   * @param {import('eris').User} user
   * @returns {string}
   */
  constructor (user) {
    this.title = null
    this.image = null
    this.color = null
    this.footer = null
    this.author = null
    this.description = null
    this.thumbnail = null
    this.timestamp = null
    this.fields = []

    if (user) {
      this.setFooter(`Executado por: ${user.getAsTag()}`)
    }
  }

  /**
   * @param {string} name
   * @param {string} value
   * @param {boolean} [inline=false]
   * @returns {CodyaEmbed}
   */
  addField (name, value, inline = false) {
    this.fields.push({ name, value, inline })
    return this
  }

  /**
   * @param {...({ name:string|number, value:string|number, inline:boolean = false})} fields
   * @returns {CodyaEmbed}
   */
  addFields (...fields) {
    const resolve = ({ name, value, inline }) => (this.addField(name, value, inline))
    fields.flat(2).forEach(resolve)

    return this
  }

  /**
   * @param {string} name
   * @param {string} [iconURL]
   * @param {string} [url]
   * @returns {CodyaEmbed}
   */
  setAuthor (name, iconURL, url) {
    this.author = { name, icon_url: iconURL, url }
    return this
  }

  /**
   * @param {number} color
   * @returns {CodyaEmbed}
   */
  setColor (color) {
    this.color = color
    return this
  }

  /**
   * @param {string} description
   * @returns {CodyaEmbed}
   */
  setDescription (description) {
    this.description = description
    return this
  }

  /**
   * @param {string[]} array
   * @returns {CodyaEmbed}
   */
  setDescriptionFromArray (array) {
    const string = array.join('\n')

    this.setDescription(string)
    return this
  }

  /**
   * @param {string} text
   * @param {string} [iconURL]
   * @returns {CodyaEmbed}
   */
  setFooter (text, iconURL) {
    this.footer = { text, iconURL }
    return this
  }

  /**
   * @param {string} url
   * @returns {CodyaEmbed}
   */
  setImage (url) {
    this.image = { url }
    return this
  }

  /**
   * @param {string} url
   * @returns {CodyaEmbed}
   */
  setThumbnail (url) {
    this.thumbnail = { url }
    return this
  }

  /**
   * @param {Date|number} [timestamp]
   * @returns {CodyaEmbed}
   */
  setTimestamp (timestamp = Date.now()) {
    this.timestamp = new Date(timestamp)
    return this
  }

  /**
   * @param {string} title
   * @returns {CodyaEmbed}
   */
  setTitle (title) {
    this.title = title
    return this
  }

  toJSON () {
    return { ...this }
  }
}

module.exports = CodyaEmbed
