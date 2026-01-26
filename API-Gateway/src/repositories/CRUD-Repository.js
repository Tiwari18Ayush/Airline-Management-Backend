const {Logger}=require('../config');
class CrudRepository{
    constructor(model){
        this.model=model;
    }
    async create(data){
        try{
            const result=await this.model.create(data);
            return result;
        }catch(error){
            Logger.error("Something went wrong in the Crud Repository create method");
            throw error;
        }
    }
    async destroy(data){
        try{
            const result=await this.model.destroy({
                where:{
                    id:data
                }
            });
            return result;
        }
        catch(error){
           Logger.error("Something went wrong in the Crud Repository Destroy method");
            throw error;
        }
}
     async get(data){
        try{
            const result=await this.model.findByPk(data);
            if(!result){
                return null;
            }
            return result;
        }catch(error){
            Logger.error("Something went wrong in the Crud Repository get method");
            throw error;
        }
}
     async getAll(filter = {}) { 
  try {
    const result = await this.model.findAll({
      where: filter
    });
    return result;
  } catch (error) {
    Logger.error("Something went wrong in the Crud Repository getAll method");
    throw error;
  }
}

        async update(id,data){
            try{
                const result=await this.model.update(data,{
                    where:{
                        id:id
                    }
                });
                return result;
            }catch(error){
                Logger.error("Something went wrong in the Crud Repository update method");
                throw error;
            }
    }
}
module.exports=CrudRepository;