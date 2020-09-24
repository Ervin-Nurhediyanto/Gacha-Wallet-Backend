const express = require('express')
const userController = require('../controllers/users')
const userForgot = require('../middlewares/forgot_email')
const { upload } = require('../middlewares/multer')
const { verifyAccessAdmin } = require('../middlewares/auth')
const router = express.Router()

router
  .post('/register', userController.register)
  .post('/login', userController.login)
  .post('/forgotpassword', userForgot.forgotPass)
  .patch('/resetpassword/:id', userController.resetPassword)
  .patch('/update/:id', upload, userController.updateUser)
  .patch('/setpin/:id', userController.setPin)
  .post('/confirmpin/:id', userController.confirmPin)
  .patch('/increaseSaldo/:id', userController.increaseSaldo)
  .patch('/decreaseSaldo/:id', userController.decreaseSaldo)
  .get('/:id', userController.getUserById)
  .get('/', userController.getAllUser)
  .delete('/:id', verifyAccessAdmin, userController.deleteUser)

module.exports = router
