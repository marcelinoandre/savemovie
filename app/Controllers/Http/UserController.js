'use strict'

const User = use('App/Models/User')

class UserController {
  async index() {
    const users = await User.all()
    return users
  }

  async store({ request, response }) {
    const data = request.only(['name', 'email', 'password'])

    const hasUser = await User.findBy('email', data.email)

    if (hasUser)
      return response.status(401).json({ error: 'User already registered.' })

    const user = await User.create(data)

    return user
  }

  async show({ params, response }) {
    const user = await User.findBy('id_public', params.id)

    if (!user) return response.status(401).json({ error: 'User not found' })

    return user
  }

  async update({ params, request, response, auth }) {
    const user = await User.query()
      .where('id', auth.user.id)
      .where('id_public', params.id)
      .first()

    if (!user) return response.status(401).json({ error: 'User not found' })

    const data = request.only(['name', 'password'])

    user.merge(data)
    await user.save(data)

    return user
  }

  async destroy({ params, response, auth }) {
    const user = await User.query()
      .where('id', auth.user.id)
      .where('id_public', params.id)
      .first()

    if (!user) return response.status(401).json({ error: 'User not found' })

    await user.delete()

    return response.send()
  }
}

module.exports = UserController
