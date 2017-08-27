window.fbAsyncInit = function() {
  FB.init({
    appId: '1949064548648481',
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.10' // use graph api version 2.8
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function FBLogin() {
  FB.login(function(response) {
    console.log(response)
    if (response.authResponse) {
      localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
      getTimeLine()
      $(".login").append(`<div><h4>facebook ${response.status}</h4></div>
        <button id="button" onclick="logOut()" type="button" name="button">Logout</button>
        <br><br>
        <input id="status" type="text" name="status" value="">
        <button id="button-status" type="button" name="button" onclick="updateStatus()">update</button>
        <button id="timeline" onclick="getTimeLine()" type="button" name="button">Refresh</button>
        `)
      $("#login-btn").remove()

    } else {
      console.log('Membatalkan Login');
    }
  }, {
    scope: 'public_profile,email,publish_actions,user_posts'
  });
}

function updateStatus(){
  axios.post('http://localhost:3000/facebook/status',{
    status: $('#status').val()
  },{
    headers:{
      accessToken: localStorage.getItem('fbaccesstoken')
    }
  })
  .then((response)=>{
    console.log(response);
    $("#updated").remove()
    $(".handling").append(`<div id="updated"><p>status updated</p></div>`)


  })
  .catch(err=>{
    console.log(err);
    $(".handling").append(`<p>Silahkan login terlebih dahulu</p>`)
  })
}
function logOut(){
  localStorage.removeItem('fbaccesstoken')
  window.location.href= 'facebook.html'
}

function getTimeLine(){
  axios.get('http://localhost:3000/facebook/timeline',{
    headers:{
      accessToken: localStorage.getItem('fbaccesstoken')
    }
  })
  .then((response)=>{
    console.log(response.data.data[0].message);
    let timeline = response.data.data
    $(".timeline").empty()
    timeline.forEach(tl =>{
      if(tl.message != undefined){
        $(".timeline").append(`<p>${tl.message}</p>`)
      }
      // console.log(tl);
    })
  })
  .catch(err=>{
    console.log(err);
    $(".timeline").append(`<p>anda belum login</p>`)
  })
}
