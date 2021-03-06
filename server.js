const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();
// creates support for partials
hbs.registerPartials(__dirname+'/views/partials');
// helper registration to use in partial
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

// serve a directory
app.use(express.static(__dirname+'/public'));
// set view engine property
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    let now = new Date().toString();
    let log =`${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
//next() must be called to continue serving the site
    next();
});

// app.use((req, res, next)=>{
//     res.render(
//         'maintenance.hbs',
//         {
//             pageTitle:'**Maintenance**'
//         }
//     );
// });


app.get('/', (req, res)=>{
    // res.send('Help! I\'m working!')
    res.render(
        'home.hbs', {
            pageTitle:'Home Page',
            body:'I am a lovely cocoanut!'
        }
     );
});

app.get('/about', (req, res)=>{
    res.render(
       'about.hbs', {
           pageTitle:'About Page'
       }
    );
});

app.get('/projects', (req, res)=>{
    res.render(
       'projects.hbs', {
           pageTitle:'Project Page',
           body: "I'm still in progress."
       }
    );
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:`unable to process request`
    });
});

app.listen(port, ()=>{
    // callback function runs when server is running.
    console.log(`Server is up on port ${port}`);
});