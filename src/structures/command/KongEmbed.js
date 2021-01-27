/**
 * @name KongEmbed
 * @constructor
 */

class KongEmbed {
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
   * @returns {KongEmbed}
   */
  addField (name, value, inline = false) {
    this.fields.push({ name, value, inline })
    return this
  }

  /**
   * @param {...({ name:string|number, value:string|number, inline:boolean = false})} fields
   * @returns {KongEmbed}
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
   * @returns {KongEmbed}
   */
  setAuthor (name, iconURL, url) {
    this.author = { name, icon_url: iconURL, url }
    return this
  }

  /**
   * @param {number} color
   * @returns {KongEmbed}
   */
  setColor (color) {
    this.color = color
    return this
  }

  /**
   * @param {string[]} description
   * @returns {KongEmbed}
   */
  setDescription (...description) {
    this.description = description.join('\n')
    return this
  }

  /**
   * @param {string} text
   * @param {string} [iconURL]
   * @returns {KongEmbed}
   */
  setFooter (text, iconURL) {
    this.footer = { text, iconURL }
    return this
  }

  /**
   * @param {string} url
   * @returns {KongEmbed}
   */
  setImage (url) {
    this.image = { url }
    return this
  }

  /**
   * @param {string} url
   * @returns {KongEmbed}
   */
  setThumbnail (url) {
    this.thumbnail = { url }
    return this
  }

  /**
   * @param {Date|number} [timestamp]
   * @returns {KongEmbed}
   */
  setTimestamp (timestamp = Date.now()) {
    this.timestamp = new Date(timestamp)
    return this
  }

  /**
   * @param {string} title
   * @returns {KongEmbed}
   */
  setTitle (title) {
    this.title = title
    return this
  }

  toJSON () {
    return { ...this }
  }
}

module.exports = KongEmbed
