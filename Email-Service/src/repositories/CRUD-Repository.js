const { Logger } = require('../config');

class CrudRepository {
  constructor(model) {
    //  console.log('CRUD MODEL RECEIVED:', model && model.name);
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      Logger.error('Something went wrong in CrudRepository:create', error);
      throw error;
    }
  }

  async destroy(id) {
    try {
      return await this.model.destroy({
        where: { id }
      });
    } catch (error) {
      Logger.error('Something went wrong in CrudRepository:destroy', error);
      throw error;
    }
  }

  async get(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      Logger.error('Something went wrong in CrudRepository:get', error);
      throw error;
    }
  }

  async getAll(filter = {}) {
    try {
      return await this.model.findAll({
        where: filter
      });
    } catch (error) {
      Logger.error('Something went wrong in CrudRepository:getAll', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await this.model.update(data, {
        where: { id }
      });
    } catch (error) {
      Logger.error('Something went wrong in CrudRepository:update', error);
      throw error;
    }
  }
}

module.exports = CrudRepository;

