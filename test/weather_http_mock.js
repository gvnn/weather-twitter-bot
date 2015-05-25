var nock = require('nock');

module.exports = {
  init: function () {
    nock('http://api.openweathermap.org')
      .get('/data/2.5/weather?zip=3012%2Cau&units=metric')
      .reply(404)
      .get('/data/2.5/weather?zip=3068%2Cau&units=metric')
      .reply(200,
      {
        "coord": {"lon": 144.99, "lat": -37.79},
        "sys": {"message": 0.0391, "country": "AU", "sunrise": 1432502476, "sunset": 1432537958},
        "weather": [{"id": 800, "main": "Clear", "description": "sky is clear", "icon": "02d"}],
        "base": "stations",
        "main": {
          "temp": 13.02,
          "temp_min": 13.02,
          "temp_max": 13.02,
          "pressure": 1024.28,
          "sea_level": 1043.88,
          "grnd_level": 1024.28,
          "humidity": 88
        },
        "wind": {"speed": 1.87, "deg": 350.5},
        "clouds": {"all": 8},
        "dt": 1432525532,
        "id": 0,
        "name": "Fitzroy North",
        "cod": 200
      }
    );
  }
};