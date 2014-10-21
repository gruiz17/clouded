var likeIds = [];
var signedIn = false;
var playing = false;
var currentIndex = 0;
var currentSound = {};
var currentDescription = '';

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
        SC.stream('/tracks/' + likeIds[0].id, function(sound) {
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
    $('#play').show();
    $('#pause').hide();
    currentDescription = likeIds[currentIndex].artist + " - \"" + likeIds[currentIndex].title + "\"";
    changeDescription();
    SC.stream('/tracks/' + likeIds[currentIndex].id, function(sound) {
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
    $('#play').show();
    $('#pause').hide();
    currentDescription = likeIds[currentIndex].artist + " - \"" + likeIds[currentIndex].title + "\"";
    changeDescription();
    SC.stream('/tracks/' + likeIds[currentIndex].id, function(sound) {
      playing = true;
      currentSound = sound;
      sound.play();
    });
  }
});
