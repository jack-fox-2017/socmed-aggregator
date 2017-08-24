const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv').config()
const app = express()
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var twitt = require('./router/twit')
app.use('/twitter', twitt)

app.listen(3000)
