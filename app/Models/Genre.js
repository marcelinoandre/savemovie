'use strict'

const { uuid } = require('uuidv4')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Genre extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeCreate', (genreInstance) => {
      genreInstance.id_public = uuid()
    })
  }
}

module.exports = Genre
