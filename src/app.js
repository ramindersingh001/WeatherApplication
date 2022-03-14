const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const app = express()

app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'../public')))

app.set('views',path.join(__dirname,'../views'));

hbs.registerPartials(path.join(__dirname,"../views/partials"))


app.listen(8085,()=>{
    console.log("Listening port 8085")
})

app.get("/", (req,res)=>{
    res.render("index",{
        title: 'Weather Application',
        name: 'Raminder Singh'
    });
})

app.get("/help", (req,res)=>{
    res.render("help",{
        title: 'Weather Application'
    })
})

app.get("/about", (req,res)=>{
    res.render("about",{
        title: 'Weather Application'
    })
})

app.get("/weather", (req,res)=>{

    if(!req.query.location){
        return res.send({
            error: 'Location element is not specified.'
        })        
    }
    const url ='http://api.weatherstack.com/current?access_key=97f6c4bbd97e15cbb020706a9f1815c7&query='+req.query.location;
    request({url, json: true},(err,response)=>{
        res.send({
            'Location': response.body.request.query,
            'Forecast': 'It is currently '+response.body.current.temperature + ' degree out. There is '+response.body.current.precip + '% chance of Rain.'
        })
        //console.log('City : '+response.body.request.query)
        //console.log('It is currently '+response.body.current.temperature + ' degree out. There is '+response.body.current.precip + '% chance of Rain.')
    })
})
