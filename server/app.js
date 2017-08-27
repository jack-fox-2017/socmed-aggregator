const express = require("express")
const app = express()
const oauth = require("oauth")
const bodyParser = require('body-parser')
const cors = require('cors')
const fbRouter = require("./router/fbRouter")
const tweetRouter = require("./router/tweetRouter")
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/twitter", tweetRouter)
app.use("/facebook", fbRouter)

app.listen(3000, function () {
  console.log('3000 brai')
})
