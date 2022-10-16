const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const pathPublicDirectory = path.join(__dirname, './public'); 
const pathViews = path.join(__dirname, '/views');
const pathPartials = path.join(__dirname, '/partials');

// Set as environment variables

// Hackathon specific detail
const hackathon = {
  organization: "Google Cloud", 
  title: "Hack. The. Cloud.", 
  url: "https://googlesolution.qwiklabs.com",
  code: "password01",
  tagline: "Welcome to your Google Cloud hackathon. The environment is setup and ready to go. Your account has been provisioned and is ready for you to login.",
  assistance: "During the Hackathon, you can get assistance from your faciliators:",
  trainers: [
    {
      name: "Sandip Datta"
    }, 
    {
      name: "Gary Harmson"
    }
  ],
  teams: [
    {
      name: "Team A"
    }, 
    {
      name: "Team B"
    }
  ],
};

// Set hbs as the template engine
app.set('view engine', 'hbs');
app.set('views', pathViews);
hbs.registerPartials(pathPartials);

// Set the location of the html templates
app.use(express.static(pathPublicDirectory));     

// Initialise the port
const port = process.env.PORT || 8080;

// Render the web page with parameters
app.get('', (req, res) => {
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

// Listen on a network port
app.listen(port, () => console.log(`Listening on:${port}`))
