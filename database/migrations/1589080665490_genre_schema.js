'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GenreSchema extends Schema {
  up() {
    this.create('genres', (table) => {
      table.increments()
      table.uuid('id_public').index().notNullable()
      table.string('title').notNullable()
      table.integer('user_id').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('genres')
  }
}

module.exports = GenreSchema
