const express = require('express');

const { InfoController } = require('../../controllers');
const AirplaneRoutes = require('./Airplane-Routes');
const  CityRoutes=require('./City-Routes');
const router = express.Router();
// console.log("✅ routes/v1/index.js loaded");
// console.log("✅ Airplane-Routes.js loaded");

router.get('/info', InfoController.info);
router.use('/airplanes',AirplaneRoutes); 
router.use('/city',CityRoutes);
router.use('/airports',require('./Airport-Routes'));
router.use('/flights',require('./Flight-Routes'));
module.exports = router;