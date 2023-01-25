const router = require('express').Router();
const newsController = require('./news.controller');
const protect = require('../../middlewares/auth/protect');

router
    .get('/news', newsController.getAll)
    .get('/news/:id', newsController.getById)
    .post('/news', protect, newsController.create)
    .put('/news/:id', protect, newsController.update)
    .delete('/news/:id', protect, newsController.delete);

module.exports = router;
