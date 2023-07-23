// create router
const router = require('express').Router();
const UserRouter = require('./user');
const ProductRouter = require('./product');
const UserController = require('../controllers/UserController');
const { LoginAuth, JWTAuth } = require('../middleware/auth');

router.post('/login', LoginAuth, UserController.login);
router.use('/user', JWTAuth, UserRouter);
router.use('/product', ProductRouter);

module.exports = router;
