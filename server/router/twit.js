const express = require('express');
const router = express.Router();

const get = require('../controller/twit');

router.get('/timeline', get.selfTimeline)
router.get('/search-keyword/:keyword', get.searchKeyword)
router.get('/search-user/:name', get.searchUser)
router.post('/post', get.postTweet)

module.exports = router
