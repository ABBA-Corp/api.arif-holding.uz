const router = require('express').Router();
const protect = require('../../middlewares/auth/protect');
const aboutController = require('./about.controller');

router
    .get('/about', aboutController.getAll)
    .get('/about/:id', aboutController.getById)
    .post('/about', protect, aboutController.create)
    .put('/about/:id', protect, aboutController.update)
    .delete('/about/:id', protect, aboutController.delete);

module.exports = router;
