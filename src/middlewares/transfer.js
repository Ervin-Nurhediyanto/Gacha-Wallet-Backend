const nodemailer = require('nodemailer')
const modelHistory = require('../models/users')
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
      .then((res) => {
        const dataHistory = {
          idUser: id,
          idOther,
          amount: saldo,
          note
        }

        modelHistory.insertHistory(dataHistory)
          .then((result) => {
            if (result.length < 1) return helpers.response(res, null, 'Email not found!', 401, null)

            const transporter = nodemailer.createTransport({
              service: process.env.MAILER_SERVICE_PROVIDER,
              auth: {
                user: process.env.MAILER_EMAIL_ID,
                pass: process.env.MAILER_PASSWORD
              }
            })

            const mailOptions = {
              from: process.env.MAILER_EMAIL_ID,
              to: result[0].email,
              subject: 'OTP PIN',
              html: `<p>Transfer Berhasil <b>${result[0].pin}</b>. Jangan berikan OTP pada siapapun, termasuk pihak yang mengatasnamakan Gacha Wallet.</p>`
            }

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) throw err
              console.log('Email sent: ' + mailOptions.to + ' ' + info.response)
              helpers.response(res, null, result[0].id, 200, null, 'Check your email')
            })
          })
          .catch((err) => {
            console.log(err)
          })
      })
  }
}
