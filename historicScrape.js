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
var urlBase = "http://www.basketball-reference.com/leagues/NBA_";

function usageMessage(){
  console.log("node " + process.argv[1] + " [historic year to scrape]");
}

if(process.argv[3]) {
  usageMessage();
} else if (process.argv[2]) {
  urlBase+= process.argv[2];
} else {
  urlBase+= 2016; //Default to current year
}
function UrlExists(url, altUrl, name){
  request(url, function (error, response, html) {
    if(response == 404) {
      var newPlayer = new Player({
        name: name,
        url: altUrl
      });
    } else {
      var newPlayer = new Player({
        name: name,
        url: url
      });
    }
    var query = Player.find({'name': name, 'url': url}, function (err, doc){
      if(doc.length == 0) {
        newPlayer.save(function(err, newPlayer) {
            if (err) {console.error(err);}
            else { console.log(newPlayer);}
          });
      } else {
        console.log("Player already in database");
      }
    });
  });
}

request(urlBase + "_per_game.html" , function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    //db.db.dropCollection('players'); //We want to add onto, not replace
    $('.full_table').each(function() {
        var playerInfo = $(this).find("td:nth-child(2)").html();  
        //Split html to take out name and url fragment of players
        var playerName = playerInfo.split(/[<>]/)[2].replace('&apos;', "'"); //Replace escaped quotes with single quotes
        var playerURL = playerInfo.split(/[/\.]/)[3];
        var picURL = picURLFrag + playerURL + ".png";
        var altURL = picURLFrag + playerURL + ".jpg";
        console.log(playerName);
        console.log(playerURL);
        UrlExists(picURL, altURL, playerName);
    });

  }
});