const nodemailer = require('nodemailer')
const modelUser = require('../models/users')
const helpers = require('../helpers/helpers')

module.exports = {

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
          html: `<p>OTP bersifat RAHASIA. Kode OTP verifikasi Anda: ${result[0].pin}. Jangan berikan OTP pada siapapun, termasuk pihak yang mengatasnamakan Gacha Wallet.</p>`
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
  }
}
