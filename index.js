var express = require('express');
var server = express();
var port = process.env.PORT || 8080;
var apiKey = require('./secrets').darkskyAPIKey;
var googleApiKey = require('./secrets').googleGeoAPIKey;
var axios = require('axios');
var locationRoot = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

server.use(express.static(__dirname + '/public')); //anything that's in public is available

server.get('/', function(request, response){
  response.sendFile('index.html', {root: __dirname + '/public/html'}); //sets index.html as the homepage
});

server.get('/weather/:lat,:lon', function(request, response){
  var lat = request.params.lat;
  var lon = request.params.lon;
  var url = `https://api.darksky.net/forecast/${apiKey}/${lat},${lon}`;
  axios.get(url)
        .then(function(results){
          response.send(results.data);
        })
        .catch(function(err){
          response.send(err);
        })
});

server.get('/location/:address', function(req, resp){
  var address = req.params.address;
  var location = `${locationRoot}${address}&key=${googleApiKey}`;
  axios.get(location)
      .then(function(results){
        resp.send(results.data);
      })
      .catch(function(err){
        resp.send(err);
      })

});

server.listen(port);
