var express = require('express');
var router = express.Router();

const FB = require('fb');
const fb = new FB.Facebook({version: 'v2.10'});

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.accesstoken);
  next()
}

router.post('/status', (req, res)=>{
  FB.setAccessToken(req.headers.accesstoken)
  FB.api('/me/feed', 'post', {message: req.body.status} ,(response)=>{
    res.send(response)
  })
})

router.get('/timeline',(req, res)=>{
  FB.setAccessToken(req.headers.accesstoken);
  FB.api('/me/feed', (response)=>{
    res.send(response)
  })
})

module.exports = router;
