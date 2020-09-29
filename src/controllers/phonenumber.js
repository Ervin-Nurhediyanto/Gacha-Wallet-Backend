const phoneModels = require('../models/phonenumbers')
const helpers = require('../helpers/helpers')

const phonenumbers = {
  getPhoneById: (req, res) => {
    const id = req.params.id
    phoneModels.getPhoneById(id)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Phone not found', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllphone: (req, res) => {
    const idUser = req.query.idUser
    const priority = req.query.priority
    const phone = req.query.phone

    phoneModels.getAllphone(idUser, priority, phone)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Phone not found', 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updatePhone: (req, res) => {
    const id = req.params.id
    const { phoneNumber } = req.body
    const data = {
      phoneNumber
    }
    phoneModels.updatePhone(id, data)
      .then((result) => {
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  primaryPhone: (req, res) => {
    const id = req.params.id
    const { idUser } = req.body
    const data = {
      idUser
    }
    phoneModels.primaryPhone(id, data)
      .then((result) => {
        const resultChats = result
        console.log(result)
        helpers.response(res, null, resultChats, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deletePhone: (req, res) => {
    const id = req.params.id
    phoneModels.deletePhone(id)
      .then((result) => {
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertPhone: (req, res) => {
    const { idUser, phoneNumber } = req.body
    const data = {
      idUser,
      phoneNumber,
      priority: '2'
    }

    phoneModels.insertPhone(data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = phonenumbers
