const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
// importar User-model
const User = require('../models/user');

// o import desta função será em usersController.js para POSTlogin e logout, 'passport' vai ser passado a partir de app.js
module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // e-mail coincide?
        User.findOne({ email: email }).then(user => {
            if (!user) {
                // 'done' callback(recebido em cima)
                return done(null, false, { message: 'E-mail não registrado.' });
            }
            // password e-mail coincidem?
            // bcrypt desencripta password(recebida em cima) e compara
            // password_introduzida
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    console.log(user.email, "logado.")
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Senha incorreta.' });
                }
            });
        });
    })
    );
    // metodo para serialização do 'user'
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // metodo para desserialização do 'user'
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};