const express = require('express')
const router = express.Router()
const tweetController = require("../controller/tweetController")


router.get("/timeline", tweetController.timeline)
router.post("/tweet", tweetController.tweet)


module.exports = router
