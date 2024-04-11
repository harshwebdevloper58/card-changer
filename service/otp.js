function otpGenerator(otp) {
  try {
      const { Email } = require('../routers/staticrouter');
      console.log(otp);

      var nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'shrivastavaharsh1910@gmail.com',
              pass: 'thlj tmhs yyvl utqb'
          }
      });

      var mailOptions = {
          from: 'shrivastavaharsh1910@gmail.com',
          to: Email,
          subject: 'Otp verification for E-card changer',
          text: `Your Otp for Verification is ${otp}`
      };

      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
          }
      });
  } catch (error) {
      console.error("Error in sending OTP email:", error);
  }
}

module.exports = {
  otpGenerator,
};
