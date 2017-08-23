const express = require('express');
const router = express.Router()
const controller = require('../controllers/twitterController')
const { OAuth } = require('oauth')

const oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.CONSUMER_KEY_API_KEY,
  process.env.CONSUMER_SECRET_API_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);

router.get('/timeline', controller.seeTimeline)
router.post('/post', controller.postTweet)
router.get('/search', controller.searchTweet)
router.get('/followers', controller.seeFollowers)

module.exports = router;
