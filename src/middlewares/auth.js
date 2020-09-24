const jwt = require('jsonwebtoken')
const helpers = require('../helpers/helpers')

module.exports = {
  verifyAccess: (req, res, next) => {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) return helpers.response(res, null, { message: 'Token invalid' }, 403, 'Forbidden')
      next()
    })
  },

  verifyAccessAdmin: (req, res, next) => {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      console.log(decoded.roleId)
      if (!err) {
        if (decoded.roleId != 1) {
          return helpers.response(res, null, { message: 'You are not a admin' }, 403, 'Forbidden')
        } else {
          next()
        }
      } else {
        return helpers.response(res, null, { message: 'Token invalid' }, 403, 'Forbidden')
      }
    })
  }
}
