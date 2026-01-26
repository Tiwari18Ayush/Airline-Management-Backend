const CRUDREPOSITORY=require('./CRUD-Repository');
const {User}=require('../models');
class AuthRepository extends CRUDREPOSITORY{
    constructor(){
        super(User);
    }
     async findbyemail(email) {
      return this.model.findOne({
      where: { email: email },  
    });
}
}
module.exports=AuthRepository;