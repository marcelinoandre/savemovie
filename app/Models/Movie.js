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

  user() {
    return this.belongsTo('App/Models/User')
  }

  genre() {
    return this.belongsTo('App/Models/Genre')
  }
}

module.exports = Movie
