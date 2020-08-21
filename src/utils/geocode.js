const request = require('request')

function geocode(address, callback) {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGVkZW5hc3RlbmEiLCJhIjoiY2tkb2lvbGxqMXNzbDJ4bGNpZ2E1ZXBiMSJ9.VodugRza-6sEqdsGTmfnHQ&limit=1'

  request({url, json: true}, (error, {body: {message, features}}) => {
    if (error) {
      callback('There was a connection error.', undefined)
    } else if (message) {
      callback(message, undefined)
    } else if (!features.length) {
      callback('Unable to find location. Try a different search term.', undefined)
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      })
    }
  })
}

module.exports = geocode