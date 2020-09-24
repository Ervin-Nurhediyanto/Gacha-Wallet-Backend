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
      roleId: 2
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
            email: user.email
          }

          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3h' }, (_err, token) => {
            user.token = token
            delete user.password
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

  getUserById: (req, res) => {
    const id = req.params.id
    modelUser.getUserById(id)
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

  getAllUser: (req, res) => {
    const search = req.query.search
    modelUser.getAllUser(search)
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
  }
}
