// server.js

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

let body = {};

// Special piece for running with webpack dev server
if (process.env.NODE_ENV === "development") {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

app.get("/api/database", function(request, response) {
  response.send(body);
});

app.post("/api/data", (request, response) => {
  //console.log(req.body);
  body = request.body;
  response.sendStatus(200);
});

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
