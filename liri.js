var enviro = require("dotenv").config();
var inquirer = require("inquirer");
var fs = require("fs");

inquirer
  .prompt([
    {
        type: "list",
        message: "What would you like to liri to do?",
        choices: ["movie-this","spotify-this-song","concert-this","do-what-it-says"],
        name: "liriAction"
    },
    {
        type: "input",
        message: "For what would you like liri to search?",
        name: "action"
    }
  ])
  .then(function(inquirerResponse) {
    switch (inquirerResponse.liriAction) {
        case "concert-this":
            concertThis(inquirerResponse.action);
            break;
        
        case "spotify-this-song":
            spotifyThis(inquirerResponse.action);
            break;
        case "movie-this":
            movieThis(inquirerResponse.action);
            break;
        case "do-what-it-says":
            doWhat(inquirerResponse.action);
            break;
        }
          
  })




function spotifyThis(input) {
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var songTitle = input;
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
if (songTitle==="") {
  songTitle = "The Sign"
}

 
spotify.search({ type: 'track', query: songTitle, limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
var artist = data.tracks.items[0].album.artists[0].name;
var trackName = data.tracks.items[0].name;
var album = data.tracks.items[0].album.name;
var preview = data.tracks.items[0].external_urls.spotify;
var songData = [];
songData.push("spotify-this-song",artist,trackName,album,preview," ")
fs.appendFile("log.txt",songData,function(error) {
  if (error) {
    console.log(error)
  } 
})

console.log("Artist:  " + artist);
console.log("Track:  " + trackName);
console.log("Album:  " + album);
console.log("Spotify Link:  " + preview)


});
}
function movieThis(input){
var axios = require("axios");
var movieTitle = input;
if (movieTitle==="") {
  movieTitle = "Mr. Nobody"
}
axios.get("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    movieTitle = response.data.Title;
    var releaseDate = response.data.Released;
    var imdbRating = response.data.imdbRating;
    var rtRating = response.data.Ratings[1].Value;
    var country = response.data.Country;
    var language = response.data.Language;
    var plot = response.data.Plot;
    var actors = response.data.Actors;
    var movieData = [];
    movieData.push("movie-this",movieTitle,releaseDate,imdbRating,rtRating,country,language,plot,actors," ")
    fs.appendFile("log.txt",movieData,function(error) {
      if (error) {
        console.log(error)
      } 
    })
    console.log("Title:  " + movieTitle);
    console.log("Release Date:  " + releaseDate);
    console.log("IMDB Rating:   " + imdbRating);
    console.log("Rotten Tomatoes Rating:   " + rtRating)
    console.log("Country of origin:  " + country)
    console.log("Languages:   + " + language)
    console.log("Plot:   " + plot)
    console.log("Actors:   " + actors)
  })
  .catch(function(error) {
    if (error.response) {
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      
      console.log(error.request);
    } else {
     
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function concertThis(input) {
var moment = require('moment');
var bandName = input;
var axios = require("axios");
axios.get("https://rest.bandsintown.com/artists/" + bandName+ "/events?app_id=codingbootcamp").then(
    function(response) {
        var venue = response.data[0].venue.name
        var city = response.data[0].venue.city
        var state = response.data[0].venue.region
        var date = response.data[0].datetime;
        var eventDate = moment(date,"YYYY-MM-DDTHH:mm").format( "MM/DD/YYYY");
        var concertData = []
        concertData.push("concert-this",bandName,venue,city,state,eventDate,"");
        fs.appendFile("log.txt",concertData,function(error) {
          if (error) {
            console.log(error)
          } 
        })
        console.log("Band:  " + bandName)
        console.log("Venue:  " + venue)
        console.log("Location:   " + city + "," +state)
        console.log("Date:   " + eventDate)

    })
    .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
}
function doWhat() {
    
    fs.readFile("random.txt","utf8",function(error,data){
        if (error) {
            return console.log(error)
        }
        var text = data.split(",")
        var random = Math.floor(Math.random()*3);
        if (random===0) {
            var input = text[1]
            spotifyThis(input)
        } else if (random===1) {
            var input = text[3]
            movieThis(input)

        } else if (random===2) {
            
            var input = text[5]
            console.log(input)
            concertThis(input)
        }

        
    })
}

    