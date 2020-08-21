const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Homepage'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'The help pagesisco',
    text: 'This is the help page provided by Team Meat'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Super Meat Boy'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'An address must be provided.'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error: error
      })
    }
  
    forecast(latitude, longitude, (forecastError, {description, temperature} = {}) => {
      if (forecastError) {
        return res.send({
          error: forecastError
        })
      }
      
      res.send({
        address: location,
        weather: description,
        temp: temperature
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('help404', {
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('base404', {
    title: '404'
  })
})

app.listen('3000', () => {
  console.log('server running on port 3000')
})
