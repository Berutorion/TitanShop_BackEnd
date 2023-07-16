const router = require('express').Router();
const { UserControllers } = require('../controllers/UserController');

router.post('/register', UserControllers.register);
// user CRUD
router.get('/users', UserControllers.getAllUsers);
router.get('/user{id}', UserControllers.getUser);
router.put('/user', UserControllers.updateUser);
router.delete('/user', UserControllers.deleteUser);

module.exports = router;
