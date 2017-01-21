var request = require('superagent');
var $ = require('jquery');
var Cookies = require('js-cookie');

document.addEventListener('DOMContentLoaded', function () {
    var coords = Cookies.getJSON('coords');
    var weatherData = Cookies.getJSON('weather');
    if (weatherData) {
        console.log(weatherData);
                $('<div/>', {
                        id: 'info',
                        text: weatherData.main.temp
                    })
                        .appendTo('body');
    }
    else if (coords) {
        console.log(coords);
        getWeatherUpdate({coords: coords});
    }
    else if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(getWeatherUpdate);
    } else {
        console.error('no geolocation support');
    }

}, true);

function formatWeatherData(data) {
    return JSON.stringify(data);
}

function getWeatherUpdate(position) {
    console.log(position);
    request
        .post('/location')
        .send({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        .end(function (err, res) {
            var text;
            if(err) {
                text = err;
            } else {
                text = formatWeatherData(res.body);                    
            }
            $('<div/>', {
                id: 'info',
                text: text
            })
                .appendTo('body');
        });
    }