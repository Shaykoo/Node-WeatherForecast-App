const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/52d2296dfdc769c93a8b6234219e66dc/${longitude},${latitude}`
    
    request({ url, json:true}, (error, {body})=>{ // response object destructured
        if(error){
            callback('Unable to connect to Weather API', undefined)
        }
        else if(body.error){
            callback('Unable to find the location', undefined)
        }
        else{ 
            callback(undefined,{
            temp : body.currently.temperature,
            rain : body.currently.precipProbability,
            humidity: body.hourly.data[0].humidity,
            windSpeed: body.hourly.data[0].windSpeed
        })
      }
    })
}

module.exports = forecast;