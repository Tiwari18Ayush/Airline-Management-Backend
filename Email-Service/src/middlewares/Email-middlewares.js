const { StatusCodes } = require("http-status-codes");
const AppError = require('../utils/AppError');

function validateSendEmail(req, res, next) {
  const { recipentEmail, subject, content } = req.body;

  if (!recipentEmail || !subject || !content) {
    throw new AppError(
      "recipentEmail, subject and content are required",
      StatusCodes.BAD_REQUEST
    );
  }

  next();
}

module.exports = { validateSendEmail };
