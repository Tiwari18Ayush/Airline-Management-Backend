const nodemailer = require('nodemailer');
const ServerConfig=require('./server-config');
const transporter = nodemailer.createTransport({
  host:ServerConfig.HOST,
  port: ServerConfig.port,
  secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
  auth: {
    user:ServerConfig.USER,
    pass:ServerConfig.PASS ,
  },
});

// Verify connection configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Transporter connection error:', error);
//   } else {
//     console.log('Server is ready to take our messages');
//   }
// });

module.exports = {transporter};