const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const cors = require('cors');
var twitt = require('./router/twit');
var fb = require('./router/faceblok');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/twitter', twitt);
app.use('/faceblok', fb);

app.listen(3000, ()=>{
  console.log('Listen me please');
});
