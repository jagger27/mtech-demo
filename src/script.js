var request = require('superagent');
var $ = require('jquery');
var Cookies = require('js-cookie');
var moment = require('moment');

$(document).ready(function () {
    var coords = Cookies.getJSON('coords');
    var weatherData = Cookies.getJSON('weather');
    console.log(weatherData);
    console.log(coords);
    if (weatherData) {
        formatWeatherData(weatherData);
    }
    else if (coords) {
        getWeatherUpdate({ coords: coords });
    }
    else if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(getWeatherUpdate);
    } else {
        // TODO: accept manual lon/lat input
        console.error('no geolocation support');
    }
}, true);

function formatWeatherData(data) {
    $('#status').hide()
    var root = $('#weather');

    root.find('.w-city').text(appendText(data.name + ', ' + data.sys.country));
    root.find('.w-current')
        .text(appendText(prettyTemp(
            data.main.temp) + ' with ' + data.weather[0].description))
        .after($('<img/>',
            { src: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png' }));
    root.find('.w-humidity').text(appendText(data.main.humidity + '%'));
    root.find('.w-pressure').text(appendText(data.main.pressure + ' hPa'));
    root.find('.w-wind').text(appendText(
        prettyWind(data.wind)
    ));
    root.find('.w-clouds').text(appendText(data.clouds.all + '%'));
    // UNIX seconds to milliseconds
    var sunrise = moment(data.sys.sunrise*1000);
    var sunset = moment(data.sys.sunset*1000);
    root.find('.w-sunrise').text(appendText(sunrise.fromNow()));
    root.find('.w-sunset').text(appendText(sunset.fromNow()));
}

function appendText(text) {
    return function (i, prev) {
        return prev + text;
    }
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
            if (err) {
                text = err;
            } else {
                text = formatWeatherData(Cookies.getJSON('weather'));
            }
            $('<div/>', {
                id: 'info',
                text: text
            })
                .appendTo('body');
        });
}

function prettyTemp(temp) {
    return temp.toFixed(1) + '°C';
}

// assumes direction >= 0
function prettyWind(wind) {
    // m/s to km/h
    var val = Math.trunc((wind.deg / 22.5) + .5)
    var dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']

    return (wind.speed * 3.6).toFixed(1) + ' km/h ' + dirs[(val % 16)]
}
