const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const cookieParser = require('cookie-parser');

const cookieSecret = process.env.cookieSecret;
const secret = process.env.JWT;
const app = express();

// logging middleware
// Only use logging middleware when not running tests
const debug = process.env.NODE_ENV === 'test';
app.use(volleyball.custom({debug}));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieSecret));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
