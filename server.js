var express = require('express');
var bodyParser = require('body-parser');

//EXPRESS CONFIG
var app = express();
var PORT = process.env.PORT || '3000';

//BODYPARSER
//parse application/json
app.use(bodyParser.json());

//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


//NOT SURE ON THIS ONE
app.use(bodyParser.text());

//set the static files location
app.use(express.static(__dirname + '/public'));

//routes
var routes = require('./app/routes'); //configure our routes

app.use('/', routes);

//startup the app and shout out to the user
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
