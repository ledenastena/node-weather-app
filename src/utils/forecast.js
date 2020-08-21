const request = require('request')


function forecast(lat, long, callback) {
  const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(long) + '&units=metric&appid=01a6dfc446339f681c54a68ab7f2b832'

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('There was a connection error', undefined)
    } else if (body.message) {
      callback(body.message, undefined)
    } else {
      callback(undefined, {
        description: body.daily[0].weather[0].description,
        temperature: body.current.temp,
      })
    }
  })
}

module.exports = forecast