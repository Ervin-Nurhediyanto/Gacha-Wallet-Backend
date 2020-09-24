const express = require('express')
const chatController = require('../controllers/chats')
const { verifyAccess } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router
  .get('/:id', verifyAccess, chatController.getChatById)
  .get('/', verifyAccess, chatController.getAllchat)
  .post('/', verifyAccess, upload, chatController.insertChat)
  .patch('/:id', verifyAccess, upload, chatController.updateChat)
  .delete('/:id', verifyAccess, chatController.deleteChat)

module.exports = router
