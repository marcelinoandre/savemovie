'use strict'

const Movie = use('App/Models/Movie')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with movies
 */
class MovieController {
  async index({ auth }) {
    const movies = await Movie.query()
      .where('user_id', auth.user.id)
      .with('genre')
      .fetch()
    return movies
  }

  async store({ request, response, auth }) {
    const data = request.only(['title', 'sinopse', 'genre_id', 'watched_flag'])

    const flWatched = data.watched_flag ? true : false

    data.watched_flag = flWatched

    data.user_id = auth.user.id
    const movie = Movie.create(data)

    return movie
  }

  async show({ params, request, response, auth }) {
    const movie = await Movie.query()
      .where('user_id', auth.user.id)
      .where('id_public', params.id)
      .with('genre')
      .first()

    if (!movie) return response.status(401).json({ error: 'Movie not found.' })

    return movie
  }

  async update({ params, request, response, auth }) {
    const movie = await Movie.query()
      .where('user_id', auth.user.id)
      .where('id_public', params.id)
      .first()

    if (!movie) return response.status(401).json({ error: 'Movie not found.' })

    const data = request.only(['title', 'sinopse', 'genre_id'])

    movie.merge(data)

    await movie.save()

    return movie
  }

  async destroy({ params, response, auth }) {
    const movie = await Movie.query()
      .where('user_id', auth.user.id)
      .where('id_public', params.id)
      .first()

    if (!movie) return response.status(401).json({ error: 'Movie not found.' })

    await movie.delete()

    return response.send()
  }
}

module.exports = MovieController
