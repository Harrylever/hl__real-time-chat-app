process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const {
  clientId, clientSecret, gAuthRefreshToken, clientEmail,
} = require('../config/const');
const { accountCreatedMail } = require('./templates/html-templates');

const { OAuth2 } = google.auth;

const googleRedirectUri = 'https://developers.google.com/oauthplayground';

async function createTransporter() {
  try {
    const oauth2Client = new OAuth2(clientId, clientSecret, googleRedirectUri);

    oauth2Client.setCredentials({
      refresh_token: gAuthRefreshToken,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log('*ERR: ', err);
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: clientEmail,
        accessToken,
        clientId,
        clientSecret,
        refreshToken: gAuthRefreshToken,
      },
    });
    return transporter;
  } catch (err) {
    return err;
  }
}

async function AccountCreatedMailer({ receiver, username }) {
  try {
    const mailOptions = {
      from: 'Ukanah Dean <ukanah15thdean@gmail.com>',
      to: receiver,
      subject: 'Welcome to Mx Chat',
      text: 'Welcome to Mx Chat. Number 1, Live Chat Stream Platform',
      html: accountCreatedMail(username),
    };

    const emailTransporter = await createTransporter();
    const result = await emailTransporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

async function PasswordChangedMailer() {
  try {
    const mailOptions = {
      from: 'Ukanah Dean <ukanah15thdean@gmail.com>',
      to: 'lover42cherry@gmail.com',
      subject: 'Hello from my gmail',
      text: 'Hi, this is a test email',
      html: '<h2>Testing Gmail API</h2>',
    };

    const emailTransporter = await createTransporter();
    const result = await emailTransporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

module.exports = {
  AccountCreatedMailer,
  PasswordChangedMailer,
};
