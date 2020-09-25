const express = require('express')
const historiesController = require('../controllers/histories')
// const transfer = require('../middlewares/transfer')
const router = express.Router()

router
  .get('/', historiesController.getAllhistory)
  .get('/:id', historiesController.getHistoryById)
  .patch('/update/:id', historiesController.updateHistory)
  .delete('/:id', historiesController.deleteHistory)
  .post('/', historiesController.insertHistory)
//   .post('/transfer/:id', transfer.transfer)

module.exports = router
