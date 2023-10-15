const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    debug: true,
    auth: {
      user: 'testingp642@gmail.com',
      pass: 'hpnsolxxqtgocafq',
    },
  });

module.exports = transporter