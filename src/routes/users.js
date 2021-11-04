const express = require ('express');
const router = express.Router();
// importa controlador
const usersController = require('../controllers/usersController');
// register page
router.get('/register', usersController.GETregister);
// login page
router.get('/login', usersController.GETlogin);
// registra no db
router.post('/register', usersController.POSTregister);

module.exports = router;