'use strict'

const { uuid } = require('uuidv4')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Movie extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeCreate', (movieInstance) => {
      movieInstance.id_public = uuid()
    })
  }
}

module.exports = Movie
