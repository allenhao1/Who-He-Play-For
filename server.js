//var players = require('./retrieve');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var db = require('./db');
var Player = db.Player;
var Highscore = db.Highscore;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Highscore.find({}).sort({score: 1}).limit(5).exec(function(err, scores) {
	if (err) {return console.error(err);}
	Player.find(function (err, players) {
	    if (err) {return console.error(err);}
	    
		app.set('port', process.env.PORT || 3000);

		app.use(express.static('public'));

		app.get('/', function(req, res) {
			//console.log(players);
			res.sendFile(__dirname + '/public/WhoHePlayFor.html');
		});
		app.get('/players', function(req, res) {
			//console.log(players);
			res.json({playerList: players});
		});
		app.get('/highscores', function(req, res) {
			console.log(scores);
			res.json({scores: scores});
		});
		app.post('/postScores', function(req, res){
			HighScore.remove({}, function(err) { 
				console.log(req.body.name);
			});
		})
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
});
