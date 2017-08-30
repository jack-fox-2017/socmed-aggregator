'use strict'

const OAuth = require('oauth');
const dotenv = require('dotenv').config();

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  // consumer key
  process.env.CONSUMER_KEY,
  //secret
  process.env.SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);


exports.defaultTimeline = (req, res) => {
  oauth.get(
    'https://api.twitter.com/1.1/statuses/user_timeline.json',
    process.env.USER_TOKEN, //test user token
    process.env.USER_SECRET, //test user secret
    function (e, data, r){
      if (!e) res.send(data);
      else res.status(500).send(e)
  });
};


exports.otherUserTimeline = (req, res) => {
  oauth.get(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${req.query.q}`,
    process.env.USER_TOKEN, //test user token
    process.env.USER_SECRET, //test user secret
    function (e, data, r){
      if (!e) res.send(data);
      else res.status(500).send(e)
  });
};


exports.post = (req, res) => {
  oauth.post(
    `https://api.twitter.com/1.1/statuses/update.json?status=${req.body.text}`,
    process.env.USER_TOKEN, //test user token
    process.env.USER_SECRET, //test user secret
    req.body.text,
    'text',
    function (e, data, r){
      if (!e) res.send(data);
      else res.status(500).send(e)
  });
};


exports.trending = (req, res) => {
  oauth.get(
    'https://api.twitter.com/1.1/trends/place.json?id=1&count=10',
    process.env.USER_TOKEN, //test user token
    process.env.USER_SECRET, //test user secret
    function (e, data, r){
      if (!e) res.send(data);
      else res.status(500).send(e)
  });
};


exports.search = (req, res) => {
  console.log(req.query.q);
  oauth.get(
    `https://api.twitter.com/1.1/search/tweets.json?q=${req.query.q}`,
    process.env.USER_TOKEN, //test user token
    process.env.USER_SECRET, //test user secret
    function (e, data, r){
      if (!e) res.send(data);
      else res.status(500).send(e)
  });
};
