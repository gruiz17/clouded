var randomColor = function() {
  var chars = '0123456789abcdef'.split('');
  var finalColor = '#';
  for (var i = 0; i < 6; i++ ) {
      finalColor += chars[Math.floor(Math.random() * 16)];
  }
  return finalColor;
}

var SquarePattern = (function() {

  function SquarePattern(speed, canvas) {
    this.squares = [];
    this.speed = speed;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    var i = 0;
    var squareSide = canvas.height/4;
    var subtractor = canvas.width % squareSide;
    this.unfilledSpace = subtractor;
    var total = canvas.width - subtractor;
    var squareAmount = total/squareSide + 2;
    var posX = 0 - squareSide;
    var posY = 0;
    while (i < 5) {
      var j = 0;
      while (j < squareAmount) {
        this.squares.push(new Square(this.canvas, this, randomColor(), posX, posY, squareSide));
        posX += squareSide;
        j += 1;
      }
      posX = 0 - squareSide;;
      posY += squareSide;
      i += 1;
    }
  }

  SquarePattern.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.squares.forEach(function(square) {
      square.draw();
    });
  }

  SquarePattern.prototype.scrollSquares = function() {
    $this = this;
    this.squares.forEach(function(square) {
      square.posX += 3;
      if (square.posX >= $this.width + square.sideLength - $this.unfilledSpace) {
        square.changeColor(randomColor());
        square.reloop();
      }
    });
    this.draw();
  }

  SquarePattern.prototype.changeColors = function() {
    this.squares.forEach(function(square) {
      square.changeColor(randomColor());
    });
  }

  SquarePattern.prototype.animationLoop = function() {

  }

  return SquarePattern;

})();

var Square = (function() {
  function Square(canvas, parentPattern, color, posX, posY, sideLength) {
    this.canvas = canvas;
    this.parentPattern = parentPattern;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.sideLength = sideLength;
  }

  Square.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.posX, this.posY, this.sideLength, this.sideLength);
  }

  Square.prototype.reloop = function() {
    this.posX = 0 - this.sideLength;
  }

  Square.prototype.changeColor = function(color) {
    this.color = color;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.posX, this.posY, this.sideLength, this.sideLength);
  }

  return Square;
})();