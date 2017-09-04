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

  $('#tweet').hide()
  $.ajax({
    url: 'http://localhost:3000/twitter/timeline',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      data.forEach(e =>{
        var template = $($('#tweet').prop('content')).children().clone()
        console.log(e.user);
        template.find('.body').text(e.text);
        template.find('.name').text(e.user.name);
        template.find('img').attr('src',e.user.profile_image_url);
        template.find('.user').text('@' + e.user.screen_name);
        template.find('.favorite').text('RT ' + e.favorite_count);
        template.find('.retweet').text('Fav ' + e.retweet_count);

        $('#timeline').append(template)
      })
    },
    fail: function(err) {
      console.log(err)
    }
  })

  $('#cari-tweet').click(function(event) {
    $('#hasil-pencarian').empty()
    let query = $('#search').val()
    console.log(query)
    axios.post('http://localhost:3000/search', {
      search: query
    })
    .then(function (response) {
      var content = response.data.statuses;

      for(let i = 0; i < content.length; i++) {
        var template = $($('#tweet').prop('content')).children().clone()
        template.find('.body').text(content[i].text);
        template.find('.name').text(content[i].user.name);
        template.find('img').attr('src',content[i].user.profile_image_url)
        template.find('.user').text('@' + content[i].user.screen_name);
        template.find('.favorite').text('RT ' + content[i].favorite_count);
        template.find('.retweet').text('Fav ' + content[i].retweet_count);

        $('#hasil-pencarian').append(template)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
  })


});
