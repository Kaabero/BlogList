const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    response.status(400).json('Password is required')
    return
  }

  if (password.length < 3) {
    response.status(400).json('Password is shorter than the minimum allowed length (3)')
    return

  }

  const existingUser = await User.findOne({
    username: { $regex: new RegExp(`^${username}$`, 'i') },
  })

  if (existingUser) {
    return response.status(400)
      .json(`Username ${username} already exists. 
        Please choose a different name.`
      )
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { author: 1, title: 1, url: 1, likes: 1, })
  response.json(users)
})

module.exports = usersRouter