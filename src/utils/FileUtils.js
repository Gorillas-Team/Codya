const { readdirSync, statSync } = require('fs')
const { resolve } = require('path')

class FileUtils {
  static requireDir (dir, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts
      opts = { filesOnly: ['js'], recursive: true }
    }

    const { recursive, filesOnly } = opts
    const files = readdirSync(dir)

    for (const file of files) {
      const fullPath = resolve(dir, file)

      if (recursive && statSync(dir + '/' + file).isDirectory()) {
        this.requireDir(`${dir}/${file}`, opts, callback)
      }

      if (filesOnly.some((ext) => new RegExp(`.${ext}$`).test(file))) {
        try {
          const required = require(fullPath)
          callback(null, required)
        } catch (err) {
          callback(err, file)
        }
      }
    }
  }
}

module.exports = FileUtils
