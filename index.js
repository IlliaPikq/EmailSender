const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Send POST request to "/" endpoint')
})

app.post('/', (req, res) => {
    const {subject, author, message } = req.body

    const mailContent = {
        from: author,
        to: process.env.MY_EMAIL,
        subject: author  + ": " + subject,
        text: message
    }

    const transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: process.env.HOST,
                pass: process.env.PASSWORD
            }
        }
    )

    transporter.sendMail(mailContent, (err, info) => {
        if (err) {
            console.log(err)
            res.status(500).send("Email hasn't been sent. Please try again")
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send('Email sent successfully')
        }
    })
})

module.exports = app
