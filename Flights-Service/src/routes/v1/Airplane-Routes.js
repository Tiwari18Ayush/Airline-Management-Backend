const express = require('express');
const { AirplaneController } = require('../../controllers');
const {AirplaneMiddleware}=require('../../middlewares')
const router = express.Router();

console.log("✅ Airplane-Routes.js loaded");

router.use((req, res, next) => {
    console.log("🔥 Airplane router HIT =>", req.method, req.originalUrl);
    next();
});

router.post('/', 
    AirplaneMiddleware.validateCreateRequest,
    AirplaneController.createAirplane);
router.get('/', AirplaneController.getAirplane);

router.get('/:id',AirplaneController.getAirplanebyid);

router.delete('/:id',AirplaneController.deleteAirplane);

router.patch('/:id',AirplaneMiddleware.validateUpdateRequest,
AirplaneController.updateAirplane);




module.exports = router;
