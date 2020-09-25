const express = require('express')
const phoneController = require('../controllers/phonenumber')
const router = express.Router()

router
  .get('/', phoneController.getAllphone)
  .get('/:id', phoneController.getPhoneById)
  .post('/', phoneController.insertPhone)
  .patch('/update/:id', phoneController.updatePhone)
  .patch('/primary/:id', phoneController.primaryPhone)
  .delete('/:id', phoneController.deletePhone)

module.exports = router
