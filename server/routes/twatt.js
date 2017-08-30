'use strict'
const router = require('express').Router()
const twt = require('../controllers/twattControl')

// test
// router.get('/', (req, res) => res.send('twatt index'))


router.get('/', twt.defaultTimeline)
// localhost:3000

router.get('/user?:q', twt.otherUserTimeline)
// user's timeline with display name @fulan
// localhost:3000/twatt/user?q=fulan

router.post('/newtwat', twt.post)
// localhost:3000/twatt/newtwat
// body.text = new twat // new post/twat retrieved from req.body.text

router.get('/trending', twt.trending)
// trending on twitter, globally
// localhost:3000/twatt/trending

router.get('/search?:q', twt.search)
// search for kamen rider
// localhost:3000/twatt/search?q=kamen+rider

module.exports = router;