var express = require('express');
var router = express.Router();
var request = require('superagent');
var debug = require('debug')('mtech-demo:index');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Local Weather' });
});

router.post('/location', function (req, res) {
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;

  request.get('api.openweathermap.org/data/2.5/weather')
    .query({
      units: 'metric',
      lat: latitude,
      lon: longitude,
      APPID: req.app.get('appid')
    })
    .end(function(err, weatherResult) {
      // sets session cookie for lat/lon
      res.cookie('coords', JSON.stringify({latitude: latitude, longitude: longitude}));
      if (err) {
        debug(err);
        res.send(500, {status: err});
      } else {
        // sends full weather data to client for caching 
        res.cookie('weather', JSON.stringify(weatherResult.body), {maxAge: 1000*60*15}); // 15 mins
        res.send({status: 'cookie set'});
      }
    });
});

module.exports = router;
