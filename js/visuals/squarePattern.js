var SquarePattern = (function() {
  function SquarePattern(speed, canvas) {
    this.squares = [];
    this.speed = speed;
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;

    var randomColor = function() {
      var chars = '0123456789abcdef'.split('');
      var finalColor = '#';
      for (var i = 0; i < 6; i++ ) {
          finalColor += chars[Math.floor(Math.random() * 16)];
      }
      return finalColor;
    }

    var posX = 0;
    var posY = 0;
    for (var i = 0; i < 25; i++) {
      squareSide = canvas.height/5;
      if ((i + 2) % 5 === 1) {
        posX += squareSide;
        posY = 0;
      }
      else {
        posY += squareSide;
      }
      this.squares.push(new Square(this.canvas, randomColor(), posX, posY, squareSide));
    }
  }

  SquarePattern.prototype.draw = function() {
    this.squares.forEach(function(square) {
      square.draw();
    });
  }

  SquarePattern.prototype.moveSquares = function() {
  }

  SquarePattern.prototype.animationLoop = function() {

  }

  return SquarePattern;

})();

var Square = (function() {
  function Square(canvas, color, posX, posY, sideLength) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.sideLength = sideLength;
  }

  Square.prototype.draw = function() {
    console.log(this.canvas);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.posX, this.posY, this.sideLength, this.sideLength);
    this.ctx.translate(0.5, 0.5);
  }

  return Square;
})();