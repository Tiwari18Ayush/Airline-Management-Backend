console.log("Loading CRUD-repository...");
const CrudRepository = require('./src/repositories/CRUD-repository');
console.log("CRUD-repository loaded:", typeof CrudRepository);

console.log("Loading Airplane model...");
try {
  const models = require('./src/models');
  console.log("Models loaded:", Object.keys(models));
  const { Airplane } = models;
  console.log("Airplane:", typeof Airplane);
} catch (e) {
  console.log("Error loading models:", e.message);
}

console.log("Loading Airplane-repository...");
try {
  const AirplaneRepository = require('./src/repositories/Airplane-repository');
  console.log("AirplaneRepository loaded:", typeof AirplaneRepository);
  console.log("Is it a function?", typeof AirplaneRepository === 'function');
  
  // Try to instantiate it
  if (typeof AirplaneRepository === 'function') {
    console.log("Attempting to create instance...");
    const instance = new AirplaneRepository();
    console.log("Instance created:", typeof instance);
  }
} catch (e) {
  console.log("Error loading Airplane-repository:", e.message);
  console.log("Stack:", e.stack);
}
