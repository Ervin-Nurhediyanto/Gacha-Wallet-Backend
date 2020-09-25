const connection = require('../configs/db')

const histories = {
  getAllhistory: (idUser, note) => {
    let history = ''
    return new Promise((resolve, reject) => {
      const historyResult = []
      if (idUser) {
        if (note) {
          history = `WHERE histories.idUser=${idUser} and histories.note LIKE '%${note}%'`
        } else {
          history = `WHERE histories.idUser=${idUser}`
        }
      }
      connection.query(`SELECT * FROM users INNER JOIN histories ON users.id = histories.idOther ${history}`, (err, result) => {
        if (!err) {
          result.map((item) => {
            connection.query(`UPDATE histories SET transaction = "Subcription" WHERE histories.id=${item.id}`)
          })
          connection.query(`SELECT *, DATE_FORMAT(time, "%a") AS "day", DATE_FORMAT(time, "%Y") AS "year", DATE_FORMAT(time, "%b") AS "month", DATE_FORMAT(time, "%d") AS "date", DATE_FORMAT(time, "%H") AS "hour", DATE_FORMAT(time, "%i") AS "minutes", DATE_FORMAT(time, "%s") AS "seconds" FROM users INNER JOIN histories ON users.id = histories.idOther ${history}`, (err, result) => {
            if (!err) {
              result.map((item) => {
                historyResult.push(item)
              })

              if (idUser) {
                if (note) {
                  history = `WHERE histories.idOther=${idUser} and histories.note LIKE '%${note}%'`
                } else {
                  history = `WHERE histories.idOther=${idUser}`
                }
              }
              connection.query(`SELECT * FROM users INNER JOIN histories ON users.id = histories.idUser ${history}`, (err, result) => {
                if (!err) {
                  result.map((item) => {
                    connection.query(`UPDATE histories SET transaction = "Transfer" WHERE histories.id=${item.id}`)
                  })
                  connection.query(`SELECT *, DATE_FORMAT(time, "%a") AS "day", DATE_FORMAT(time, "%Y") AS "year", DATE_FORMAT(time, "%b") AS "month", DATE_FORMAT(time, "%d") AS "date", DATE_FORMAT(time, "%H") AS "hour", DATE_FORMAT(time, "%i") AS "minutes", DATE_FORMAT(time, "%s") AS "seconds" FROM users INNER JOIN histories ON users.id = histories.idUser ${history}`, (err, result) => {
                    if (!err) {
                      result.map((item) => {
                        historyResult.push(item)
                      })
                      resolve(historyResult)
                    }
                  })
                } else {
                  reject(new Error(err))
                }
              })
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

  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT *, DATE_FORMAT(time, "%a") AS "day", DATE_FORMAT(time, "%Y") AS "year", DATE_FORMAT(time, "%b") AS "month", DATE_FORMAT(time, "%d") AS "date", DATE_FORMAT(time, "%H") AS "hour", DATE_FORMAT(time, "%i") AS "minutes", DATE_FORMAT(time, "%s") AS "seconds" FROM histories WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateHistory: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE histories SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Update history success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteHistory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM histories WHERE id = ?', id, (err, result) => {
        if (!err) {
          if (result != '') {
            connection.query('DELETE FROM histories WHERE id = ?', id, (err, result) => {
              if (!err) {
                resolve('Delete history success')
              } else {
                reject(new Error(err))
              }
            })
          } else {
            resolve('history not found')
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  insertHistory: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO histories SET ?', data, (err, result) => {
        if (!err) {
          resolve('Transaction success')
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = histories
