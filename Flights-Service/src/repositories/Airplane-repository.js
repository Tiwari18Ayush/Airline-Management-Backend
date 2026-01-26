const CrudRepository=require('./CRUD-repository');
const {Airplane}=require('../../models');
class AirplaneRepository extends CrudRepository{
    constructor(){
        super(Airplane);// super calls the parent class constructor with Airplane model i.e CrudRepository constructor
    }
}
module.exports=AirplaneRepository;