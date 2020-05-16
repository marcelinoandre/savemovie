'use strict'
const Movie = use('App/Models/Movie')

class UpdateWatchedFlatController {
  async update({ params, request, response, auth }) {
    const movie = await Movie.query()
      .where('user_id', auth.user.id)
      .where('id_public', params.id)
      .first()

    return console.log(movie.lenght, 'mo ie')

    if (!movie) return response.status(401).json({ error: 'Movie not found.' })

    const data = request.only(['title', 'sinopse', 'genre_id'])

    movie.merge(data)
    console.log(data)

    await movie.save()

    return { ok: 'ola' }
  }
}

module.exports = UpdateWatchedFlatController
