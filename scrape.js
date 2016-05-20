var request = require('request');
var cheerio = require('cheerio');

var picURLFrag = "http://d2cwpp38twqe55.cloudfront.net/req/201604170/images/players/"
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/players');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected!");
    // we're connected!
  });
var playerSchema = new mongoose.Schema({
  name: String,
  url: String
})
var Player =  mongoose.model('Player', playerSchema);


request("http://www.basketball-reference.com/leagues/NBA_2016_per_game.html"  , function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('.full_table').each(function() {
        var playerInfo = $(this).find("td:nth-child(2)").html();  
        //Split html to take out name and url fragment of players
        var playerName = playerInfo.split(/[<>]/)[2];
        var playerURL = playerInfo.split(/[/\.]/)[3];
        var picURL = picURLFrag + playerURL + ".png";
        console.log(playerName);
        console.log(playerURL);
        var newPlayer = new Player({
          name: playerName,
          url: picURL
        });
        newPlayer.save(function(err, newPlayer) {
          if (err) {
            console.error(err);
          } else {
            console.log(newPlayer);
          }
        });
    });

  }
});