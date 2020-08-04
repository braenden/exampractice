const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');

const authApi = require('./routes/auth-api');
const matchApi = require('./routes/match-api');
const Users = require('./db/users');

const WsHandler = require('./ws/ws-handler');


const app = express();

app.use(bodyParser.json());

WsHandler.init(app);



app.use(session({
    secret: 'a secret used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));


passport.use(new LocalStrategy(
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = Users.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = Users.getUser(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.use(passport.initialize());
app.use(passport.session());


app.use('/api', authApi);
app.use('/api', matchApi);

app.all('/api*', (req,res) => {
    res.status(404);
    res.send();
});

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = {app};
