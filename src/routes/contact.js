const express = require('express')
const contactController = require('../controllers/contacts')
const router = express.Router()
const { verifyAccess } = require('../middlewares/auth')

router
  .get('/:id', verifyAccess, contactController.getContactById)
  .get('/', verifyAccess, contactController.getAllContact)
  .post('/', verifyAccess, contactController.insertContact)
  .patch('/:id', verifyAccess, contactController.updateContact)
  .delete('/:id', verifyAccess, contactController.deleteContact)

module.exports = router
