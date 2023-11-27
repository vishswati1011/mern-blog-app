const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     debug: true,
//     auth: {
//       user: 'testingp642@gmail.com',
//       pass: 'hpnsolxxqtgocafq',
//     },
//   });


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "appsdeployer1011@gmail.com",
    pass: "AppsDeployer@1234",
  },
});
module.exports = transporter