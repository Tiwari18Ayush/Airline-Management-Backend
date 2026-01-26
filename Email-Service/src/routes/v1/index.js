const express = require('express');

const { InfoController, EmailController } = require('../../controllers');
const{ emailMiddleware}=require('../../middlewares');

const router = express.Router();

router.get('/info', InfoController.info);
router.post('/tickets', emailMiddleware.validateSendEmail,
EmailController.sendEmail
);

module.exports = router;