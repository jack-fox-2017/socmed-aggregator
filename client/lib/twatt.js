$(document).ready(function(){
  timeline()
})

$('form.new-twatt').submit(eventHandler => {
  //console.log('touchdown')
  eventHandler.preventDefault()
  axios.post('http://localhost:3000/twatt/postStatus', {
    status : $('#new-twatt').val()
  })
  .then(() => {
    usertimeline()
  })
  .catch((err) => {
    console.log(err)
  })
});


function timeline() {
  $.ajax({
    url: 'http://localhost:3000/twatt/timeline',
    type: 'GET',
    dataType: 'json',
    success: data=>{
      $('#tl').empty();
      $('#tl').append(`<h3>Home Timeline</h3>`)
      // console.log(data)
      data.forEach(tl=>{
        $('#tl').append(`
          <div class="card" style="margin:10px 0px 10px 0px">
            <div class="card-body">
                <p> ${tl.user.name} (@${tl.user.screen_name}) </p>
                <p> ${tl.text} </p>
                <p> ${tl.created_at} </p>
            </div>
          </div>
          `)
        })
      }
    })
}

function usertimeline() {
  $.ajax({
    url: 'http://localhost:3000/twatt/usertimeline',
    type: 'GET',
    dataType: 'json',
    success: data=>{
      $('#tl').empty();
      $('#tl').append(`<h3>My Timeline</h3>`)
      data.forEach(tl=>{
        $('#tl').append(`
          <div class="card" style="margin:10px 0px 10px 0px">
            <div class="card-body">
                <p> ${tl.user.name} (@${tl.user.screen_name}) </p>
                <p> ${tl.text} </p>
                <p> ${tl.created_at} </p>
            </div>
          </div>
          `)
        })
      }
  })
}

function search() {
  //console.log($('.form-control').val())
  $.ajax({
    url: 'http://localhost:3000/twatt/search/'+$('.form-control').val(),
    type: 'GET',
    dataType: 'json',
    success: data=>{
      // console.log(data)
      $('#tl').empty();
      $('#tl').append(`<h3>Search result</h3>`)
      data.statuses.forEach(status =>{
        $('#tl').append(`
          <div class="card" style="margin:10px 0px 10px 0px">
            <div class="card-body">
                <p> ${status.user.name} (@${status.user.screen_name}) </p>
                <p> ${status.text} </p>
                <p> ${status.created_at} </p>
            </div>
          </div>
          `)
        })
      }
  })
}
