const express = require('express');
const path = require('path');
const store = require('./store/datastore');
const initialStoreData = require('./store/data');
const Musician = require('./models/musician');
const musicianRoutes = require('./routes/musician');
const https = require('https')
const http = require('http');

const app = express();
const port = process.env.port || 3001;

// include routes
app.use('/musician', musicianRoutes);

app.use(express.static('public'));

// Index route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// initialize store
const musician = new Musician(store);
musician.initStore(initialStoreData);
app.locals.musician = musician;

// start server
const server = app.listen(port, () => {
  console.log("Server started on port " + port);
});
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

module.exports = server;
