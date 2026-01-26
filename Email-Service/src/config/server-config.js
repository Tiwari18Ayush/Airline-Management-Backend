const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    HOST:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    USER:process.env.MAIL_USER,
    PASS : process.env.MAIL_PASS
}