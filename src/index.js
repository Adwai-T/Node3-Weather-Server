const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getWeather = require('./Utils/get-Weather');
/*
    console.log(__dirname); //Gives path to this file
    console.log(__filename); //Gives path to this file with file name.
    //path is a core module of node that help in path manipulation
    console.log(path.join(__dirname, '../public')) //go back to directories and the go to public directory

*/
//To Create the server call the express method.
const app = express();

//Get the port value form heroku or for local default back to 3000.
const port = process.env.PORT || 3000;
//path to the partials folder.
const partialsPath = path.join(__dirname, '../views/partials');
//Set up Handlebar for templating:
app.set('view engine', 'hbs');
//Set the partials folder: 
hbs.registerPartials(partialsPath);
//index.html will be served by default if no specific path is specified.
//We could implicitely go to index.html by Going to localaddress:3000/index.html
//static takes an absolute path to the file.
app.use(express.static(path.join(__dirname, '../public')));

//Dynamically rendered pages with templates using handlebars
//Use the template with name index.hbs from views. As path is not set it will use index by default
app.get('', (req, res)=>{
    res.render('index',{
        name : 'Adwait',
        title: 'Index',
        weather : 'WeatherApp',
    });
});

//Following are statically served pages.
//To set up a new route: go to localhost:3000/help
app.get('/help',(req, res)=>{
    res.send('Help page');
});

//Show weather: Go to localhost: 3000/weather
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address for the location was not provided.'
        });
    }

    getWeather(req.query.address, (error, data)=>{
        if(error){
            return res.send({
                error,
            });
        }
        res.send({
            address: req.query.address,
            temperatureNow: data,
        });
    });  
});
 
app.get('/help/*',(req, res)=>{
    res.send('Help article not found.')
});

//Create the 404 page not found page: The page should come last just before we start our server
//`*` here is a wild card character.
//As node will look for match in order the * will have to be set uo at last.
app.get('*', (req, res)=>{
    res.render('page404', {
        name : '404Page',
        title: '404PAGE',
    })
});


//3000 is the port used for development. Optional function can be passed to run when the server starts.
app.listen(port,()=>{
    console.log('Server Started.')
});

