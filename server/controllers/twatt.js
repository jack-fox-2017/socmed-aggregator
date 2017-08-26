const twatt = require('../models/Twatt');

var getTL = (req, res) =>{
  let endpoint = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
  twatt.Get(endpoint, (err, result)=>{
    if(err) res.send(err);
    else res.json(JSON.parse(result));
  })
}

var getUserTL = (req, res) =>{
  let endpoint = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
  twatt.Get(endpoint, (err, result)=>{
    if(err) res.send(err);
    else res.json(JSON.parse(result));
  })
}

var postStatus = (req, res) =>{
  let endpoint = 'https://api.twitter.com/1.1/statuses/update.json';
  twatt.Post(endpoint, req.body.status, (err, result)=>{
    if(err) res.send(err);
    else res.json(JSON.parse(result));
  })
}

var findByKeyword = (req, res) =>{
  let keyword = req.params.keyword;
  let endpoint = `https://api.twitter.com/1.1/search/tweets.json?q=${keyword}&result_type=recent`;
  twatt.Get(endpoint, (err, result)=>{
    if(err) res.send(err);
    else res.json(JSON.parse(result));
  })
}

module.exports = {
  getTL,
  getUserTL,
  postStatus,
  findByKeyword
}
