var express = require('express');
var router = express.Router();


router
    .get('/', function (req, res) {
        res.send('Welcome to home page');
    });

router
    .get('/about', function (req, res) {
        res.send('Welcome to about page');
    });


module.exports = router;
