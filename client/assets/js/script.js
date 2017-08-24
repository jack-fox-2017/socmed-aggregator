$(document).ready(function() {

  $('#posttweet').click(function(event) {
    let query = $('#quote').val()
    axios.post('http://localhost:3000/twitter/post', {
      quote: query
    })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
  });

  // $('#tweet').hide()
  // $.ajax({
  //   url: 'http://localhost:3000/twitter/timeline',
  //   type: 'GET',
  //   dataType: 'json',
  //   success: function(data) {
  //     data.forEach(e =>{
  //       var template = $($('#tweet').prop('content')).children().clone()
  //       console.log(e.user);
  //       template.find('.body').text(e.text);
  //       template.find('.name').text(e.user.name);
  //       template.find('img').attr('src',e.user.profile_image_url);
  //       template.find('.user').text('@' + e.user.screen_name);
  //       template.find('.favorite').text('RT ' + e.favorite_count);
  //       template.find('.retweet').text('Fav ' + e.retweet_count);
  //
  //       $('#timeline').append(template)
  //     })
  //   },
  //   fail: function(err) {
  //     console.log(err)
  //   }
  // })

  $('#tweet-output').hide()
  $.ajax({
    url: 'http://localhost:3000/twitter/timeline',
    type: 'GET',
    success: function(data) {
      var content = JSON.parse(data);

      for(let i = 0; i < content.length; i++) {
        var template = $($('#tweet').prop('content')).children().clone()
        console.log(content[i].user);
        template.find('.body').text(content[i].text);
        template.find('.name').text(content[i].user.name);
        template.find('img').attr('src',content[i].user.profile_image_url);
        template.find('.user').text('@' + content[i].user.screen_name);
        template.find('.favorite').text('RT ' + content[i].favorite_count);
        template.find('.retweet').text('Fav ' + content[i].retweet_count);

        $('#timeline').append(template)
      }
    },
    fail: function() {
      console.log('Error')
    }
  })

});
