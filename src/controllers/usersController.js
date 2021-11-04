const User = require('../models/user')
const bcrypt = require('bcryptjs');

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
        const newUser = new User({ name, email, password })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(() => {
                        req.flash(
                            'success_msg','Você está registrado!'
                           );
                        res.redirect('/users/login')
                    })
                    .catch(err => console.log(err))
            })
        })
    }
}