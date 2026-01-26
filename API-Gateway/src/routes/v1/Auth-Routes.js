const express= require('express');
const Router=express.Router();

const {AuthController}=require('../../controllers');
const {authMiddleware}=require('../../middlewares');
const{ RoleController}=require('../../controllers');
Router.post('/SignUp',
   authMiddleware.Validate,
    AuthController.signUp);
 // PROTECTED ROUTE (The Booking Logic)
// Only users with a valid JWT can reach this
Router.post("/Login", authMiddleware.Validate,AuthController.signIn);
Router.post('/Roles',authMiddleware.checkAuth,authMiddleware.isAdmin,RoleController.addRoleToUser);
Router.post("/bookings", authMiddleware.checkAuth, (req, res) => {
  return res.json({ message: "Booking route working", userId: req.user });
});


module.exports=Router;