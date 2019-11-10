const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hheWtvbyIsImEiOiJjazJsd2ZqN3IwNzdtM2xuenR5a2FnaWgzIn0.nEzQ4EzcxlxnwR1RfOs4AQ`;
 
     request({ url, json:true}, (error, {body}) => { // destructured response object
         if(error){
             callback('Unable to access the Internet', undefined)
         }
         else if(body.features.length === 0){
             callback('Unable to find the location', undefined)
         }
         else{
             callback(undefined, {
                 longitude:body.features[0].center[0],
                 latitude:body.features[0].center[1],
                 location:body.features[0].place_name
             })
         }
     })
 }

module.exports = geocode;