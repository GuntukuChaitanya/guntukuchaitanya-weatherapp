const express = require('express');
const hbs = require('hbs');
const path = require('path');
const getWeather = require('../Weather App/getWeather');

const app = express();

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname,'/views');
const partialsPath = path.join(__dirname,'/partials');


app.set('view engine','hbs');
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)


app.listen(port, () =>{
    console.log('Server Running at', port);
})

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather Application"
    })
})

app.get('/weather',(req,res)=>{
    // res.send('Weather Endpoint');
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "Enter Location Name"
        })
    }
    getWeather(address, (error, {temperature, description, locName} ={})=>{
        if(error){
            return res.send({
                error
            });
        }
            console.log(temperature,description,locName);
            res.send({
                temperature,
                description,
                locName
            })
    })    
})


app.get('*',(req,res)=>{
    res.render('error',{
        title: "Page Not Found"
    });
})


