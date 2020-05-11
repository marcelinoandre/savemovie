'use strict'

const Genre = use('App/Models/Genre')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with genres
 */
class GenreController {
  /**
   * Show a list of all genres.
   * GET genres
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request }) {
    return Genre.all()
  }

  /**
   * Create/save a new genre.
   * POST genres
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(['title'])
    const genre = Genre.create(data)

    return genre
  }

  /**
   * Display a single genre.
   * GET genres/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const genre = await Genre.findBy('id_public', params.id)

    if (!genre) return response.status(401).json({ error: 'Genre not found.' })

    return genre
  }

  /**
   * Update genre details.
   * PUT or PATCH genres/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const genre = await Genre.findBy('id_public', params.id)

    if (!genre) return response.status(401).json({ error: 'Genre not found.' })

    const data = request.only(['title'])

    genre.merge(data)

    await genre.save()

    return genre
  }

  /**
   * Delete a genre with id.
   * DELETE genres/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = GenreController
