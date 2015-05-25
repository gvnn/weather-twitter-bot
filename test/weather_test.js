var should = require('should'),
  weather = require('./../lib/weather'),
  http_mock = require('./weather_http_mock');

describe('Weather api test', function () {

  beforeEach(function (done) {
    http_mock.init();
    done();
  });

  describe('today weather by postcode', function () {

    it('should return 404', function (done) {
      weather.today(3012).then(
        function (weather) {
          // shouldn't go here
        }).error(function (e) {
          should.exist(e);
          done();
        });
    });

    it('should return weather object', function (done) {
      weather.today(3068).then(
        function (weather) {
          weather.weather[0].main.should.be.equal('Clear');
          weather.weather[0].description.should.be.equal('sky is clear');
          done();
        });
    });

    it('should return the weather for 2 days', function (done) {
      weather.tomorrow(3068).then(
        function (weather) {
          weather.list.length.should.be.equal(2);
          done();
        });
    });

    it('should return the weather for 16 days', function (done) {
      weather.days(3068, 100).then(
        function (weather) {
          should.exist(weather);
          done();
        });
    });

    it('should return the weather for 1 day', function (done) {
      weather.days(3068, -100).then(
        function (weather) {
          should.exist(weather);
          done();
        });
    });

  });

});