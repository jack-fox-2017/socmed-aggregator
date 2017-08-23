const { OAuth } = require('oauth')
require('dotenv').config();

const oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.CONSUMER_KEY_API_KEY,
  process.env.CONSUMER_SECRET_API_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);

let seeTimeline = (req, res) => {
  
  // oauth.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=metamorphega&count=2', //bisa pakai ini, bisa juga pakai yang di bawah, count 2 = status 2 teratas
  oauth.get('https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=130388806&count=2',
  process.env.ACCESS_TOKEN,
  process.env.ACCESS_TOKEN_SECRET,
  function(e, data, response){
    if(e) console.error(e);
    res.send(data)
  })
}

let postTweet = (req, res) => {
  oauth.post(`https://api.twitter.com/1.1/statuses/update.json?status=${req.body.key}`,
  process.env.ACCESS_TOKEN,
  process.env.ACCESS_TOKEN_SECRET,
	'status updated',
	'text',
  (e, data, response) => {
    if(e) console.error(e);
    res.send(data)
  })
}


let searchTweet = (req, res) => {
  oauth.get(`https://api.twitter.com/1.1/search/tweets.json?q=${req.query.key}`,
  process.env.ACCESS_TOKEN,
  process.env.ACCESS_TOKEN_SECRET,
  (e, data) => {
    if(e) console.error(e);
    res.send(data)
  })
}

let seeFollowers = (req, res) => {
  oauth.get('https://api.twitter.com/1.1/followers/list.json',
  process.env.ACCESS_TOKEN,
  process.env.ACCESS_TOKEN_SECRET,
  function(e, data, response){
    if(e) console.error(e);
    res.send(data)
  })
}

module.exports = {
  seeTimeline,
  postTweet,
  searchTweet,
  seeFollowers
};
