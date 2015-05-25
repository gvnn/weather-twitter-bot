var request = require('request'),
  CONFIG = require('config'),
  URI = require('URIjs'),
  Promise = require('bluebird');

var weather_module = (function () {

  var _module = {};

  /**
   * Build the weather api url
   * @param resource
   * @param query
   */
  var buildUrl = function (resource, query) {
    var uri = new URI(CONFIG.weather.domain);
    uri
      .segment(CONFIG.weather.base_path)
      .segment(resource)
      .addQuery(query)
      .addQuery({units: CONFIG.weather.units});
    return uri.toString();
  };

  /**
   * Generic get api
   * @param url
   * @returns {bluebird|exports|module.exports}
   */
  var get = function (url) {
    return new Promise(function (resolve, reject) {
      request.get({
        url: url,
        json: true
      }, function (error, response, body) {
        if (error) {
          reject({
            error: error,
            response: response
          });
        } else {
          if (response.statusCode >= 400) {
            reject({
              error: error,
              response: response
            });
          } else {
            resolve(body);
          }
        }
      });
    });
  };

  /**
   * Returns the data from the forecast api for a specific location
   * @param lat
   * @param lon
   * @param days
   * @returns {bluebird|exports|module.exports}
   */
  var getForecast = function (lat, lon, days) {
    if (days <= 0) {
      days = 1;
    }
    if (days > 16) {
      days = 16;
    }
    var url = buildUrl('forecast', {
      lat: lat,
      lon: lon,
      cnt: days
    });
    return get(url);
  };

  /**
   * Returns today's weather
   * @param postcode
   * @returns {bluebird|exports|module.exports}
   */
  _module.today = function (postcode) {
    var url = buildUrl('weather', {zip: postcode + ',' + CONFIG.weather.country});
    return get(url);
  };

  /**
   * Returns today and tomorrow weather
   * @param postcode
   */
  _module.tomorrow = function (postcode) {
    return _module.days(postcode, 2);
  };

  /**
   * Returns the weather for a specific amount of days
   * @param postcode
   * @param days
   * @returns {bluebird|exports|module.exports}
   */
  _module.days = function (postcode, days) {
    // forecast api doesn't allow search by postcode, I need the lat & long
    return new Promise(function (resolve, reject) {
      _module
        .today(postcode)
        .then(function (today_weather) {
          getForecast(today_weather.coord.lat, today_weather.coord.lon, days).then(resolve).error(reject);
        })
        .error(reject);
    });
  };

  return _module;

}());

module.exports = weather_module;