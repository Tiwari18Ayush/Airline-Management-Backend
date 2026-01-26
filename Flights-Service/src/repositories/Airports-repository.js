const CrudRepository=require('./CRUD-repository');
const {Airports}=require('../../models');
class AirportRepository extends CrudRepository{
    constructor(){
        super(Airports);// super calls the parent class constructor with Airplane model i.e CrudRepository constructor
    }
}
module.exports=AirportRepository;