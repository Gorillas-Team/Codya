const { Loader } = require('@Codya/structures')
const { FileUtils } = require('@Codya/utils')

class RepositoryLoader extends Loader {
  constructor (client) {
    super(client)

    this.critical = true
  }

  load () {
    this.client.logger.createGroup('[Repositories]')
    this.client.logger.log('| Loading repositories...')
    this.loadRepositories()
    this.client.logger.log('| All loaded with successfully!')
    this.client.logger.closeGroup()
  }

  loadRepositories (path = 'src/repositories') {
    return FileUtils.requireDir(path, (error, Repository) => {
      if (error) {
        this.client.logger.log(' > Error: ' + error.message, 'red')
      }

      const repository = new Repository(this.client)

      this.addRepositoryInClient(repository)
      this.client.logger.log(`  > ${repository.name} loaded.`, 'yellow')
    })
  }

  addRepositoryInClient (repository) {
    if (repository.name in this.client.repositories) return

    this.client.repositories[repository.name] = repository
  }
}

module.exports = RepositoryLoader
