const router = require('express').Router();
const protect = require('../../middlewares/auth/protect');
const productController = require('./products.controller');

router
    .get('/products', productController.getAll)
    .get('/products/:id', productController.getById)
    .post('/products', protect, productController.create)
    .put('/products/:id', protect, productController.update)
    .delete('/products/:id', protect, productController.delete);

module.exports = router;
