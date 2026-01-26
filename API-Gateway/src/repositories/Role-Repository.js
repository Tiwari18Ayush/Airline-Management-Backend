const CRUDREPOSITORY = require('./CRUD-Repository');
const {Role} = require('../models');

class RoleRepository extends CRUDREPOSITORY{
    constructor(){
        super(Role);
    }
 async getRoleByName(name){
    try {
        const role = await Role.findOne({where:{name:name}});
        return role;
    }
    catch (error) {
        console.log("Something went wrong in the Role Repository Layer");
        throw{error};
    }
    }
}

module.exports=RoleRepository;