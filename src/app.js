const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();

var path = require('path');

app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.use(expressLayouts);
app.set('view engine', 'ejs')


app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// const routes = require('./routes/routes')


// ROUTE-HANDLERS middleware
const users = require('./routes/users');
const index = require('./routes/index');
const { mainModule } = require('process');
// app.use('/api', api);
app.use('/users', users);
app.use('/home', index);

app.use(session({
    secret: "c4385d93e8c48a51d6a7ef2b63",
    resave: false,
    saveUninitialized: true,
    maxAge: 5,
    sameSite: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
    // 'res.locals'->é a forma de criar variáveis ou funções globais
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    // passport tem as suas próprias flash-msgs
    // que passa em 'flash('error')', assim faço overwrite
    res.locals.error = req.flash('error');
    next();
  });
// app.use('/', routes)

app.listen(3003, () => {
    console.log('Listening on port 3003')
})

mongoose.connect('mongodb+srv://hitmain13:hideaki13@matsumotodb.flcpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.on('connected', () => {
    console.log("Mongo server is on...")
})
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});