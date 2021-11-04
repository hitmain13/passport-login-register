// const express = require('express');
// const session = require('express-session');
// const app = express();

// var user = 'admin'
// var password = '123'

// module.exports = {

//     session(req, res) {
//         if (req.session.loggedIn == true && req.session.username == user) {
//             console.log("User logged:", req.session.username)
//             return res.render('logged');
//         }  else return res.render('index')
//     },

//     logar(req, res) {
//         if (req.body.user == user && req.body.password == password) {
//             console.log('User just about to be logged as:', req.body.user)
//             req.session.username = req.body.user
//             req.session.loggedIn = true
//             return res.render('logged');
//         }
//         else {
//             res.render('index')
//             console.log('Credenciais inválidas.')
//         }
//     }

// }