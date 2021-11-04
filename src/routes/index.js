const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../config/auth');
// importa controlador
const indexController = require('../controllers/indexController');
// index-route (Home-page)
router.get('/', indexController.index);

router.get('/dashboard', ensureAuthenticated, indexController.GETdashboard);

module.exports = router;