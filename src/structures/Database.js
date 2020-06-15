const { Schemas } = require('../utils')

module.exports = class Mongo {
  static async add ({ type, id }) {
    const doc = await Schemas[type].create({ _id: id })
    return doc
  }

  static async find ({ type, id }) {
    const doc = id ? await Schemas[type].findOne({ _id: id }) : await Schemas[type].find()
    return doc || (id ? this.add({ type, id }) : null)
  }

  static async delete ({ type, id }) {
    const doc = await Schemas[type].deleteOne({ _id: id }).catch(e => e)
    return doc || false
  }

  // static async update ({ type, id, obj }) {
  //   const doc = await Schemas[type].updateOne({ type, id }, obj)
  // }
}
