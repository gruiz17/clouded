var likeIds = [];
var signedIn = false;
var playing = false;
var currentIndex = 0;
var currentSound = {};
var currentDescription = '';
var c = document.getElementById('visuals');

var connectToSoundcloud = function() {
  if (signedIn === false) {
    SC.connect(function() {
      signedIn = true;
      SC.get('/me/favorites', function(what) {
        likeIds = what.filter(function(obj) {
          return obj.streamable;
        }).map(function(obj) {
          return {id: obj.id, title: obj.title, artist: obj.user.username};
        });
        currentDescription = likeIds[0].artist + " - \"" + likeIds[0].title + "\"";
        $('#play').hide();
        $('#pause').show();
        changeDescription();
        SC.stream('/tracks/' + likeIds[0].id, {onfinish: goToNextSong}, function(sound) {
          var cock = new SquarePattern(5, c);
          cock.draw();
          playing = true;
          currentSound = sound;
          sound.play();
        });
      });
    });
  }
  else {
    return;
  }
}

var changeDescription = function() {
  document.getElementById('songInfo').innerHTML = currentDescription;
}

$('#logo').click(connectToSoundcloud);

$('#play').click(function() {
  if ((signedIn === false) || (likeIds === [])) {
    connectToSoundcloud();
  }
  else {
    // SC.stream(currentTrack, function(sound) {
    playing = true;
    currentSound.resume();
    $('#play').hide();
    $('#pause').show();
    // });
  }
});

$('#pause').click(function() {
  // SC.stream(currentTrack, function(sound) {
  playing = false;
  currentSound.pause();
  $('#play').show();
  $('#pause').hide();
  // });
});

$('#rewind').click(function() {
  if ((currentIndex === 0)|| (signedIn === false) || (likeIds === [])) {
    return;
  }
  else {
    currentSound.stop();
    currentIndex -= 1;
    $('#play').hide();
    $('#pause').show();
    currentDescription = likeIds[currentIndex].artist + " - \"" + likeIds[currentIndex].title + "\"";
    changeDescription();
    SC.stream('/tracks/' + likeIds[currentIndex].id, {onfinish: goToNextSong}, function(sound) {
      playing = true;
      currentSound = sound;
      sound.play();
    });
  }
});

$('#forward').click(function() {
  if ((currentIndex === likeIds.length - 1) || (signedIn === false) || (likeIds === [])) {
    return;
  }
  else {
    currentSound.stop();
    currentIndex += 1;
    $('#play').hide();
    $('#pause').show();
    currentDescription = likeIds[currentIndex].artist + " - \"" + likeIds[currentIndex].title + "\"";
    changeDescription();
    SC.stream('/tracks/' + likeIds[currentIndex].id, {onfinish: goToNextSong}, function(sound) {
      playing = true;
      currentSound = sound;
      sound.play();
    });
  }
});

function goToNextSong() {
  if (currentIndex !== likeIds.length - 1) {
    currentIndex += 1;
    currentDescription = likeIds[currentIndex].artist + " - \"" + likeIds[currentIndex].title + "\"";
    changeDescription();
    SC.stream('/tracks/' + likeIds[currentIndex].id, {onfinish: goToNextSong}, function(sound) {
      playing = true;
      currentSound = sound;
      currentSound.onfinish = goToNextSong;
      sound.play();
    });
  }
}


// var update = function() {

// }

// var draw = function() {

// }

// var gameLoop = function() {
//   update();
//   draw();
// }
