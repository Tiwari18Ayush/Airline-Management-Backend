const authrepository = require('../repositories/Auth-Repository');
const {AppError}= require('../utils/Errors');
const {StatusCodes}=require('http-status-codes');
const {Hash,Jwt}=require('../utils/Auth-utils.js');
const RoleRepository= require('../repositories/Role-Repository');
const roleRepository= new RoleRepository();
const Authrepository=new authrepository();
const {ROLE_ENUM}=require('../utils/Common/ENUMS.js');
async function signUp(data) {
  try {
    const user = await Authrepository.create(data);
    const defaultRole= await roleRepository.getRoleByName("USER");
    if(!defaultRole){
        throw new AppError("Default role not found",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    await user.addRole(defaultRole);
    return user;
  } catch (error) {
    console.log("AUTH SERVICE REAL ERROR:", error); // ✅ important
    throw error; // ✅ throw original error
  }
}
async function signIn(data){
   try{
    const user=await Authrepository.findbyemail(data.email);
    if(!user){
        throw new AppError("User not found",StatusCodes.NOT_FOUND);
    }
    const passwordmatch=Hash.compareHash(data.password,user.password);
    if(!passwordmatch){
        throw new AppError("Invalid Password",StatusCodes.BAD_REQUEST);
    }
    // 3. Generate JWT
        // We typically include the user ID and email in the payload
        const jwtToken = Jwt.createToken({ 
            id: user.id, 
            email: user.email 
        });

        return jwtToken;

   }
   catch(error){
     if (error instanceof AppError) throw error;
        throw new AppError("Something went wrong during sign in", StatusCodes.INTERNAL_SERVER_ERROR);
   }
}
async function isAdmin(userId){
  try {
        const user = await Authrepository.get(userId);
        const adminRole = await roleRepository.getRoleByName(ROLE_ENUM.ADMIN);
        return await user.hasRole(adminRole); // Sequelize hasRole checks the junction table
    } catch (error) {
        throw error;
    }

}

module.exports={
    signUp,
    signIn,
    isAdmin
}
