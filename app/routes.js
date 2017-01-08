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

    console.log('TESTING');
    console.log('BODY', req.body);
    var user = new Parse.User({
        "username": req.body.email,
        "password": req.body.password,
        "email": req.body.email
    });

    user.signUp(null, {
        success: function(user) {
            console.log('success');
            res.send('success');

        },
        error: function(user,error) {
            console.log(error);
        }
    }).then(function(error) {
        console.log(error);
    })
});

// FRONTEND ROUTES =======================
//route to handle all angular requests
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;