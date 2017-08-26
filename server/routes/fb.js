var express = require('express');
var router = express.Router();

const FB = require('fb');
const fb = new FB.Facebook({version: 'v2.8'});

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.fbaccesstoken);
  next()
}

// router.get('/', setAccessToken,
// (req, res) => {
//   FB.api('/me/feed', 'post', {
//     message: req.body.status
//   }, function(response) {
//     res.send(response)
//   })
// });

router.get('/timeline', setAccessToken, (req, res)=>{
  FB.api('/me/feed', function(response) {
    res.json(response)
  })
});
// router.get('/usertimeline', setAccessToken, fbController.getUserTL);
//router.get('/search/:keyword', twattController.findByKeyword);
// router.post('/postStatus', setAccessToken, fbController.postStatus);

module.exports = router;
