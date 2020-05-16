'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/sessions', 'SessionController.store')

Route.post('/users', 'UserController.store')

Route.group(() => {
  Route.put(
    '/watched-update-flag/:id/movies',
    'MovieUpWatchedFlagController.update'
  )

  Route.resource('/users', 'UserController').apiOnly().except(['store'])

  Route.resource('/genres', 'GenreController').apiOnly()

  Route.resource('/movies', 'MovieController').apiOnly()
}).middleware(['auth'])
