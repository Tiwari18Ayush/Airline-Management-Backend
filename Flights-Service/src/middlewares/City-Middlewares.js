const { StatusCodes } = require('http-status-codes');
const {ErrorResponse}=require('../utils/Common');
function validateCreateRequest(req, res, next) {
    if (!req.body.name) {
        ErrorResponse.message='Name is required'
        return res.status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse);
    }

    next();
}
function validateUpdateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='Name is required for update'
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
};
