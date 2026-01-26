const express = require('express');
const {CityController } = require('../../controllers');
const {CityMiddleware}=require('../../middlewares')
const router = express.Router();

console.log("✅ City-Routes.js loaded");

router.use((req, res, next) => {
    console.log("🔥 City router HIT =>", req.method, req.originalUrl);
    next();
});

router.post('/', 
    CityMiddleware.validateCreateRequest,
    CityController.createCity);
router.get('/', CityController.getCity);

router.get('/:id',CityController.getCitybyid);

router.delete('/:id',CityController.deleteCity);

router.patch('/:id',CityMiddleware.validateUpdateRequest,
CityController.updateCity);




module.exports = router;
