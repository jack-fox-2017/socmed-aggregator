var {OAuth} = require('oauth');
require('dotenv').config()

var oauth = new OAuth(
          'https://api.twitter.com/oauth/request_token',
          'https://api.twitter.com/oauth/access_token',
          process.env.CONSUMER_KEY,
          process.env.CONSUMER_SECRET,
          '1.0A',
          null,
          'HMAC-SHA1'
        );

var Get = function (endpoint, cb) {
  oauth.get(
        endpoint,
        process.env.ACCESS_TOKEN, //test user token
        process.env.ACCESS_TOKEN_SECRET, //test user secret
        function (e, data, res){
          cb(e, data)
        });
}

var Post = function (endpoint, status, cb) {
  oauth.post(
        endpoint,
        process.env.ACCESS_TOKEN, //test user token
        process.env.ACCESS_TOKEN_SECRET, //test user secret
        {status},
        function (e, data){
          cb(e, data)
        });
}

module.exports = {
  Get,
  Post
}
