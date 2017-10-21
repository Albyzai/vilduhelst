var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var passStrategy = function () {

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            var user = {
                username: username,
                password: password
            };
            done(null, user);
        }));
}

module.exports = passStrategy;
