'use strict'

// const
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');

// express
const app = express();

// cors
app.use(cors())

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/*+json'}));
app.use(bodyParser.json({ type : 'application/x-www-form-urlencoded'}));

// routes
const fb = require('./routes/fb')
const twatt = require('./routes/twatt');

app.get('/', (req, res) => res.send('Index Page'));
app.use('/fb', fb)
app.use('/twatt', twatt)


app.listen(3000, () => console.log('Listening...'))