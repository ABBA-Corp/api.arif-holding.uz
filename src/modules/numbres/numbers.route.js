const router = require('express').Router();
const protect = require('../../middlewares/auth/protect');
const numbersController = require('./numbers.controller');

router
    .get('/statistics', numbersController.getAll)
    .get('/statistics/:id', numbersController.getById)
    .post('/statistics', protect, numbersController.create)
    .put('/statistics/:id', protect, numbersController.update)
    .delete('/statistics/:id', protect, numbersController.delete);

module.exports = router;
