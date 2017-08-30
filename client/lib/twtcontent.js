
// page ready
$(document).ready(() => {
  load()
})

// load timeline & card
function load() {
  $('.timeline').empty()
  axios.get('http://localhost:3000/twatt')
  .then(timeline => {

    //template timeline
    timeline.data.forEach(list => {
      $('.timeline').append(`
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img style="border-radius:7px;" src="${list.user.profile_image_url}" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>${list.user.name}</strong> <small>  @${list.user.screen_name}</small> <small style="float:right;"></small>
                <br>
                ${list.text}
              </p>
            </div>
            <nav class="level">
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fa fa-reply"></i></span>
                </a>
                <a class="level-item">
                  <span class="icon is-small"><i class="fa fa-retweet"></i></span>
                </a>
                <a class="level-item">
                  <span class="icon is-small"><i class="fa fa-heart"></i></span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      `)
    }) // timeline.data.forEach

    // bagian atas card kiri
    // console.log(timeline.data[0])
    $('#user-info').empty()
    $('#user-info').append(`

      <header class="card-header" style="background-image: url('${timeline.data[0].user.profile_banner_url}');">
      </header>
      <div class="card-content">
        <a class="card-avatar">
          <img src="${timeline.data[0].user.profile_image_url}" class="card-avatar-img">
        </a>

        <div class="card-user">
          <div class="card-user-name">
            <a href="#">${timeline.data[0].user.name}</a>
          </div>
          <span>
            <a href="#">@<span>${timeline.data[0].user.screen_name}</span></a>
          </span>
        </div>

        <div class="card-stats">
          <ul class="card-stats-list">
            <li class="card-stats-item">
              <a href="#" title="9.840 Tweet">
                <span class="card-stats-key">Tweets</span>
                <span class="card-stats-val">${timeline.data[0].user.statuses_count}</span>
              </a>
            </li>
            <li class="card-stats-item">
              <a href="#/following" title="885 Following">
                <span class="card-stats-key">Following</span>
                <span class="card-stats-val">${timeline.data[0].user.following}</span>
              </a>
            </li>
            <li class="card-stats-item">
              <a href="#">
                <span class="card-stats-key">Followers</span>
                <span class="card-stats-val">${timeline.data[0].user.followers_count}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

    `)
  })
}  // load timeline & card

// new post (twatt)
$('form.new-twatt').submit(eventHandler => {
  eventHandler.preventDefault()
  axios.post('http://localhost:3000/twatt/newtwat', {
    text : $('#new-twatt-text').val()
  })
  .then(() => {
    // console.log('posted')
    load()
  })
  .catch(e => console.log(e))
})  // new post (twatt)

// trending
$('document').ready(() => {
  axios.get('http://localhost:3000/twatt/trending')
  .then(trending => {
    // console.log(trending.data[0].trends)
    trending.data[0].trends.forEach(list => {
      // console.log(list.name)
      if(list.tweet_volume == null) list.tweet_volume = 'N/A'
      $('.trending').append(`
      <p class="trend-hashtag"><a href="${list.url}">${list.name}</a><br>${list.tweet_volume} statuses</p>
      `)
    })
  })
  .catch(e => console.log(e))
})  // trending
