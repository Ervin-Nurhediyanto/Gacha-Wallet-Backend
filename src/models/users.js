const connection = require('../configs/db')

module.exports = {
  login: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM phonenumbers INNER JOIN users ON phonenumbers.idUser = users.id WHERE users.email = ? AND phonenumbers.priority=1', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE email = ?', data.email, (err, result) => {
        if (!err) {
          if (result != '') {
            resolve('Email is already exists')
          } else {
            connection.query('INSERT IGNORE INTO users SET ?', data, (err, result) => {
              if (!err) {
                resolve(result)
              } else {
                reject(new Error(err))
              }
            })
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  resetPassword: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Reset Password Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM phonenumbers INNER JOIN users ON phonenumbers.idUser = users.id WHERE users.id = ? AND phonenumbers.priority=1', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAllUser: (search, sort, order, page, limit) => {
    return new Promise((resolve, reject) => {
      let searchUser = ''
      let sortUser = ''
      let pageUser = ''

      if (search) {
        searchUser = `WHERE firstName LIKE '%${search}%' OR lastName LIKE '%${search}%' OR username LIKE '%${search}%'`
      }

      if (sort) {
        if (order) {
          sortUser = `ORDER BY ${sort} ${order}`
        } else {
          sortUser = `ORDER BY ${sort} ASC`
        }
      }

      if (page) {
        if (limit) {
          pageUser = `LIMIT ${limit} OFFSET ${(page - 1) * limit}`
        } else {
          pageUser = `LIMIT 3 OFFSET ${(page - 1) * 3}`
        }
      }

      connection.query(`SELECT * FROM users ${searchUser} ${sortUser} ${pageUser}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Update Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  setPin: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Input PIN Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  pinOTP: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          connection.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
            if (!err) {
              resolve(result)
            } else {
              resolve('OTP Gagal')
            }
          })
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  confirmPin: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
        if (!err) {
          if (result[0].pin == data.pin) {
            resolve('pin confirm')
          } else {
            resolve('pin incorrect')
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  increaseSaldo: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
        if (!err) {
          let totalSaldo = 0
          totalSaldo += (Number(data.saldo) + Number(result[0].saldo))
          connection.query(`UPDATE users SET saldo = ${totalSaldo} WHERE id = ?`, id, (err, result) => {
            if (!err) {
              resolve('Top Up success')
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

  decreaseSaldo: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
        if (!err) {
          if (Number(result[0].saldo) >= Number(data.saldo)) {
            let totalSaldo = 0
            totalSaldo += (Number(result[0].saldo) - Number(data.saldo))
            connection.query(`UPDATE users SET saldo = ${totalSaldo} WHERE id = ?`, id, (err, result) => {
              if (!err) {
                resolve('Transfer success')
              } else {
                reject(new Error(err))
              }
            })
          } else {
            resolve('saldo anda tidak cukup')
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
        if (!err) {
          if (result != '') {
            connection.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
              if (!err) {
                resolve('Delete user success')
              } else {
                reject(new Error(err))
              }
            })
          } else {
            resolve('User not found')
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
