
const transporter = require('./nodemailer')

const sendOtpMail = async(email,otp) =>{
    const username = email.split('@');
    const mailOptions = {
        // from: 'testingp642@gmail.com',
        // to: email,
        from: "appsdeployer1011@gmail.com",
        to: 'v.nisha0116@gmail.com',
        subject: `Verification code`,
        html: `
        <p>Hi ${username[0]},</p>
        <p>Here is your Otp <b>${otp}</b></p>
        <p>Thank you</p>
        <p>EdTech Team</p>
        `
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true;
      } catch (error) {
        console.error('Error sending email:', error);
        return false;
      }
}

module.exports = {
    sendOtpMail
}
  
  