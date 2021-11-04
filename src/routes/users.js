const express = require ('express');
const router = express.Router();
// importa controlador
const usersController = require('../controllers/usersController');
// register page
router.get('/register', usersController.GETregister);
// registra no db
router.post('/register', usersController.POSTregister);
// login page
router.get('/login', usersController.GETlogin);

router.post('/login', usersController.POSTlogin);

router.get('/logout', usersController.logout);

module.exports = router;