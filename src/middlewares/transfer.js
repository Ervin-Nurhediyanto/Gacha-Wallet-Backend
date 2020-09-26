const nodemailer = require('nodemailer')
const modelHistory = require('../models/histories')
const modelUser = require('../models/users')
const helpers = require('../helpers/helpers')

module.exports = {

  transfer: (req, res) => {
    const id = req.params.id
    const { saldo } = req.body
    const { idOther, note } = req.body
    const dataUser = {
      saldo
    }
    modelUser.decreaseSaldo(id, dataUser)
      .then((result) => {
        console.log(result)

        if (result == 'saldo anda tidak cukup') {
          helpers.response(res, null, 'saldo anda tidak cukup', 200, null, 'silahkan top up')
        } else {
          modelUser.increaseSaldo(idOther, dataUser)
          const dataHistory = {
            idUser: id,
            idOther,
            amount: saldo,
            note
          }

          modelHistory.transfer(dataHistory)
            .then((result) => {
              const transporter = nodemailer.createTransport({
                service: process.env.MAILER_SERVICE_PROVIDER,
                auth: {
                  user: process.env.MAILER_EMAIL_ID,
                  pass: process.env.MAILER_PASSWORD
                }
              })

              const mailOptions = {
                from: process.env.MAILER_EMAIL_ID,
                to: result.email,
                subject: 'Transfer Notification',
                html: `<p>Transfer nominal <b>Rp.${result.amount}</b> Berhasil.</p>`
              }

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) throw err
                console.log('Email sent: ' + mailOptions.to + ' ' + info.response)
                helpers.response(res, null, 'Transfer Succeess', 200, null, 'Check your email')
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
  }
}
