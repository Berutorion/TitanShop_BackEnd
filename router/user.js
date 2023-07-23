const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
// user CRUD
router.get('/users', UserController.getAllUsers);
router.get('/user{id}', UserController.getUser);
router.put('/user', UserController.updateUser);
router.delete('/user', UserController.deleteUser);

module.exports = router;
