const oauth = require("oauth")
const myOauth = new oauth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  "9c8iZ2RHuGXf87YLGLdegNHCB",
  "EwYv9gNa43Mu9zY61h7WPpTVi2pebSZv2FmI2ePEi8h6wIoHGU",
  "1.0A",
  null,
  "HMAC-SHA1"
)

const tweet = (req, res)=>{
  myOauth.post(
  `https://api.twitter.com/1.1/statuses/update.json?status=${req.body.update}`,
  process.env.TOKEN, process.env.SECRET,
  req.body.update,
  "text",
  function (e, data, respon){
    if (e) console.error(e);
    console.log(require('util').inspect(data));
    res.send(data)
  });
}

const timeline = (req, res)=>{
  myOauth.get(
  'https://api.twitter.com/1.1/statuses/home_timeline.json',
  process.env.TOKEN, process.env.SECRET,
  function (e, data, respon){
    if (e) console.error(e);
    console.log(require('util').inspect(data));
    res.send(data)
  });
}

module.exports = {
  tweet,
  timeline
}
