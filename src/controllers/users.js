const modelUser = require('../models/users')
const helpers = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {

  register: (req, res) => {
    const { username, email, password } = req.body

    const data = {
      username,
      email,
      password,
      roleId: 2,
      saldo: 0
    }

    bcrypt.genSalt(10, function (_err, salt) {
      bcrypt.hash(data.password, salt, function (_err, hash) {
        data.password = hash
        modelUser.register(data)
          .then((result) => {
            if (result == 'Email is already exists') {
              helpers.response(res, null, result, 403, 'Forbidden')
            } else {
              helpers.response(res, null, 'Register Success', 201, null)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  },

  login: (req, res) => {
    const { email, password } = req.body
    modelUser.login(email)
      .then((result) => {
        if (result.length < 1) return helpers.response(res, null, 'Email not found!', 401, null)

        const user = result[0]
        const hash = user.password
        bcrypt.compare(password, hash).then((resCompare) => {
          if (!resCompare) return helpers.response(res, null, 'Password wrong!', 401, null)
          const payload = {
            id: user.id,
            email: user.email,
            roleId: user.roleId
          }

          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3h' }, (_err, token) => {
            user.token = token
            delete user.password
            delete user.pin

            if (user.roleId === 1) {
              user.roleId = 'Admin'
            } else {
              user.roleId = 'User'
            }
            helpers.response(res, null, user, 200)
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  resetPassword: (req, res) => {
    const id = req.params.id
    const { password } = req.body

    const data = {
      password: password
    }

    bcrypt.genSalt(10, function (_err, salt) {
      bcrypt.hash(data.password, salt, function (_err, hash) {
        data.password = hash
        modelUser.resetPassword(id, data)
          .then((result) => {
            helpers.response(res, null, 'Reset Password Success', 201, null)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  },

  updateUser: (req, res) => {
    const id = req.params.id
    const { username, firstName, lastName, infoUser } = req.body

    const data = {
      username,
      firstName,
      lastName,
      infoUser
    }

    if (req.files) {
      data.image = req.files.map((item) => {
        return process.env.BASE_URL + 'uploads/' + item.filename
      }).join()
    }

    modelUser.updateUser(id, data)
      .then((result) => {
        const resultProducts = result
        console.log(result)
        helpers.response(res, null, resultProducts, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateImage: (req, res) => {
    const id = req.params.id

    const data = {
      image: req.files.map((item) => {
        return process.env.BASE_URL + 'uploads/' + item.filename
      }).join()
    }

    modelUser.updateUser(id, data)
      .then((result) => {
        const resultProducts = result
        console.log(result)
        helpers.response(res, null, resultProducts, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getUserById: (req, res) => {
    const id = req.params.id
    modelUser.getUserById(id)
      .then((result) => {
        console.log(result)
        if (result != '') {
          result.map((item) => {
            delete item.password
            delete item.pin
          })
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'User not found', 404, 'error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getAllUser: (req, res) => {
    const search = req.query.search
    const sort = req.query.sort
    const order = req.query.order
    const page = req.query.page
    const limit = req.query.limit
    modelUser.getAllUser(search, sort, order, page, limit)
      .then((result) => {
        console.log(result)
        if (result != '') {
          result.map((item) => {
            delete item.password
            delete item.pin
          })
          helpers.response(res, page, result, 200, null)
        } else {
          helpers.response(res, null, 'User not found', 404, 'error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  setPin: (req, res) => {
    const id = req.params.id
    const { pin } = req.body
    const data = {
      pin
    }

    modelUser.setPin(id, data)
      .then((result) => {
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  pinOTP: (req, res) => {
    const id = req.params.id
    const pin1 = Math.floor(Math.random() * 10)
    const pin2 = Math.floor(Math.random() * 10)
    const pin3 = Math.floor(Math.random() * 10)
    const pin4 = Math.floor(Math.random() * 10)
    const pin5 = Math.floor(Math.random() * 10)
    const pin6 = Math.floor(Math.random() * 10)
    const pin = []

    const inputPin = () => {
      pin.push(pin1, pin2, pin3, pin4, pin5, pin6)
    }

    inputPin()
    const pinOTP = pin.join('')
    const data = {
      pin: pinOTP
    }

    modelUser.pinOTP(id, data)
      .then((result) => {
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  confirmPin: (req, res) => {
    const id = req.params.id
    const { pin } = req.body
    const data = {
      pin
    }
    modelUser.confirmPin(id, data)
      .then((result) => {
        console.log(result)
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'User not found', 404, 'error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  increaseSaldo: (req, res) => {
    const id = req.params.id
    const { saldo } = req.body
    const data = {
      saldo
    }
    modelUser.increaseSaldo(id, data)
      .then((result) => {
        if (result == 'User not found') {
          helpers.response(res, null, result, 404, 'Not Found')
        } else {
          helpers.response(res, null, result, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  decreaseSaldo: (req, res) => {
    const id = req.params.id
    const { saldo } = req.body
    const data = {
      saldo
    }
    modelUser.decreaseSaldo(id, data)
      .then((result) => {
        if (result == 'User not found') {
          helpers.response(res, null, result, 404, 'Not Found')
        } else {
          helpers.response(res, null, result, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  deleteUser: (req, res) => {
    const id = req.params.id
    modelUser.deleteUser(id)
      .then((result) => {
        if (result == 'User not found') {
          helpers.response(res, null, result, 404, 'Not Found')
        } else {
          helpers.response(res, null, result, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
