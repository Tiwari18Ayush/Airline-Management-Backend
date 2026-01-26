const AuthService=require('../services/Auth-Service');
const{SuccessResponse,ErrorResponse}=require('../utils/Common');
const{StatusCodes}=require('http-status-codes');
const RoleService=require('../services/Role-Service');
async function addRoleToUser(req, res) {
    try {
        const response = await RoleService.assignRoleToUser(req.body.userId, req.body.role);

        SuccessResponse.success = true;
        SuccessResponse.data = response;
        SuccessResponse.message = "Role assigned successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
       
     catch (error) {
        // ... standard error handling
        console.log("ROLE CONTROLLER ERROR:", error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message || "Internal Server Error";
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json(ErrorResponse);
    }
}
module.exports={
    addRoleToUser
}