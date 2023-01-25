const router = require('express').Router();
const authRoutes = require('./modules/auth/auth.route');
const newsRoutes = require('./modules/news/news.route');
const aboutRoutes = require('./modules/about/about.route');
const numbersRoutes = require('./modules/numbres/numbers.route');
const workersRoutes = require('./modules/workers/workers.route');
const productRoutes = require('./modules/products/products.route');
const servicesRoutes = require('./modules/services/services.route');
const companiesRoutes = require('./modules/companies/companies.route');
const promotions = require('./modules/promotions/promotions.route');

router.use('/', authRoutes);
router.use('/', newsRoutes);
router.use('/', promotions);
router.use('/', aboutRoutes);
router.use('/', numbersRoutes);
router.use('/', workersRoutes);
router.use('/', productRoutes);
router.use('/', servicesRoutes);
router.use('/', companiesRoutes);

module.exports = router;
