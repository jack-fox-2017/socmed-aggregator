var next = ''
var prev = ''
window.fbAsyncInit = function() {
  FB.init({
    appId      : '155617368351865',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback (response)
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback (response) {
  if (response.status === 'connected') {
    localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
    //fbtimeline()
    $('#login-btn').fadeOut('slow')
    $('#timeline-wrapper').fadeIn('slow')
  }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

function FBLogin () {
  FB.login(function(response) {
    console.log('fblogin response ',response)
    if (response.authResponse) {
      localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {scope: 'public_profile,email,publish_actions,user_posts'});
}

function handleResponses (response) {
  // /console.log(response)
  $('#tl').empty();
  response.data.data.forEach((data) => {
    //console.log(data)
    $('#tl').append(`
      <div class="card" style="margin:10px 0px 10px 0px">
        <div class="card-body">
          <h5 class="panel-title">${data.story || 'Your Status'}</h3>
          ${data.message || ''}
        </div>
      </div>
    `)
  })
}

function fbtimeline () {
  axios.get('http://localhost:3000/fb/timeline', {
    headers: {
      fbaccesstoken: localStorage.getItem('fbaccesstoken')
    }
  })
  .then((response) => {
    // console.log(response)
    handleResponses(response)
  })
  .catch((err) => {
    console.log(err)
  })
  // $.ajax({
  //   url: 'http://localhost:3000/fb/timeline',
  //   type: 'GET',
  //   beforeSend: xhr=>{xhr.setRequestHeader('fbaccesstoken', localStorage.getItem('fbaccesstoken'));},
  //   dataType: 'json',
  //   success: response=>{
  //     console.log(response)
  //     handleResponses(response)
  //   },
  //   error: err=>{
  //     console.log(err)
  //   }
  // })
}

function prevNextTimeline (cursor) {
  $('#timeline').html('')
  axios.get(cursor)
  .then(response => {
    handleResponses(response)
  })
  .catch(err => {
    console.log(err)
  })
}

function postStatus () {
  console.log('post status')
  axios.post('http://localhost:3000/fbtimeline', {
    status: $('#status').val()
  }, {
    headers: {
      accesstoken: localStorage.getItem('fbaccesstoken')
    }
  })
  .then(response => {
    console.log(response)
    $('#tl').prepend(`
      <div class="panel panel-primary">
        <div class="panel-heading">
          <a href="https://facebook.com/${response.data.id}" class="close" target="_blank">
            <i class="fa fa-external-link-square"></i>
          </a>
          <h3 class="panel-title">Your Status</h3>
        </div>
        <div class="panel-body">
          ${$('#status').val()}
        </div>
      </div>
    `)
    $('#status').val('')
  })
  .catch(err => {
    console.log(err)
  })
}
