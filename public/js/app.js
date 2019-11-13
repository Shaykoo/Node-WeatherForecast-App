const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const temprature = document.getElementById('temp')
const rain = document.getElementById('rain')
const address = document.getElementById('address')
const extraInfo = document.getElementById('extraInfo')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value;
    address.textContent = 'Loading...';
    rain.textContent = '';
    temprature.textContent = '';
    extraInfo.textContent = '';

    fetch(`weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            address.textContent = data.error;
        } 
        else{
            address.textContent = data.location;
            temprature.textContent = `The temperature of ${location} is ${data.temp}`;
            rain.textContent = `Rain percentage is ${data.rain}%`;
            extraInfo.textContent = `The humidity today will be ${data.humidity} and the wind speed is ${data.windSpeed}`
        }
    })
  })
})