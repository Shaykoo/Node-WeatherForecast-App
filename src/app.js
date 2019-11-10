const path = require('path')   //node's core module not npm
const express = require('express') //npm module
const hbs = require('hbs') // npm module
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()


//Define path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname ,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs') // for not writing .hbs extension over and over again
app.set('views', viewsPath)  // setting for full fledged html pages
hbs.registerPartials(partialsPath) // setting for the partials

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather Forecast',
        subheading: 'Get the forecast',
        name:'Abhishek Sharma'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About me',
        name:'Abhishek Sharma'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help Centre',
        name:'Abhishek Sharma'
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address){
        return res.send({
          error:'You must provide address to know the forecast'
        })
    }
    geocode(req.query.address,(error, {longitude,latitude,location='Manali'} = {})=>{
        if(error){
           return res.send({
                error:'Error while fetching Geocode for the Address'
            })
        }
        forecast(longitude,latitude,(error,{temp,rain})=>{
            if(error){
             return res.send({
                    error:'Error while fetching Geocode for the Address'
                })
            }
            res.send({
                temp,
                rain,
                location
            })
        })
    })
})

app.get('/help/*', (req, res)=>{   // This is so cool
    res.render('404',{
        title:'A 404 Page',
        name:'Abhishek Sharma',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title:'A 404 Page',
        name:'Abhishek Sharma',
        errorMessage: 'Page not found'
    })
})

app.listen(8787, ()=> {
    console.log('Server has started')
})