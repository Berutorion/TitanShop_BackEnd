const router = require('express').Router();
const { CartController } = require('../controllers/CartController');

router.get('/:id', CartController.getCart);
router.post('/:id', CartController.addToCart);
router.put('/:id', CartController.updateCart);
router.delete('/:id', CartController.deleteCart);
router.delete('/user/:id', CartController.deleteCartByUser);

module.exports = router;
