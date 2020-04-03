var enviro = require("dotenv").config();
var keys = require("./keys.js")

var Spotify = require('node-spotify-api');
var moment = require('moment');
var songTitle = process.argv[2]
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
 
spotify.search({ type: 'track', query: songTitle, limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
// console.log(data.tracks.items[0].album.artists[0].name);
// console.log(data.tracks.items[0].name);
// console.log(data.tracks.items[0].album.name);
// console.log(data.tracks.items[0].external_urls.spotify)


});
// var axios = require("axios");


// axios.get("http://www.omdbapi.com/?t="+songTitle+"&y=&plot=short&apikey=trilogy").then(
//   function(response) {
//     console.log(response.data.Title);
//     console.log(response.data.Released);
//     console.log(response.data.imdbRating);
//     console.log(response.data.Ratings[1].Value)
//     console.log(response.data.Country)
//     console.log(response.data.Language)
//     console.log(response.data.Plot)
//     console.log(response.data.Actors)
//   })
//   .catch(function(error) {
//     if (error.response) {
//       console.log("---------------Data---------------");
//       console.log(error.response.data);
//       console.log("---------------Status---------------");
//       console.log(error.response.status);
//       console.log("---------------Status---------------");
//       console.log(error.response.headers);
//     } else if (error.request) {
      
//       console.log(error.request);
//     } else {
     
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });

var axios = require("axios");


axios.get("https://rest.bandsintown.com/artists/" + songTitle+ "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log(response.data[0].venue.name)
        console.log(response.data[0].venue.city,response.data[0].venue.city)
        console.log(response.data[0].datetime);
        var date = response.data[0].datetime;
        var eventDate = moment(date,"YYYY-MM-DDTHH:MM:SS").format();
        console.log(eventDate)

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
    