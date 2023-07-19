const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

// create product CRUD routes
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
