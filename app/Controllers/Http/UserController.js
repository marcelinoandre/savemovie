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

  async show({ params }) {
    const user = User.find(params.id)
    return user
  }

  async update({ params, request, response }) {
    const user = await User.find(params.id)

    if (!user) return response.status(401).json({ error: 'User not found' })

    const data = request.only(['name'])

    user.merge(data)
    await user.save(data)

    return user
  }

  async destroy({ params, response }) {
    const user = await User.find(params.id)

    if (!user) return response.status(401).json({ error: 'User not found' })

    await user.delete()

    return response.send()
  }
}

module.exports = UserController
