const {OAuth} = require('oauth')
const dotenv = require('dotenv').config()

var oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.APP_TOKEN,
  process.env.APP_SECRET,
  '1.0A',
  null,
  'HMAC-SHA1'
);

module.exports = oauth
