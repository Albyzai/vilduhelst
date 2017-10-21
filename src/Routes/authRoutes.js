var express = require('express');


var router = function () {

    var authRouter = express.Router();
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
                res.redirect('/profile')
            })
        })


    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        })


    return authRouter;

}


module.exports = router;
