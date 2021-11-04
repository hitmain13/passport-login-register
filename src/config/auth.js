module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'Necessário login para acessar ao conteúdo.')
        res.redirect('/users/login')
    }
}