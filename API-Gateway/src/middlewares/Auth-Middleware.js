const { AppError } = require('../utils/Errors');
const { StatusCodes } = require('http-status-codes');
const { Jwt } = require('../utils/Auth-utils.js/index');
const { AuthService } = require('../services');

function Validate(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email or Password missing", StatusCodes.BAD_REQUEST);
    }

    next();
  } catch (error) {
    next(error);
  }
}

function checkAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token missing", StatusCodes.BAD_REQUEST);
    }

    // "Bearer token"
    const token = authHeader;

    if (!token) {
      throw new AppError("JWT token missing", StatusCodes.BAD_REQUEST);
    }

    const decoded = Jwt.verifyToken(token);

    req.user = decoded.id; // OR decoded.userId depending on your token payload
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Unauthorized access",
      error: error.message,
    });
  }
}

async function isAdmin(req, res, next) {
  try {
    const userId = req.user;

    const adminRole = await AuthService.isAdmin(userId);

    if (!adminRole) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "User not authorized for this action",
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

module.exports = {
  Validate,
  checkAuth,
  isAdmin,
};
