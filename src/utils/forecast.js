const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/d5775686b5687f3f5827053fcd684e45/${latitude},${longitude}?units=si`

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service!')
    } else if (body.error) {
      callback('Unable to find location!')
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
          body.currently.temperature +
          ' degress out. The high today is ' +
          body.daily.data[0].temperatureHigh +
          ' with a low of ' +
          body.daily.data[0].temperatureLow +
          ' .There is a ' +
          body.currently.precipProbability +
          '% chance of rain.'
      )
    }
  })
}

module.exports = forecast
