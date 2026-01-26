const AuthService=require('../services/Auth-Service');
const{SuccessResponse,ErrorResponse}=require('../utils/Common');
const{StatusCodes}=require('http-status-codes');
async function signUp(req,res){
    try{
        const email=req.body.email;
        const password=req.body.password;
        const user=await AuthService.signUp({email:email,password:password});
        SuccessResponse.data=user;
        SuccessResponse.message="Success fully Signed IN"
        return res.status(200).json(SuccessResponse);
    }catch(error){
        console.log("AUTH CONTROLLER ERROR:", error);

        ErrorResponse.error = error;
    ErrorResponse.message = error.message || "Internal Server Error";
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json(ErrorResponse);
    }
}
async function signIn(req,res){
    try{
        const email=req.body.email;
        const password=req.body.password;
        const token=await AuthService.signIn({email:email,password:password});
        SuccessResponse.data=token;
        SuccessResponse.message="Success fully Signed IN"
        return res.status(200).json(SuccessResponse);
    }
    catch(error){
        console.log("AUTH CONTROLLER SIGNIN ERROR:", error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message || "Internal Server Error";
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json(ErrorResponse);
    }
}
module.exports={
    signUp,
    signIn
}