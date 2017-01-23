# OpenWeatherMap Demo App

## Description
A relatively staightforward Node/Express demo app originally made as an application for [Massless Technologies](http://www.masslesstech.ca). 

### Details
Geolocation coordinates are sent from the client to the server and are cached in a cookie for the remainder of the session. Weather data is also kept in a cookie for 15 minutes after it is fetched via the OpenWeatherMap API.

## Usage
- `npm install` (runs Webpack)
- Set the `APPID` environment variable to your OpenWeatherMap API key
- `APPID=<key> npm start`
- Access from http://localhost:3000/
- Allow HTML5 geolocation access in your browser

## Comments
This app is more complex than it absolutely needs to be, there's no doubt. However, I took the opportunity to familiarize myself with webpack, build scripts, and  modern Node development in general.

## Credits
by Jagger De Leo (2017)

## License
MIT (see [LICENSE](LICENSE))
