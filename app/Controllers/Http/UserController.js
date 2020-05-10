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
}

module.exports = UserController
