const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const pathPublicDirectory = path.join(__dirname, './public'); 
const pathViews = path.join(__dirname, '/views');
const pathPartials = path.join(__dirname, '/partials');
const url = process.env.URL || 'https://storage.googleapis.com/spl-api/test.json'
 
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

// Set hbs as the template engine
app.set('view engine', 'hbs');
app.set('views', pathViews);
hbs.registerPartials(pathPartials);

// Set the location of the html templates
app.use(express.static(pathPublicDirectory));     

// Initialise the port
const port = process.env.PORT || 8080;

// Render the web page with parameters
app.get('', async (req, res) => {

  // HTTP GET: Remote configuration file 
  let hackathon = await getInformation(url)
  
  // Render the HBS template
  res.render('hack', 
    {
      // Custom values
      title:hackathon.title, 
      organization:hackathon.organization, 
      url:hackathon.url, 
      code:hackathon.code, 
      tagline:hackathon.tagline, 
      assistance:hackathon.assistance, 
      trainers: hackathon.trainers,
      teams:hackathon.teams
    });
})


async function getInformation(testUrl) {
  try {
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    // res.status(200).json(response);
    return response;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// Listen on a network port
app.listen(port, () => console.log(`Listening on:${port}`))
