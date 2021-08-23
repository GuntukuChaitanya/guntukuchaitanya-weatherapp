const request = require('request');
const credentials = require('../Weather App/config');

const getWeather = (address, callback) =>{
    const url = credentials.openWeatherMap.start_url + encodeURIComponent(address) + "&appid=" + credentials.openWeatherMap.api_key;
    console.log(url);
    request({url, json:true}, (error, {body})=>{
        console.log(body);
        if(error){
            callback("OpenWeatherMap Api Data Not Fetched", undefined)
        }
        else if(!body.main || !body.main.temp || !body.name || !body.weather ){
            callback("Location Doesn't Exist",undefined);
        } 
        else{
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                locName: body.name
            })
        }
    })
}

module.exports = getWeather;