'use strict'

const Movie = use('App/Models/Movie')

class MovieUpWatchedFlagController {
  async update({ params, request, response, auth }) {
    const movie = await Movie.query()
      .where('user_id', auth.user.id)
      .where('id_public', params.id)
      .first()

    if (!movie) return response.status(401).json({ error: 'Movie not found.' })

    const { watched_flag } = request.all()

    movie.merge({ watched_flag })

    await movie.save()

    // return movie

    return movie
  }
}

module.exports = MovieUpWatchedFlagController
