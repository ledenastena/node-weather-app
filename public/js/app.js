const form = document.querySelector('#forecast-form')
const input = document.querySelector('#input-field')
const message = document.querySelector('#message-1')



form.addEventListener('submit', (e) => {
  e.preventDefault()
  const address = input.value
  
  message.innerHTML = 'Loading...'

  fetch('http://localhost:3000/weather?address=' + address)
  .then(response => response.json())
  .then(data => {
    if(data.error) {
      message.innerHTML = data.error
    } else {
      message.innerHTML = data.address + '</br> ' + data.weather + '</br> ' + data.temp
    }
  })
  .catch(e => console.log(e.message))
})