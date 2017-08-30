const express = require('express');
const router = express.Router();
const FB = require('fb')
const fb = new FB.Facebook({version: 'v2.8'});

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.accesstoken);
  next()
}

//menjalankan middleware 
router.get('/facebook', setAccessToken, (req, res) => {
  FB.api('/me', )
})
