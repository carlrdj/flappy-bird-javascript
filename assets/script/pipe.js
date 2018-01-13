//Pipes
const colorObstacles = ['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548','#9E9E9E','#607D8B','#000000']
let epilepticMode = false;
const Pipe = function (x, y, length, speed, width, colorIndex, ctx) {
  this.x = x;
  this.y = y;
  this.length = length;
  this.speed = speed;
  this.ctx = ctx;
  this.width = width;
  this.colorIndex = colorIndex;
};

Pipe.prototype.update = function () {
  this.x -= this.speed;
}

Pipe.prototype.render = function () {
  let color = "";
  if (epilepticMode) {
    color = colorObstacles[Math.floor(Math.random() * (colorObstacles.length - 0)) + 0];
  }else{
    color = colorObstacles[this.colorIndex];
  }
  this.ctx.save();
  this.ctx.fillStyle = "#333333";
  this.ctx.fillRect(this.x, this.y, this.width, this.length);
  this.ctx.fillStyle = color;
  this.ctx.fillRect(this.x+5, this.y+5, this.width-10, this.length-10);
  this.ctx.restore();

}

