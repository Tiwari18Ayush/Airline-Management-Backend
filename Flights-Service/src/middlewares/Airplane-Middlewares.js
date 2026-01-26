const { StatusCodes } = require('http-status-codes');
const {ErrorResponse}=require('../utils/Common');
function validateCreateRequest(req, res, next) {
    if (!req.body.modelNo) {
        ErrorResponse.message='Model number is required'
        return res.status(StatusCodes.BAD_REQUEST)
         .json(ErrorResponse);
    }

    next();
}
function validateUpdateRequest(req,res,next){
    if(req.body.capacity<=0){
        ErrorResponse.message='Capacity cannot be negative or zero'
        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
};
