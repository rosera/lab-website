const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const pathPublicDirectory = path.join(__dirname, './public'); 
const pathViews = path.join(__dirname, '/views');
const pathPartials = path.join(__dirname, '/partials');
const url = process.env.URL || 'https://storage.googleapis.com/spl-api/test.json'
const projectId = process.env.PROJECT_ID || 'qwiklabs-gcp-01-bd4255a49d1a'
const users = process.env.USERS || '[{"name": "user_0"}, {"name": "user_1"}, {"name": "user_3"}]'
const providerGoogle  = process.env.PROVIDER || '{"name": "https://accounts.google.com/AddSession?service=accountsettings&sarp=1&continue=https%3A%2F%2Fconsole.cloud.google.com%2Fhome%2Fdashboard%3Fproject%3Dqwiklabs-gcp-01-bd4255a49d1a#Email=student-03-1a34a6033750@qwiklabs.net"}'
const googleCloudSite = "https://accounts.google.com/AddSession?service=accountsettings&sarp=1&continue=https%3A%2F%2Fconsole.cloud.google.com%2Fhome%2Fdashboard%3Fproject%3D"

// Console URL: "https://accounts.google.com/AddSession?service=accountsettings&sarp=1&continue=https%3A%2F%2Fconsole.cloud.google.com%2Fhome%2Fdashboard%3Fproject%3D"
// PROJECT: "qwiklabs-gcp-01-bd4255a49d1a#"
// Student Account: Email=student-03-1a34a6033750@qwiklabs.net"}'

 
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
  let hackathon    = await getRemoteConfiguration(url)
  let accountsList = await getObjectText(users)
  let consoleUrl   = await getObjectText(providerGoogle)
  
  console.log(accountsList)
  
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
      teams:hackathon.teams,
      accounts: accountsList,
      console: googleCloudSite 
    });
})

async function setConsoleUrl(){
  // Get the console URL
  // Add the ProjectId

  // Return the value
}

async function getObjectText(inputText) {
 const obj = JSON.parse(inputText);
 return obj; 
}

async function getRemoteConfiguration(testUrl) {
  try {
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return {};
  }
}

// Listen on a network port
app.listen(port, () => console.log(`Listening on:${port}`))
