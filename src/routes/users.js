const express = require('express')
const userController = require('../controllers/users')
const userForgot = require('../middlewares/forgot_email')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router
  .post('/register', userController.register)
  .post('/login', userController.login)
  .post('/forgotpassword', userForgot.forgotPass)
  .patch('/resetpassword/:id', userController.resetPassword)
  .patch('/update/:id', upload, userController.updateUser)
  .get('/:id', userController.getUserById)
  .get('/', userController.getAllUser)

module.exports = router
