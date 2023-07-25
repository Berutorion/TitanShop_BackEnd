// create router
const router = require('express').Router();
const UserRouter = require('./user');
const ProductRouter = require('./product');
const UserController = require('../controllers/UserController');
const CartRouter = require('./cart');
const errorHandler = require('../middleware/errorHandler');
const { LoginAuth, JWTAuth } = require('../middleware/auth');

router.post('/login', LoginAuth, UserController.login);
router.use('/user', JWTAuth, UserRouter);
router.use('/product', ProductRouter);
router.use('/cart', JWTAuth, CartRouter);

router.use(errorHandler);
module.exports = router;
