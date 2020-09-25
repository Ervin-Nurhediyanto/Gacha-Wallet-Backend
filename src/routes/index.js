const express = require('express')
const usersRouters = require('./users')
const phoneRouters = require('./phonenumbers')

const contactRouters = require('./contact')
const chatsRouters = require('./chats')

const router = express.Router()

router
  .use('/users', usersRouters)
  .use('/phone', phoneRouters)

  .use('/contacts', contactRouters)
  .use('/chats', chatsRouters)

module.exports = router
