var mongoose = require('mongoose');
var db = require('./db');
var Player = db.Player;


//mongoose.connect('mongodb://localhost/players');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
// 	console.log("Connected!");
// 	  // we're connected!
// 	});
var playerList = {};
var a = 0;
var query = Player.find(function (err, players) {
    if (err) {return console.error(err);}
    playerList = players;
    //console.log(playerList);
    console.log('retrieve finished');
    module.exports.playerList = playerList;
});

