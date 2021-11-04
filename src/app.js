const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();

require('./config/passport')(passport);

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

app.use(session({
    secret: "c4385d93e8c48a51d6a7ef2b639e1b56ac3d4ff8e6",
    resave: true,
    saveUninitialized: true,
    maxAge: 60000 * 60
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//variáveis globais
app.use((req, res, next) => {
    // 'res.locals'->é a forma de criar variáveis ou funções globais
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash('error_msg');
    // passport tem as suas próprias flash-msgs que passa em 'flash('error')', assim faço overwrite
    res.locals.error = req.flash('error');
    next();
});

const users = require('./routes/users');
const index = require('./routes/index');
// app.use('/api', api);
app.use('/users', users);
app.use('/', index);

app.listen(3003, () => {
    console.log('Listening on port 3003')
})

mongoose.connect('mongodb+srv://mongodbteste:mongodbteste@cluster0.drqj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.on('connected', () => {
    console.log("Mongo server is on...")
})
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

