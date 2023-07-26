const router = require('express').Router();
const { ProductController } = require('../controllers/ProductController');

// create product route
router.post('/', ProductController.create);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.post('/search', ProductController.search);

router.get('/seller/:id', ProductController.getMyProducts);
router.get('/seller/:id/:productId', ProductController.getMyProduct);

module.exports = router;
