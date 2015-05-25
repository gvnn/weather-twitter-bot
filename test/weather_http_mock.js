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
    ).get('/data/2.5/forecast?lat=-37.79&lon=144.99&cnt=2&units=metric')
      .reply(200, {
        "cod": "200",
        "message": 0.0035,
        "city": {
          "id": 1851632,
          "name": "Shuzenji",
          "coord": {"lon": 138.933334, "lat": 34.966671},
          "country": "JP",
          "population": 0
        },
        "cnt": 2,
        "list": [{
          "dt": 1432519200,
          "temp": {"day": 293.53, "min": 292.16, "max": 293.53, "night": 292.16, "eve": 292.87, "morn": 293.53},
          "pressure": 1015.29,
          "humidity": 88,
          "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d"}],
          "speed": 6.02,
          "deg": 58,
          "clouds": 80
        }, {
          "dt": 1432605600,
          "temp": {"day": 293.6, "min": 291.31, "max": 293.87, "night": 291.5, "eve": 293.02, "morn": 291.31},
          "pressure": 1014.74,
          "humidity": 87,
          "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d"}],
          "speed": 1.79,
          "deg": 89,
          "clouds": 32
        }]
      }).get('/data/2.5/forecast?lat=-37.79&lon=144.99&cnt=16&units=metric')
      .reply(200, {}).get('/data/2.5/forecast?lat=-37.79&lon=144.99&cnt=1&units=metric')
      .reply(200, {});

  }
};