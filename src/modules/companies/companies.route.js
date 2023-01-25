const router = require('express').Router();
const protect = require('../../middlewares/auth/protect');
const companiesController = require('./companies.controller');

router
    .get('/companies', companiesController.getAll)
    .get('/companies/:id', companiesController.getById)
    .post('/companies', protect, companiesController.create)
    .put('/companies/:id', protect, companiesController.update)
    .delete('/companies/:id', protect, companiesController.delete);

module.exports = router;
