const historiesModels = require('../models/histories')
const helpers = require('../helpers/helpers')

const histories = {
  getAllhistory: (req, res) => {
    const idUser = req.query.idUser
    const note = req.query.note

    historiesModels.getAllhistory(idUser, note)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'History not found', 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getHistoryById: (req, res) => {
    const id = req.params.id
    historiesModels.getHistoryById(id)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'History not found', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateHistory: (req, res) => {
    const id = req.params.id
    const { amount, note } = req.body
    const data = {
      amount,
      note
    }
    historiesModels.updateHistory(id, data)
      .then((result) => {
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  deleteHistory: (req, res) => {
    const id = req.params.id
    historiesModels.deleteHistory(id)
      .then((result) => {
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertHistory: (req, res) => {
    const { idUser, idOther, amount, note } = req.body
    const data = {
      idUser,
      idOther,
      amount,
      note
    }

    historiesModels.insertHistory(data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = histories
