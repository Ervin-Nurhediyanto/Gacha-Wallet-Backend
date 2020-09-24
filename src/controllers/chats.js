const chatModels = require('../models/chats')
const helpers = require('../helpers/helpers')

const chats = {
  getChatById: (req, res) => {
    const id = req.params.id
    chatModels.getChatById(id)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Message not found', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllchat: (req, res) => {
    const idContact = req.query.idContact
    // const sort = req.query.sort
    // const order = req.query.order
    // const page = req.query.page
    // const limit = req.query.limit

    chatModels.getAllchat(idContact)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Message not found', 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateChat: (req, res) => {
    const id = req.params.id
    const { chat } = req.body
    const data = {
      chat
    }
    chatModels.updateChat(id, data)
      .then((result) => {
        const resultChats = result
        console.log(result)
        helpers.response(res, null, resultChats, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteChat: (req, res) => {
    const id = req.params.id
    chatModels.deleteChat(id)
      .then((result) => {
        helpers.response(res, null, result, 200, null)
        // if (result == 'ID Chat is already exsists') {
        //   helpers.response(res, null, result, 403, 'Forbidden')
        // } else if (result == 'ID Chat not found') {
        //   helpers.response(res, null, result, 404, 'Not Found')
        // } else {
        //   helpers.response(res, null, result, 200, null)
        // }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertChat: (req, res) => {
    const { idContact, idSender, chat, lat, lng } = req.body
    const data = {
      idContact,
      idSender,
      chat,
      lat,
      lng
    }

    if (req.files) {
      data.imageChat = req.files.map((item) => {
        return process.env.BASE_URL + 'uploads/' + item.filename
      }).join()
    }

    chatModels.insertChat(data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = chats
