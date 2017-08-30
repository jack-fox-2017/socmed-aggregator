      var next = ''
      var prev = ''
      window.fbAsyncInit = function() {
      FB.init({
        appId      : 468598230165701,
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
        }
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