//var players = require('./retrieve');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = require('./db');
var Player = db.Player;



var query = Player.find(function (err, players) {
    if (err) {return console.error(err);}
    
	app.set('port', process.env.PORT || 3000);

	app.use(express.static('public'));

	app.get('/', function(req, res) {
		console.log(players);
		res.sendFile(__dirname + '/public/WhoHePlayFor.html');
	});
	app.get('/JSONreq', function(req, res) {
		console.log(players);
		res.json({playerList: players});
		//res.sendFile(__dirname + '/public/WhoHePlayFor.html');
	});
	//404 Page
	app.use(function(req,res){
		res.type('text/plain');
		res.status(404);
		res.send('404 - Not Found');
	});
	//500 Page
	app.use(function(req, res) {
		res.type('text/plain');
		res.status(500);
		res.send('500 - Server Error');
	});





	app.listen(app.get('port'), function() {
		console.log('Express started on http://localhost:' + app.get('port') + '; Press Ctrl-C to Terminate')
	});

});
