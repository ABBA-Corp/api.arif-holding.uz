const router = require('express').Router();
const protect = require('../../middlewares/auth/protect');
const promotionController = require('./promotions.controller');

router
    .get('/promotions', promotionController.getAll)
    .get('/promotions/:id', promotionController.getById)
    .post('/promotions', protect, promotionController.create)
    .put('/promotions/:id', protect, promotionController.update)
    .delete('/promotions/:id', protect, promotionController.delete);

module.exports = router;
