const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const env = require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var twitt = require('./router/twit')
app.use('/twitter', twitt)


app.listen(3000)
