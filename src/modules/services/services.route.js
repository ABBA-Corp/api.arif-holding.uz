const router = require('express').Router();
const protect = require('../../middlewares/auth/protect');
const serviceController = require('./services.controller');

router
    .get('/services', serviceController.getAll)
    .get('/services/:id', serviceController.getById)
    .post('/services', protect, serviceController.create)
    .put('/services/:id', protect, serviceController.update)
    .delete('/services/:id', protect, serviceController.delete);

module.exports = router;
