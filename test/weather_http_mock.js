var nock = require('nock');

module.exports = {
  init: function () {
    nock('http://myapp.iriscouch.com')
      .get('/users/1')
      .reply(404);
  }
};