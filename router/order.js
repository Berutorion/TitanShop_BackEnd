const router = require('express').Router();
const OrderController = require('../controllers/OrderController');

router.get('/:id', OrderController.getOrder);

module.exports = router;
