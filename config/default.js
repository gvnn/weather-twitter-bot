module.exports = {
  twitter: {
    consumer_key: process.env.WTB_TWITTER_CONSUMER_KEY || '',
    consumer_secret: process.env.WTB_TWITTER_CONSUMER_SECRET || '',
    access_token: process.env.WTB_TWITTER_ACCESS_TOKEN || '',
    access_token_secret: process.env.WTB_TWITTER_ACCESS_TOKEN_SECRET || ''
  },
  weather: {
    domain: 'http://api.openweathermap.org',
    base_path: 'data/2.5',
    country: 'au',
    units: 'metric'
  }
};