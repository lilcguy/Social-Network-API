const express = require('express');
const db = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
//const router = require('express').Router();


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use(express.static('public')); //serves public folder as assets

app.get('/', (req, res) => { //'/' rout serves index.html
  res.sendFile('index.html', {root: __dirname});
});

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server for running on port ${PORT}!`);
    });
  });

//module.exports = router;