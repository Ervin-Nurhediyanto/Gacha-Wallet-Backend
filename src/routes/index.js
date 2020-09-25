const express = require('express')
const usersRouters = require('./users')
const phoneRouters = require('./phonenumbers')
const historyRouters = require('./histories')

const contactRouters = require('./contact')
const chatsRouters = require('./chats')

const router = express.Router()

router
  .use('/users', usersRouters)
  .use('/phone', phoneRouters)
  .use('/histories', historyRouters)

  .use('/contacts', contactRouters)
  .use('/chats', chatsRouters)

module.exports = router
