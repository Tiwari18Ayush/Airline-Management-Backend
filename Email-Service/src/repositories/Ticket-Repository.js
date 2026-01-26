const { Logger } = require('../config');
const models = require('../../models'); // Import the whole models object
const Ticket = models.Ticket;        // Specifically grab Ticket
const CrudRepository=require('./CRUD-Repository');
class TicketRepository extends CrudRepository {
    constructor() {
       // Ensure Ticket is defined before calling super
       if(!Ticket) {
           throw new Error("Ticket model is undefined. Check models/index.js");
       }
       super(Ticket); 
    }
    async getPendingTickets(){
        try{
        const response=await Ticket.findAll({
            where:{
              status:"PENDING"  
            }
        });
        return response;
        }
        catch(error){
         Logger.error('Something went wrong in CrudRepository:create', error);
          throw error;
        }
    }
}
module.exports=TicketRepository