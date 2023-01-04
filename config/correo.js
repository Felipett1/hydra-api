const nodemailer = require('nodemailer')
require("dotenv").config()

const transport = nodemailer.createTransport({
  pool : true,
  maxConnections : 30,
  maxMessages : 200,
  host: process.env.HOST_EM,
  port: process.env.PORT_EM,
  aunth: {
    user: process.env.USER_EM,
    pass:  process.env.PSS_EM
  },
})

module.exports = transport;