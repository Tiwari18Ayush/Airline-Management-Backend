const { ticketService}=require('../services');
const {SuccessResponse, ErrorResponse}=require('../utils/Common');
async function sendEmail(req,res){
    try{
     const response=await ticketService. sendEmail({
        subject:req.body.subject,
        content:req.body.content,
        recipentEmail:req.body.recipentEmail
     })
     SuccessResponse.data=response;
     return res.status(201).json(SuccessResponse);
    }
    catch(error){
       ErrorResponse.error=error;
       return res.status(500).json(ErrorResponse);
    }
}
module.exports={
    sendEmail
}