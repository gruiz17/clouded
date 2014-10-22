var changeColors = function(pattern) {
  return function() {
    pattern.changeColors();
  }
}

var scrolling = function(pattern) {
  return function() {
    pattern.scrollSquares();
  }
}

var fnMap = function(pattern) {
  return function(key) {
    var obj = {
      "0": [changeColors(pattern), 2],
      "1": [scrolling(pattern), 60]
    };
    return obj[parseInt(key, 10)];
  }
}

