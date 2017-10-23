var express = require('express');
var passport = require('passport');


var router = function (User) {

    const authRouter = express.Router();

    authRouter.route('/')
        .get(function (req, res) {
            res.send('auth');
        })

    authRouter.route('/signup')
        .get(function (req, res) {
            res.render('signup');
        })
        .post(function (req, res) {
            req.login(req.body, function () {
                User.create({
                    username: req.body.username,
                    password: req.body.password
                }, function (req, results) {
                    req.login(results, function () {
                        res.redirect('auth/profile')
                    })
                })
            })
        })

    authRouter.route('/login')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('auth/profile');
        });

    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        })

    authRouter.route('/userlist')
        .get(function (req, res) {
            User.find({}, function (err, users) {
                if (err) {
                    console.log('Error fidning users: ' + err);
                }

                res.render('userlist', {
                    users: users
                })

            })
        })


    return authRouter;

}


module.exports = router;
