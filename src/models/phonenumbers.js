const connection = require('../configs/db')

const phonenumbers = {
  getPhoneById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM phonenumbers WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAllphone: (idUser, priority) => {
    let user = ''

    if (idUser) {
      if (priority) {
        user = `WHERE phonenumbers.idUser=${idUser} and phonenumbers.priority=${priority}`
      } else {
        user = `WHERE phonenumbers.idUser=${idUser}`
      }
    }

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users INNER JOIN phonenumbers ON users.id = phonenumbers.idUser ${user}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updatePhone: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE phonenumbers SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Change phone number success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  primaryPhone: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM phonenumbers WHERE idUser = ${data.idUser}`, (err, result) => {
        if (!err) {
          result.map((item) => {
            connection.query(`UPDATE phonenumbers SET priority = 2 WHERE id = ${item.id}`)
          })
          connection.query(`UPDATE phonenumbers SET priority = 1 WHERE id = ${id}`, (err, result) => {
            if (!err) {
              resolve('Primary Phone Number Success')
            } else {
              reject(new Error(err))
            }
          })
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deletePhone: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM phonenumbers WHERE id = ?', id, (err, result) => {
        if (!err) {
          if (result != '') {
            connection.query('DELETE FROM phonenumbers WHERE id = ?', id, (err, result) => {
              if (!err) {
                resolve('Delete phone number success')
              } else {
                reject(new Error(err))
              }
            })
          } else {
            resolve('Phone number not found')
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  insertPhone: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO phonenumbers SET ?', data, (err, result) => {
        if (!err) {
          resolve('Add phone number success')
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = phonenumbers
