//importing geocode and forecast module(own created modules)
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//importing path module to manupulate paths
const path = require('path')
//importing express to use it
const express = require('express')
//hbs module is to use handle bars(views and partials)
const hbs = require('hbs')
//creating instance of express appliation
const app = express()
//defining port
const port=process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve(public folder)
app.use(express.static(publicDirectoryPath))

//app.get is used to make reach to a url which take partial url and a call back method
//app.send to load a static page and render to load a dynamic page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Robin Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Robin Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Robin Singh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
  // if address exist then call geocode
    geocode(req.query.address,(error,{longitude,lattitude}={})=>{   
      
        if(error){
             res.send({
                 error:error
            })
        }
        else{
            forecast(lattitude,longitude,(error, {temp,feel}) => {
                //, {temp,feel} this is forcast data object destructred
                if(error){
                    res.send({error:error});
                }
                else{
                    data={
                        temp:temp,
                        feel:feel,
                        address:req.query.address
                    }
                    res.send(data);
                }
    
              })
        }
    })


    //***************************************************** */
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Robin Singh',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Robin Singh',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port);
})