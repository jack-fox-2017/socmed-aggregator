// const model = require('../model');
const dotenv = require('dotenv').config()
const oauth = require('../helper/oauth');

var selfTimeline = (req, res)=>{
  oauth.get(
    // 'https://api.twitter.com/1.1/trends/place.json?id=23424977', //default
    'https://api.twitter.com/1.1/statuses/user_timeline.json',
    process.env.USER_TOKEN, //test user token
    process.env.USER_SECRET, //test user secret
    function (e, data, respond){
      if (e) console.error(e);
      res.send(data)
    }
  );
}

var searchKeyword = (req, res)=>{
  let keyword = req.params.keyword
  oauth.get(
    `https://api.twitter.com/1.1/search/tweets.json?q=${keyword}`,
    process.env.USER_TOKEN, //test user token
    process.env.USER_SECRET, //test user secret
    function (e, data, respond){
      if (e) console.error(e);
      res.send(data)
    }
  );
}
//let data = req.params.users
var searchUser = (req, res)=>{
  let username = req.params.name
  oauth.get(
    `https://api.twitter.com/1.1/users/lookup.json?screen_name=${username}`,
    process.env.USER_TOKEN, //test user token
    process.env.USER_SECRET, //test user secret
    function (e, data, respond){
      if (e) console.error(e);
      res.send(data)
    }
  );
}

var postTweet = (req, res)=>{
  let query = req.body.quote
  oauth.post(
    `https://api.twitter.com/1.1/statuses/update.json?status=${query}`,
    process.env.USER_TOKEN, //test user token
    process.env.USER_SECRET, //test user secret
    query,
    'text',
    function (e, data, respond){
      if (e) console.error(e);
      res.send(data)
    }
  );
}

module.exports = {
  selfTimeline, searchKeyword, searchUser, postTweet
}
