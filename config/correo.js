const nodemailer = require('nodemailer')
require("dotenv").config()
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = require("../account_transport.json");

/*const transport = nodemailer.createTransport({
  pool : true,
  maxConnections : 30,
  maxMessages : 200,
  host: process.env.HOST_EM,
  port: process.env.PORT_EM,
  aunth: {
    user: process.env.USER_EM,
    pass:  process.env.PSS_EM
  },
})*/

const transport = async (callback) => {
  const oauth2Client = new OAuth2(
    accountTransport.auth.clientId,
    accountTransport.auth.clientSecret,
    "https://developers.google.com/oauthplayground",
  );
  oauth2Client.setCredentials({
    refresh_token: accountTransport.auth.refreshToken,
    tls: {
      rejectUnauthorized: false
    }
  });
  oauth2Client.getAccessToken((err, token) => {
    if (err)
      return console.log(err);;
    accountTransport.auth.accessToken = token;
    callback(nodemailer.createTransport(accountTransport));
  });
};

module.exports = transport;