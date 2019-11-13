const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const temprature = document.getElementById('temp')
const rain = document.getElementById('rain')
const address = document.getElementById('address')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value;
    address.textContent = 'Loding...';
    rain.textContent = '';
    temprature.textContent = '';

    fetch(`weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            address.textContent = data.error;
        } 
        else{
            address.textContent = data.location;
            temprature.textContent = `The temprature of ${location} is ${data.temp}`;
            rain.textContent = `Rain percentage is ${data.rain}%`;
        }
    })
  })
})