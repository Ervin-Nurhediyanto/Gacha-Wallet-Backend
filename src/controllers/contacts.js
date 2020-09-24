const contactModels = require('../models/contacts')
const helpers = require('../helpers/helpers')

const contacts = {
  getContactById: (req, res) => {
    const id = req.params.id
    contactModels.getContactById(id)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Data not found', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllContact: (req, res) => {
    const idUser = req.query.idUser
    const idFriend = req.query.idFriend

    contactModels.getAllContact(idUser, idFriend)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Contact not found', 200, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateContact: (req, res) => {
    const id = req.params.id
    const { idUser, idFriend } = req.body
    const data = {
      idUser,
      idFriend
    }
    contactModels.updateContact(id, data)
      .then((result) => {
        const resultChats = result
        console.log(result)
        helpers.response(res, null, resultChats, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteContact: (req, res) => {
    const id = req.params.id
    contactModels.deleteContact(id)
      .then((result) => {
        if (result == 'Data not found') {
          helpers.response(res, null, result, 404, 'Not Found')
        } else {
          helpers.response(res, null, result, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertContact: (req, res) => {
    const { idUser, idFriend } = req.body
    const data = {
      idUser,
      idFriend
    }
    contactModels.insertContact(data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = contacts
