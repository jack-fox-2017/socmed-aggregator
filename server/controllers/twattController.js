var OAuth = require('oauth');
require('dotenv').config()

const getTwitter = function (req,res) {
  var oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        // 'your application consumer key',
        process.env.APP_CONSUMER_KEY,
        // 'your application secret',
        process.env.APP_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
      );
      oauth.get(
        `https://api.twitter.com/1.1/search/tweets.json?q=${req.params.query}`,
        // 'your user token for this app', //test user token
        process.env.USER_TOKEN,
        // 'your user secret for this app', //test user secret
        process.env.USER_SECRET,
        function (e, data, respond){
          if (e) console.error(e);
          res.send(data)
        });
}

const getHomeTimeline = function (req,res) {
  var oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        // 'your application consumer key',
        process.env.APP_CONSUMER_KEY,
        // 'your application secret',
        process.env.APP_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
      );
      oauth.get(
        `https://api.twitter.com/1.1/statuses/home_timeline.json?q=${req.params.account_name}`,
        // 'your user token for this app', //test user token
        process.env.USER_TOKEN,
        // 'your user secret for this app', //test user secret
        process.env.USER_SECRET,
        function (e, data, respond){
          if (e) console.error(e);
          res.send(data)
        });
}

const postNewStatus = function (req,res) {
  var oauth = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        // 'your application consumer key',
        process.env.APP_CONSUMER_KEY,
        // 'your application secret',
        process.env.APP_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
      );
      oauth.post(
        `https://api.twitter.com/1.1/statuses/update.json`,
        // 'your user token for this app', //test user token
        process.env.USER_TOKEN,
        // 'your user secret for this app', //test user secret
        process.env.USER_SECRET,
        {"status":req.body.update_status},
        function (e, data, respond){
          if (e) console.error(e);
          // console.log('ini data post', JSON.stringify(data));
          res.send({data: data.text, msg: 'berhasil post'})
        });
}


module.exports = {
  getTwitter,
  getHomeTimeline,
  postNewStatus
}
