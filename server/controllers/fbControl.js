'use strict'

const FB = require('fb');

const fb = new FB.Facebook({version: '2.8'});

exports.main = (req, res) => {
  FB.api('/me/feed', 'post', {
    message: req.body.status
  }, function(response) {
    res.send(response)
  })
}

