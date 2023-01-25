const router = require('express').Router();
const protect = require('../../middlewares/auth/protect');
const workersController = require('./workers.controller');

router
    .get('/workers', workersController.getAll)
    .get('/workers/:id', workersController.getById)
    .post('/workers', protect, workersController.create)
    .put('/workers/:id', protect, workersController.update)
    .delete('/workers/:id', protect, workersController.delete);

module.exports = router;
