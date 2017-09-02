window.fbAsyncInit = function() {
  FB.init({
    appId      : '1289958244448361',
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
    getTimelineFB()
    $('#login-btn').fadeOut('slow')
    $('#timeline-wrapper').fadeIn('slow')
  }
}

function fbLogin () {
  FB.login(function(response) {
    if (response.authResponse) {
      localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
      window.location = 'faceblok.html'
    } else {
      console.log(`Can't Login`);
    }
  }, {scope: 'public_profile,email,publish_actions,user_posts'});
}

function handleResponses (response) {
  next = response.data.paging.next
  prev = response.data.paging.previous

  response.data.data.forEach((data) => {
    $('#timeline').append(`
      <div class="panel panel-primary">
        <div class="panel-heading">
          <a href="https://facebook.com/${data.id}" class="close" target="_blank">
            <i class="fa fa-external-link-square"></i>
          </a>
          <h3 class="panel-title">${data.story || 'Your Status'}</h3>
        </div>
        <div class="panel-body">
          ${data.message || ''}
        </div>
      </div>
    `)
  })
}

function getTimelineFB () {
  axios.get('http://localhost:3000/fb', { //declare axios ada di HTML
    headers: {
      accesstoken: localStorage.getItem('fbaccesstoken')
    }
  })
  .then(response => {
    handleResponses(response)
  })
  .catch(err => console.log(err))
}

function postStatus () {
  axios.post('http://localhost:3000/fb', {
    status: $('#status').val()
  }, {
    headers: {
      accesstoken: localStorage.getItem('fbaccesstoken')
    }
  })
  .then(response => {
    $('#timeline').prepend(`
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

function fbLogout() {
  FB.logout(response => {
    if (response) {
      window.location = 'index.html';
    } else {
      console.log(`error`);
    }
  })
}
