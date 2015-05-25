var request = require('request'),
  CONFIG = require('config'),
  URI = require('URIjs'),
  Promise = require('bluebird');

var weather_module = (function () {

  var _module = {};

  var buildUrl = function (resource, query) {
    var uri = new URI(CONFIG.weather.domain);
    uri
      .segment(CONFIG.weather.base_path)
      .segment(resource)
      .addQuery(query)
      .addQuery({units: CONFIG.weather.units});
    return uri.toString();
  };

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

  _module.today = function (postcode) {
    var url = buildUrl('weather', {zip: postcode + ',' + CONFIG.weather.country});
    return get(url);
  };

  return _module;

}());

module.exports = weather_module;