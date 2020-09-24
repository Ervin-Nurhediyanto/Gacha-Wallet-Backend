const connection = require('../configs/db')

const contacts = {
  getContactById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM contacts WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAllContact: (idUser, idFriend) => {
    let checkContact = ''
    const contactList = []

    if (idUser) {
      if (idFriend) {
        checkContact = `WHERE (idUser=${idUser} OR idUser=${idFriend}) AND (idFriend=${idUser} OR idFriend=${idFriend})`
      } else {
        checkContact = `WHERE idUser=${idUser}`
      }
    }

    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users INNER JOIN contacts ON users.id = contacts.idFriend ${checkContact}`, (err, result) => {
        if (!err) {
          result.map((item) => {
            return contactList.push(item)
          })
          checkContact = `WHERE idFriend=${idUser}`
          connection.query(`SELECT * FROM users INNER JOIN contacts ON users.id = contacts.idUser ${checkContact}`, (err, result) => {
            if (!err) {
              result.map((item) => {
                return contactList.push(item)
              })
              resolve(contactList)
            } else {
              resolve(contactList)
            }
          })
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateContact: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE contacts SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Update Data Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteContact: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM contacts WHERE id = ?', id, (err, result) => {
        if (!err) {
          if (result != '') {
            connection.query('DELETE FROM contacts WHERE id = ?', id, (err, result) => {
              if (!err) {
                resolve('Delete data success')
              } else {
                reject(new Error(err))
              }
            })
          } else {
            resolve('Data not found')
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  insertContact: (data) => {
    let checkContact = ''
    checkContact = `WHERE (idUser=${data.idUser} OR idUser=${data.idFriend}) AND (idFriend=${data.idUser} OR idFriend=${data.idFriend})`
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users INNER JOIN contacts ON users.id = contacts.idFriend ${checkContact}`, (err, result) => {
        if (!err) {
          if (result == '') {
            connection.query('INSERT INTO contacts SET ?', data, (err, result) => {
              if (!err) {
                resolve('Add Friend success')
              } else {
                reject(new Error(err))
              }
            })
          } else {
            resolve('Already Friends')
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = contacts
