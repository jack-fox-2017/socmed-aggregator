'use strict'

const router = require('express').Router();
const ctrl = require('../controllers/fbControl')

const FB = require('fb');
const fb = new FB.Facebook({version: '2.8'});

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.accesstoken);
  next();
}

router.get('/', setAccessToken, ctrl.main)

module.exports = router;