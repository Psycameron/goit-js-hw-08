import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

localStorage.setItem('videoplayer-current-time', 'onPlay');
const currentVideoTime = localStorage.getItem('videoplayer-current-time');
console.log(`Eto local storage`, currentVideoTime);

// player.on('play', function () {
//   console.log('played the video!');
// });

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

const onPlay = function (data) {
  console.log(`🚀 ~ onPlay ~ data`, data.seconds);
  let currentTime = data.seconds;
  return currentTime;
};

player.on('timeupdate', onPlay);

player
  .setCurrentTime(currentVideoTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
