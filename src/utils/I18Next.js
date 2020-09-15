const { join } = require('path')
const { readdirSync, lstatSync } = require('fs')

const i18next = require('i18next')
const Backend = require('i18next-fs-backend')

module.exports = i18next
  .use(Backend)
  .init({
    fallbackLng: 'pt-BR',
    lng: ['pt-BR', 'en-US'],
    preload: readdirSync(join(__dirname, '../locales')).filter(fileName => {
      const joinedPath = join(join(__dirname, '../locales', fileName))
      const isDirectory = lstatSync(joinedPath).isDirectory()

      return isDirectory
    }),
    ns: ['commands'],
    defaultNS: 'commands',
    backend: {
      loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json')
    },
    interpolation: {
      escapeValue: false
    }
  })
