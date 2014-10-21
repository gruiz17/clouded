SquarePattern = (function() {
  function SquarePattern(speed, canvas) {
    this.squares = [];
    this.speed = speed;
    this.canvas = canvas;
    this.ctx = canvas.ctx;
    this.colorSpectrum = [];
  }

  this.prototype.draw = function() {

  }

  this.prototype.moveSquares = function() {
  }

  this.prototype.animationLoop = function() {

  }




})();

Square = (function() {
  function Square(canvas, color, sideLength) {
    this.canvas = canvas;
    this.ctx = canvas.ctx;
    this.color = color;
    this.sideLength = sideLength;
  }

  this.prototype.draw = function() {

  }
})