
const Request = require('request');
const toCelsius = require('./kelvinToCelsius.js');

const APIKEY = '6a7a3afe2b9d8a097d782c7587db02f9';    

const getWeather= (address, callback)=>{
    const requestUrlFormat = 'https://api.openweathermap.org/data/2.5/weather?q='+ address + '&appid=' + APIKEY;

    Request({url : requestUrlFormat, json : true }, (error, response)=>{
        if(error){
            callback('Could not connect to the weather api.', undefined);
        }else if(response.body.main == undefined){
            callback('The location could note be found.', undefined);
        }
        else{
            const data = response.body.main.temp;
            const weatherResponse =  'Temp is : ' + toCelsius(data);
            callback(undefined, weatherResponse); 
        }
    })
    
} 
module.exports = getWeather;