const router = require('express').Router();
const CartController = require('../controllers/CartController');

router.get('/:id', CartController.getCart);
router.post('/', CartController.addToCart);
router.put('/:id', CartController.updateCart);
router.delete('/:id', CartController.deleteCart);
router.delete('/user/:id', CartController.deleteCartByUser);
// get total price
router.get('/totalPrice', CartController.getTotalPrice);

module.exports = router;
