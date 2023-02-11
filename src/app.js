const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode.js');
const foreCast = require('./utils/foreCast.js');

const app = express();

// // // Define paths for Express config
const pathDirectoryPath = path.join(__dirname, `../public`);
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// // // Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

// // //setup directory to serve
app.use(express.static(pathDirectoryPath));

// // // render for hbs template
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    author: 'Rajan Padariya',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    author: 'Rajan Padariya',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'HELP page',
    author: 'Rajan Padariya',
    helpText: 'This is a help text!',
  });
});

// // //never gets executed due to app.use() above
// app.get('', (req, res) => {
//   res.send(`<h1>Hello Expresss!</h1>`);
// });

// app.get('/help', (req, res) => {
//   res.send({ tab: 'HELP' });
// });

// app.get('/about', (req, res) => {
//   res.send(`<h2>About tab</h2>`);
// });

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide an address',
    });
  }

  ////////////
  const address = req.query.address;

  if (!address) {
    console.log(`Please provide an address`);
  } else {
    geoCode(address, (geoCodeError, { latitude, longitude, place } = {}) => {
      if (geoCodeError) {
        // return console.log(chalk.red.bold(geoCodeError));
        return res.send({
          error: geoCodeError,
        });
      }

      foreCast(latitude, longitude, (foreCastError, foreCastData) => {
        if (foreCastError) {
          // return console.log(chalk.red.bold(foreCastError));
          return res.send({
            error: foreCastError,
          });
        }

        // console.log(chalk.green.bold(place));
        // console.log(chalk.green(foreCastData));

        res.send({
          forecast: foreCastData,
          location: place,
          address: req.query.address,
        });
      });
    });
  }

  ///////////

  // res.send({
  //   forecast: 54,
  //   location: 'sahara',
  //   address: req.query.address,
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query);

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    author: 'Rajan Padariya',
    errorMessage: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    author: 'Rajan Padariya',
    errorMessage: 'Page not found.',
  });
});

app.listen(3000, () => {
  console.log(`Server running on port 3000.`);
});

// console.log(__dirname);
// console.log(__filename);
