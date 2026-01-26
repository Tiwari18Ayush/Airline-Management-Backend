const RoleRepository= require('../repositories/Role-Repository');
const roleRepository= new RoleRepository();
const authrepository = require('../repositories/Auth-Repository');
const {AppError}= require('../utils/Errors');
const Authrepository=new authrepository();
const { StatusCodes } = require("http-status-codes");

async function assignRoleToUser(userId, roleName){
    try{
        const role= await roleRepository.getRoleByName(roleName);
        if(!role){
            throw new AppError("Role not found",StatusCodes.NOT_FOUND);
        }
        const user= await Authrepository.get(userId);
        if(!user){
            throw new AppError("User not found",StatusCodes.NOT_FOUND);
        }
        await user.addRole(role);
        return true;
    }
    catch(error){
        if (error instanceof AppError) throw error; 
        throw new AppError("Something went wrong during Assigning Role", StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

module.exports={
    assignRoleToUser
}