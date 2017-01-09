var express = require('express');
var path = require('path');
var router = express.Router();
var Parse = require('parse/node');


// TODO: Move this to separate file.
var env = process.env.NODE_ENV || 'development';

if (env === 'development')
    require('dotenv').config();

var parseAppId = process.env.PARSE_SERVER_APPLICATION_ID;
var parseJavascriptKey = process.env.PARSE_SERVER_JAVASCRIPT_KEY;
var parseServerUri = process.env.PARSE_SERVER_SERVER_URL;

Parse.initialize(parseAppId, parseJavascriptKey);
Parse.serverURL = parseServerUri;


router.post('/parse/signup', function(req, res) {

    var user = new Parse.User({
        "username": req.body.email,
        "password": req.body.password,
        "email": req.body.email
    });

    user.signUp(null, {
        success: function(user) {
            console.log('success');
            res.send(true);

        },
        error: function(user,error) {
            console.log(error);
            res.send(error);
        }
    }).then(function(error) {
        console.log(error);
    })
});


//TODO make sure the correct stuff is sent with the /dashboard to check for user
//LOG IN
router.post('/parse/login', function(req, res) {
    Parse.User.logIn(req.body.email, req.body.password, {
        success: function(user) {
            console.log('user', user);
            console.log('success');
            res.send(true);
        },
        error: function(user, error) {
            console.log('error', error);
            console.log('user', user);
            // The login failed. Check error to see why.
        }
    });
});

// FRONTEND ROUTES =======================
//route to handle all angular requests
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;