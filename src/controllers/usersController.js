const User = require('../models/user')
const bcrypt = require('bcryptjs');
const passport = require('passport');

// renderiza registro
module.exports.GETregister = function (req, res) {
    res.render('register');
};
// renderiza login
module.exports.GETlogin = function (req, res) {
    res.render('login');
};
// registra no db
module.exports.POSTregister = function (req, res) {

    const { name, email, password, password2 } = req.body
    let errors = new Array();
    if (!name || !email || !password || !password2) errors.push({ msg: "Digite todos os campos." })
    if (password != password2) errors.push({ msg: "As senhas não coincidem." })
    if (password.length < 8) errors.push({ msg: "Insira uma senha com 8 caracteres ou mais." })
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        User.findOne({ "email": email }).then(user => {
            if (user) {
                errors.push({ msg: "E-mail já registrado." })
                res.render('register', {
                    errors,
                    name, email, password, password2
                })
            }
            else {
                const newUser = new User({ name, email, password })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(() => {
                                req.flash('success_msg', `A conta foi criada com sucesso e pode fazer o login.`)
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
        })
    }
}

module.exports.POSTlogin = (req, res, next) => {
    passport.authenticate('local', { 
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Você foi deslogado com sucesso.')
    res.redirect('/users/login')
}

module.exports.GETdashboard = (req, res) => {
    res.render('dashboard')
}