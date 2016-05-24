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

var temporaryScores; //Stores high scores for a given session 
Highscore.find({}).sort({score: 1}).limit(5).exec(function(err, scores) {
	if (err) {return console.error(err);}
	temporaryScores = scores;
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
			console.log('sending back scores!');
			console.log(scores);
			res.json({scores: scores});
			//res.json({scores: temporaryScores});
		});
		app.post('/postScores', function(req, res){
			var proceed = false; //Manage asynchronicity
			Highscore.remove({}, function(err) { 
				console.log("sent over: ");
				
				var newScores = JSON.parse(req.body.highscores);
				console.log(newScores);
				temporaryScores = newScores;
				var check = 1;
				if (newScores.length > 1) {
					check = newScores.length;
					for(var objectIndex in newScores) {
						console.log("Index: " + objectIndex);
						console.log(newScores[objectIndex]);
						//if (scores.hasOwnProperty(object)) {
							var object = newScores[objectIndex];
							// console.log('Object ' + objectIndex);
							// console.log(object);
						    var score = new Highscore ({
						    	name: object.name,
						    	score : object.score
						    });
						    score.save(function(err, score) {
					            if (err) {
					            	console.error(err);
					            } else { 
					            	console.log("success"); 
					            	proceed = true;
									console.log("go!");
									console.log(score);
									check--;
									console.log('check1: ' + check);
								}
							});
						//}
					}
					//while(check != 0){ console.log(check);}
					console.log('check2:' + check);
					while(check != 0) { setTimeout(function(){console.log('check3: ' + check)}, 500);}
					console.log(check)
					console.log('end');

					
				} else {
					var name = Object.keys(newScores)[0]
					var score = new Highscore ({
				    	name: name,
				    	score : scores[name]
				    });
				    score.save(function(err, score) {
			            if (err) {console.error(err);}
			            else { 
			            	proceed = true;
			            	console.log("go!");
			            	console.log("success"); 
			            	console.log(score);
			            	check = 0;
			            }
			        });
			        
			        
				}

			});
			
			// while(!proceed) {
			// 	//Wait here
			// 	//console.log("stop!");
			// }
			console.log("finished");
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
