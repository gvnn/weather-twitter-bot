var should = require('should'),
  request = require('request'),
  http_mock = require('./weather_http_mock');

describe('Weather api test', function(){

  before(function(done) {
    http_mock.init();
    done();
  });

  describe('today weather by postcode', function(){
    it('return 404', function(done){
      request('http://myapp.iriscouch.com/users/1', function (error, response, body) {
        response.statusCode.should.equal(404);
        done();
      });
    });
  });

});