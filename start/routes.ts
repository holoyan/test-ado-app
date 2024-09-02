/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import User from '#models/user'
import { activity } from '@holoyan/adonisjs-activitylog'
import { Acl } from '@holoyan/adonisjs-permissions'
import app from '@adonisjs/core/services/app'
import Car from '#models/car'
import Person from '#models/person'

router.get('/', async () => {
  const map = await app.container.make('morphMap')
  console.log(map)

  const u = await User.firstOrCreate(
    {
      email: 'abg@test.com',
    },
    {
      fullName: 'John Doe',
      password: 'password',
    }
  )

  const c = await Car.firstOrCreate({
    name: 'car1',
  })

  const p = await Acl.permission().create({
    slug: 'create',
  })
  await Acl.model(u).allow(p.slug)
  const l = await activity().on(u).log('user assigned permission')
  return {
    hello: u,
    l,
    p,
    c,
  }
})

router.get('/time/:time', async ({ params }) => {
  const map = await app.container.make('morphMap')
  console.log(map.has('person'), '111111111111111111111')
  map.set('person', Person)
  console.log(map.has('person'), '22222222222222222222')

  var waitTill = new Date(new Date().getTime() + params.time * 1000)
  while (waitTill > new Date()) {}

  return {
    time: params.time,
  }
})
